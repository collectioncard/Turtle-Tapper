import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shell Tapper";

let clickCount = 0;
let growthRate = 0;

interface Item {
    upgradeName: string;
    currentCost: number;
    growthRate: number;
    purchaseCount: number;
}

//Define the upgrades to be created automatically
const availableItems: Item[] = [
    {
        upgradeName: "Plastic Straw",
        currentCost: 10,
        growthRate: 0.1,
        purchaseCount: 0,

    },
    {
        upgradeName: "Aquarist",
        currentCost: 100,
        growthRate: 2,
        purchaseCount: 0,
    },
    {
        upgradeName: "Turtle Sanctuary",
        currentCost: 1000,
        growthRate: 50,
        purchaseCount: 0,
    },
];


///*****BEGIN UI ELEMENTS*****///
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainClickButton = document.createElement("button");
mainClickButton.id = "mainClickButton";
mainClickButton.innerHTML = "🐢";
mainClickButton.addEventListener("click", () => {
    clickCount++;
});
app.append(mainClickButton);

const clickCountDisplay = document.createElement("p");
clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount} times.`;
app.append(clickCountDisplay);

const growthRateDisplay = document.createElement("p");
growthRateDisplay.innerHTML = `Auto Tap Multiplier: ${growthRate}`;
app.append(growthRateDisplay);

//Automatically create buttons for each upgrade
availableItems.forEach((item) => {
    const button = document.createElement("button");

    button.innerHTML = `${item.upgradeName} (0)`;
    button.disabled = true;
    button.title = `Purchase one ${item.upgradeName}`;
    button.id = "upgradeButton-" + item.upgradeName;

    button.addEventListener("click", () => {
        growthRate += item.growthRate;
        clickCount -= item.currentCost;
        button.innerHTML = `${item.upgradeName} (${++item.purchaseCount})`;
    });

    app.append(button);
});

///*****END UI ELEMENTS*****///


function tick(lastCall: number = 0): void {
    const callTime = performance.now();

    if (lastCall === 0) {
        requestAnimationFrame(() => tick(callTime));
        return;
    }

    const singleFrameTime = (callTime - lastCall) / 1000;

    //Add the auto clicker growth rate to the click count
    clickCount += singleFrameTime * growthRate;

    //update stat counters
    clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount.toFixed(2)} times.`;
    growthRateDisplay.innerHTML = `Auto Tap Multiplier: ${growthRate.toFixed(1)}x`;

    //update buttons based on the current click count
    availableItems.forEach((item) => {
        const button = document.querySelector(`button[id='upgradeButton-${item.upgradeName}']`) as HTMLButtonElement;
        button.disabled = clickCount < item.currentCost * Math.pow(1.15, item.purchaseCount);
    });


    requestAnimationFrame(() => tick(callTime));
}

//Executed at game start

document.title = gameName;
tick();

