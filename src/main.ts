import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shell Tapper";

let clickCount = 0; //The number of times the turtle has been clicked
let autoClickRate = 0; //The rate at which the turtle is clicked automatically

interface Item {
    upgradeName: string;
    upgradeDescription: string;
    currentCost: number;
    growthRate: number;
    purchaseCount: number;
    specialAction?: () => void;
}

//Define the upgrades to be created automatically
const availableItems: Item[] = [
    {
        upgradeName: "Plastic Straw",
        upgradeDescription: "The turtles will come running out of the ocean when they see this",
        currentCost: 10,
        growthRate: 0.1,
        purchaseCount: 0,

    },
    {
        upgradeName: "Aquarist",
        upgradeDescription: "These guys know a thing or two about turtles.",
        currentCost: 100,
        growthRate: 2,
        purchaseCount: 0,
    },
    {
        upgradeName: "Turtle Sanctuary",
        upgradeDescription: "After gaslighting the turtles into thinking the ocean is unsafe, they'll never want to leave!",
        currentCost: 500,
        growthRate: 50,
        purchaseCount: 0,
    },
    {
        upgradeName: "Mario",
        upgradeDescription: "He is somewhat related to turtles, right?",
        currentCost: 1000,
        growthRate: 75,
        purchaseCount: 0,
    },
    {
        upgradeName: "Earth 2",
        upgradeDescription: "Who needs these turtles? Go to earth 2 with your current growth rate. Resets progress",
        currentCost: 10000,
        growthRate: 0,
        purchaseCount: 0,
        specialAction: () => {
            clickCount = 0;
            availableItems.forEach((item) => {
                if (item.upgradeName === "Earth 2") {
                    return;
                }
                item.purchaseCount = 0;
                const button = document.querySelector(`button[id='upgradeButton-${item.upgradeName}']`) as HTMLButtonElement;
                button.innerHTML = `${item.upgradeName} (${item.purchaseCount})`;
            }, 0);
        },
    }
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
growthRateDisplay.innerHTML = `Auto Tap Multiplier: ${autoClickRate}`;
app.append(growthRateDisplay);
///*****END UI ELEMENTS*****///

//Slowly increases the speed of the turtle spin as the growth rate increases
function updateTurtleSpinRate(): void {
    const mainClickButton = document.getElementById("mainClickButton");
    if (mainClickButton && autoClickRate > 0) {
        const newDuration = Math.max(600 / (1 + autoClickRate), .1);
        mainClickButton.style.animationDuration = `${newDuration}s`;
        console.log(newDuration);
    }
}

//Game loop
function tick(lastCall: number = 0): void {
    const callTime = performance.now();

    if (lastCall === 0) {
        requestAnimationFrame(() => tick(callTime));
        return;
    }

    const singleFrameTime = (callTime - lastCall) / 1000;

    //Add the auto clicker growth rate to the click count
    clickCount += singleFrameTime * autoClickRate;

    //update stat counters
    clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount.toFixed(2)} times.`;
    growthRateDisplay.innerHTML = `Auto Tap Multiplier: ${autoClickRate.toFixed(1)}x`;

    //update buttons based on the current click count
    availableItems.forEach((item) => {
        const button = document.querySelector(`button[id='upgradeButton-${item.upgradeName}']`) as HTMLButtonElement;
        button.disabled = clickCount < item.currentCost;
    });

    updateTurtleSpinRate();

    requestAnimationFrame(() => tick(callTime));
}

//Executed at game start

document.title = gameName;

//Automatically create buttons for each upgrade
availableItems.forEach((item) => {
    const button = document.createElement("button");

    button.innerHTML = `
        <div>${item.upgradeName} (${item.purchaseCount})</div>
        <div style="font-size: 0.8em;">${item.upgradeDescription}</div>
        <div style="font-size: 0.8em;">Cost: ${item.currentCost.toFixed(2)}</div>
    `;

    button.disabled = true;
    button.title = `Purchase one ${item.upgradeName}`;
    button.id = "upgradeButton-" + item.upgradeName;

    button.addEventListener("click", () => {
        autoClickRate += item.growthRate;
        clickCount -= item.currentCost;
        item.currentCost = item.currentCost * 1.15;
        button.innerHTML = `
            <div>${item.upgradeName} (${++item.purchaseCount})</div>
            <div style="font-size: 0.8em;">${item.upgradeDescription}</div>
            <div style="font-size: 0.8em;">Cost: ${item.currentCost.toFixed(2)}</div>
        `;

        if (item.specialAction) {
            item.specialAction();
        }
    });

    app.append(button);
});

//start the game loop
tick();