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
mainClickButton.id = "mainClickButton";
mainClickButton.innerHTML = "🐢";
mainClickButton.addEventListener("click", () => {
  incrementClickCount(1);
});
app.append(mainClickButton);

const upgradeStraw = document.createElement("button");
upgradeStraw.innerHTML = "🥤Purchase Plastic Straw (0)";
upgradeStraw.disabled = true;
upgradeStraw.title = "Add one Plastic Straw to the ocean";
upgradeStraw.addEventListener("click", () => {
  growthRate += 0.1;
  clickCount -= 10;
  upgradeStraw.innerHTML = `🥤Purchase Plastic Straw (${++upgradeAPressCount})`;
});
app.append(upgradeStraw);

const upgradeSpecialist = document.createElement("button");
upgradeSpecialist.innerHTML = "👩‍🔬Hire Aquarist (0)";
upgradeSpecialist.title = "These guys know where to find the turtles";
upgradeSpecialist.disabled = true;
upgradeSpecialist.addEventListener("click", () => {
  growthRate += 2;
  clickCount -= 100;
  upgradeSpecialist.innerHTML = `👩‍🔬Hire Aquarist (${++upgradeBPressCount})`;
});
app.append(upgradeSpecialist);

const upgradeSanctuary = document.createElement("button");
upgradeSanctuary.innerHTML = "🏝️Purchase Turtle Sanctuary (0)";
upgradeSanctuary.title =
  "After gaslighting the turtles into thinking that the ocean is a dangerous place, they’ll never want to leave.";
upgradeSanctuary.disabled = true;
upgradeSanctuary.addEventListener("click", () => {
  growthRate += 50;
  clickCount -= 1000;
  upgradeSanctuary.innerHTML = `Upgrade C (${++upgradeCPressCount})`;
});
app.append(upgradeSanctuary);

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
  upgradeStraw.disabled = clickCount < 10 * Math.pow(1.15, upgradeAPressCount);
  upgradeSpecialist.disabled =
    clickCount < 100 * Math.pow(1.15, upgradeBPressCount);
  upgradeSanctuary.disabled =
    clickCount < 1000 * Math.pow(1.15, upgradeCPressCount);
}

//Start the game loop
autoIncrementClickCounter();
