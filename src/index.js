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

steps.createStepElements().forEach(elm => formElement.appendChild(elm));

app.appendChild(formElement);
