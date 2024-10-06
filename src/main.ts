import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shell Tapper";
let clickCount = 0;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🐢";
app.append(button);

const clickCountDisplay = document.createElement("p");
clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount} times.`;
app.append(clickCountDisplay);

//event listener for button click
button.addEventListener("click", () => {
  incrementClickCount();
});

//automatically click the button every 1 second
setInterval(() => {
  incrementClickCount();
}, 1000);

function incrementClickCount(): void {
  clickCount++;
  clickCountDisplay.innerHTML = `You've tapped the turtle ${clickCount} times.`;

}