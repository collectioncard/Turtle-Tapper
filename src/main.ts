import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shell Tapper";
let clickCount = 0;

document.title = gameName;


///*****BEGIN UI ELEMENTS*****///
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🐢";
button.addEventListener("click", () => {incrementClickCount(1)});
app.append(button);

const clickCountDisplay = document.createElement("p");
clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount} times.`;
app.append(clickCountDisplay);

///*****END UI ELEMENTS*****///


function incrementClickCount(amtToInc: number): void {
  clickCount += amtToInc;
  clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount.toFixed(2)} times.`;
}

function autoIncrementClickCounter(lastUpdate: number = 0) {
  const timestamp = performance.now();
  if (lastUpdate !== 0) {
    const elapsed = timestamp - lastUpdate;
    const increment = elapsed / 1000; // elapsed is in milliseconds
    incrementClickCount(increment);
  }
  requestAnimationFrame(() => autoIncrementClickCounter(timestamp));
}


autoIncrementClickCounter();

