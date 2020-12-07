const createElement = (tag, classes = "", text, props = {}) => {
  const elm = document.createElement(tag);
  classes
    .trim()
    .split(" ")
    .forEach((cl) => elm.classList.add(cl));
  if (text !== undefined) elm.textContent = text;
  Object.entries(([key, value]) => (elm[prop] = value));
  return elm;
};

const addChildren = (parentElm, ...children) => {
  children.forEach((child) => parentElm.appendChild(child));
};

export default class Step {
  constructor(value, index) {
    this.value = value;
    this.next = null;
    this.prev = null;
    this.formElement = null;
    this.index = index;
  }

  toggleDisplay() {
    this.formElement.replaceWith(this.createForm());
  }

  createForm() {
    const form = createElement("form", `form ${!this.next ? "no-border" : ""}`);
    this.formElement = form;
    return form;
  }

  createStep() {
    const step = createElement("div", "step");

    const labelContainer = createElement("span", "label-container");
    const icon = createElement("span", "icon", this.index + 1);
    const label = createElement("span", "label", this.value);
    addChildren(labelContainer, icon, label);

    const form = this.createForm();
    const input = createElement("input", "input", null, { type: "text" });
    const buttons = createElement("div", "buttons");
    const back = createElement("button", "back", "Back");
    back.disabled = !this.prev;
    back.dataset.step = "back";
    const next = createElement("button", "next", "Next");
    next.disabled = !this.next;
    next.dataset.step = "next";
    addChildren(buttons, back, next);
    addChildren(form, input, buttons);
    addChildren(step, labelContainer, form);

    return step;
  }
}
