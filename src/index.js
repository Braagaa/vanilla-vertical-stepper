import "./styles.css";
import Step from "./Step";
import Steps from "./Steps";

const app = document.getElementById("app");
const formElement = document.createElement("form");

const labelTexts = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const steps = new Steps(labelTexts);

steps.createStepElements().forEach((elm) => formElement.appendChild(elm));

formElement.addEventListener("click", (e) => {
	e.preventDefault();
	const stepType = e.target.dataset.step;

	if (stepType === "next") { 
		steps.next();
	} else if (stepType === "back") { 
		steps.prev();
	}
});

app.appendChild(formElement);
