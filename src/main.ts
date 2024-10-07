import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shell Tapper";
let clickCount = 0;
let growthRate = 0;

document.title = gameName;


///*****BEGIN UI ELEMENTS*****///
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainClickButton = document.createElement("button");
mainClickButton.innerHTML = "🐢";
mainClickButton.addEventListener("click", () => {
    incrementClickCount(1)
});
app.append(mainClickButton);

const marioUpgradeButton = document.createElement("button");
marioUpgradeButton.innerHTML = "Mario";
marioUpgradeButton.disabled = true;
marioUpgradeButton.addEventListener("click", () => {
    growthRate++;
    clickCount -= 10;
});
app.append(marioUpgradeButton);

const clickCountDisplay = document.createElement("p");
clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount} times.`;
app.append(clickCountDisplay);

///*****END UI ELEMENTS*****///

//This is essentially the game loop.
function incrementClickCount(amtToInc: number): void {
    clickCount += amtToInc;
    clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount.toFixed(2)} times.`;
    checkButtonStates();
}

function autoIncrementClickCounter(lastUpdate: number = 0) {
    const timestamp = performance.now();
    if (lastUpdate !== 0) {
        incrementClickCount(((timestamp - lastUpdate) / 1000) * growthRate);
    }
    requestAnimationFrame(() => autoIncrementClickCounter(timestamp));
}

function checkButtonStates() {
    marioUpgradeButton.disabled = clickCount < 10;
}

//Start the game loop
autoIncrementClickCounter();

