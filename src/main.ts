import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shell Tapper";

let clickCount = 0;
let growthRate = 0;

let upgradeAPressCount = 0;
let upgradeBPressCount = 0;
let upgradeCPressCount = 0;

document.title = gameName;

///*****BEGIN UI ELEMENTS*****///
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainClickButton = document.createElement("button");
mainClickButton.innerHTML = "🐢";
mainClickButton.addEventListener("click", () => {
    incrementClickCount(1);
});
app.append(mainClickButton);


const upgradeA = document.createElement("button");
upgradeA.innerHTML = "Upgrade A (0)";
upgradeA.disabled = true;
upgradeA.addEventListener("click", () => {
    growthRate += 0.1;
    clickCount -= 10;
    upgradeA.innerHTML = `Upgrade A (${++upgradeAPressCount})`;
});
app.append(upgradeA);

const upgradeB = document.createElement("button");
upgradeB.innerHTML = "Upgrade B (0)";
upgradeB.disabled = true;
upgradeB.addEventListener("click", () => {
    growthRate += 2;
    clickCount -= 100;
    upgradeB.innerHTML = `Upgrade B (${++upgradeBPressCount})`;
});
app.append(upgradeB);

const upgradeC = document.createElement("button");
upgradeC.innerHTML = "Upgrade C (0)";
upgradeC.disabled = true;
upgradeC.addEventListener("click", () => {
    growthRate += 50;
    clickCount -= 1000;
    upgradeC.innerHTML = `Upgrade C (${++upgradeCPressCount})`;
});
app.append(upgradeC);

const clickCountDisplay = document.createElement("p");
clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount} times.`;
app.append(clickCountDisplay);

const growthRateDisplay = document.createElement("p");
growthRateDisplay.innerHTML = `Auto Tap Multiplier: ${growthRate}`;
app.append(growthRateDisplay);

///*****END UI ELEMENTS*****///

//This is essentially the game loop. Should probably be changed to be more obvious
function incrementClickCount(amtToInc: number): void {
    clickCount += amtToInc;
    clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount.toFixed(2)} times.`;
    growthRateDisplay.innerHTML = `Auto Tap Multiplier: ${growthRate.toFixed(1)}x`;
    updateButtonStates();
}

function autoIncrementClickCounter(lastUpdate: number = 0) {
    const timestamp = performance.now();
    if (lastUpdate !== 0) {
        incrementClickCount(((timestamp - lastUpdate) / 1000) * growthRate);
    }
    requestAnimationFrame(() => autoIncrementClickCounter(timestamp));
}

function updateButtonStates() {
    upgradeA.disabled = clickCount < 10;
    upgradeB.disabled = clickCount < 100;
    upgradeC.disabled = clickCount < 1000;
}

//Start the game loop
autoIncrementClickCounter();