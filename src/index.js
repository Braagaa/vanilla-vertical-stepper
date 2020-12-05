import "./styles.css";

const app = document.getElementById("app");
const formElement = document.createElement("form");

const state = {
  labelTexts: [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ],
  currentStep: 0,
};
state.values = new Array(state.labelTexts.length);
state.lastIndex = state.labelTexts.length - 1;
