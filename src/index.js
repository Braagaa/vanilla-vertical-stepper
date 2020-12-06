import "./styles.css";

const app = document.getElementById("app");
const formElement = document.createElement("form");

const state = {
  labelTexts: [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ],
  currentStepIndex: 0,
};
state.values = new Array(state.labelTexts.length);
state.lastIndex = state.labelTexts.length - 1;

const createStep = (label, index) => {
  const { lastIndex, values, currentStepIndex } = state;
  const value = values[currentStepIndex];
  const labelHTML = `
		<span class="label-container">
			<span class="icon">${index + 1}</span>
			<span class="label">${label}</span>
		</span>
	`;

  let formHTML = ``;
  if (currentStepIndex === index) {
    formHTML = `
		<div class="form${index === lastIndex ? " no-border" : ""}">
			<input 
				class="input" 
				type="text" 
				value="${value || ""}"
			/>
			<div class="buttons">
				<button 
					data-step="back" 
					${index === 0 ? "disabled" : ""} 
					class="back"
				>
					Back
				</button>
				<button
					data-step="next" 
					class="next"
					${!value ? "disabled" : ""}
				>
					Next
				</button>
			</div>
		</div>
	`;
  } else if (currentStepIndex !== index && lastIndex !== index) {
    formHTML = `<div class="form"></div>`;
  }

  const template = `
		<div class="step">
			${labelHTML}
			${formHTML}
		</div>
	`;

  return template;
};

formElement.innerHTML = state.labelTexts.map(createStep).join("");

const replaceStep = (direction, value) => {
  const num = direction === "next" ? 1 : -1;
  const currentStepIndex = state.currentStepIndex;
  const currentStepElement = formElement.children[currentStepIndex];
  const label = state.labelTexts[currentStepIndex];

  const prevNextElm = formElement.children[currentStepIndex + num];
  const prevNextIndex = currentStepIndex + num;
  const prevNextElmLabel = state.labelTexts[prevNextIndex];

  state.values[currentStepIndex] = value;
  state.currentStepIndex = currentStepIndex + num;

  currentStepElement.insertAdjacentHTML(
    "beforebegin",
    createStep(label, currentStepIndex)
  );
  prevNextElm.insertAdjacentHTML(
    "beforebegin",
    createStep(prevNextElmLabel, prevNextIndex)
  );
  currentStepElement.remove();
  prevNextElm.remove();
};

formElement.addEventListener("click", (e) => {
  const stepType = e.target.dataset.step;
  const { currentStepIndex, lastIndex } = state;
  const currentStepElement = formElement.children[state.currentStepIndex];
  const inputElement = currentStepElement.querySelector("input");
  e.preventDefault();

  if (
    stepType === "next" &&
    currentStepIndex < lastIndex &&
    inputElement.value
  ) {
    replaceStep("next", inputElement.value);
  } else if (stepType === "back" && currentStepIndex > 0) {
    replaceStep("back", inputElement.value);
  }
});

formElement.addEventListener("input", (e) => {
  e.preventDefault();
});

app.appendChild(formElement);
