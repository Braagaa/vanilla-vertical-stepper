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
				value="${values[currentStepIndex] || ""}"
			/>
			<div class="buttons">
				<button 
					data-step="back" 
					${index === 0 ? "disabled" : ""} 
					class="back"
				>
					Back
				</button>
				<button data-step="next" class="next">Next</button>
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

app.innerHTML = state.labelTexts.map(createStep).join("");
