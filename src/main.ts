import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Shell Tapper";

let clickCount = 0; //The number of times the turtle has been clicked
let autoClickRate = 0; //The rate at which the turtle is clicked automatically

const COST_MULTIPLIER = 1.15; //The multiplier for the cost of upgrades
const MIN_SPIN_DUR = 0.1; //The minimum duration for the turtle spin animation
const MAX_SPIN_DUR = 600; //The maximum duration for the turtle spin animation

class Item {
  constructor(
      public upgradeName: string,
      public upgradeDescription: string,
      public baseCost: number,
      public currentCost: number,
      public growthRate: number,
      public purchaseCount: number = 0,
      public specialAction?: () => void
  ) {}

  purchase() {
    this.purchaseCount++;
    this.currentCost *= COST_MULTIPLIER;
    this.specialAction?.();
  }

  reset() {
    this.purchaseCount = 0;
    this.currentCost = this.baseCost;
  }
}

// Define the upgrades to be created automatically
const availableItems: Item[] = [
  new Item(
      "Plastic Straw",
      "The turtles will come running out of the ocean when they see this",
      10,
      10,
      0.1
  ),
  new Item(
      "Aquarist",
      "These guys know a thing or two about turtles.",
      100,
      100,
      2
  ),
  new Item(
      "Turtle Sanctuary",
      "After gaslighting the turtles into thinking the ocean is unsafe, they'll never want to leave!",
      500,
      500,
      50
  ),
  new Item(
      "Mario",
      "He is somewhat related to turtles, right?",
      1000,
      1000,
      75
  ),
  new Item(
      "Earth 2",
      "Who needs these turtles? Go to earth 2 with your current growth rate. Resets progress",
      10000,
      10000,
      0,
      0,
      prestige
  ),
];

////***** UI ELEMENTS *****////
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
app.append(clickCountDisplay);

const growthRateDisplay = document.createElement("p");
app.append(growthRateDisplay);

////***** UTILITIES *****////

//Slowly increases the speed of the turtle spin as the growth rate increases
function updateTurtleSpinRate(): void {
  if (autoClickRate > 0) {
    const newDuration = Math.max(MAX_SPIN_DUR / (1 + autoClickRate), MIN_SPIN_DUR);
    mainClickButton.style.animationDuration = `${newDuration}s`;
  }
}

//Resets all game progress except for the Earth 2 upgrade
function prestige() {
  clickCount = 0;
  availableItems.forEach((item) => {
    if (item.upgradeName !== "Earth 2") {
      item.reset();
      updateButtonUI(item);
    }
  });
}

//updates an item's button to reflect its current state
function updateButtonUI(item: Item) {
  const button = document.querySelector(
    `button[id='upgradeButton-${item.upgradeName}']`,
  ) as HTMLButtonElement;

  button.innerHTML = `
    <div>${item.upgradeName} (${item.purchaseCount})</div>
    <div style="font-size: 0.8em;">${item.upgradeDescription}</div>
    <div style="font-size: 0.8em;">Cost: ${item.currentCost.toFixed(2)}</div>
  `;
}

////**** GAME LOGIC ****////

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
    const button = document.querySelector(
      `button[id='upgradeButton-${item.upgradeName}']`,
    ) as HTMLButtonElement;
    button.disabled = clickCount < item.currentCost;
  });

  updateTurtleSpinRate();

  requestAnimationFrame(() => tick(callTime));
}

////**** INITIALIZATION ****////

document.title = gameName;

//Automatically create buttons for each upgrade
availableItems.forEach((item) => {
  const button = document.createElement("button");

  button.disabled = true;
  button.title = `Purchase one ${item.upgradeName}`;
  button.id = "upgradeButton-" + item.upgradeName;

  button.addEventListener("click", () => {
    if (clickCount < item.currentCost) {
      return;
    }

    autoClickRate += item.growthRate;
    clickCount -= item.currentCost;
    item.purchase();
    updateButtonUI(item);
  });

  app.append(button);
  updateButtonUI(item);
});

//start the game loop
tick();