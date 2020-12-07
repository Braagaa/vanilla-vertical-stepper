import { createElement, addChildren, removeChildren } from "./domHelpers";

export default class Step {
  constructor(value, index) {
    this.value = value;
    this.next = null;
    this.prev = null;
    this.formElement = null;
    this.formChildren = null;
    this.labelChildren = null;
    this.index = index;
  }

  toggleDisplay() {
    if (this.formElement.children.length === 0) {
      addChildren(this.formElement, ...this.formChildren);
      this.formElement.children[0].focus();
    } else {
      removeChildren(this.formElement);
    }
  }

  validateStep() {
    const [input] = this.formChildren;
    return !!input.value;
  }

  acceptStep() {
    const [, buttons] = this.formChildren;
    if (this.validateStep()) {
      buttons.children[1].disabled = false;
    } else {
      buttons.children[1].disabled = true;
    }
  }

  toggleCompleted() {
    const [icon, label] = this.labelChildren;
    const [nextIcon, nextLabel] = this.next.labelChildren;
    if (icon.textContent !== "\u2713") {
      icon.textContent = "\u2713";
      nextIcon.classList.toggle("icon-incomplete");
      nextLabel.classList.toggle("label-incomplete");
    } else {
      icon.textContent = this.index + 1;
      nextIcon.classList.toggle("icon-incomplete");
      nextLabel.classList.toggle("label-incomplete");
    }
  }

  createForm() {
    const form = createElement("form", `form ${!this.next ? "no-border" : ""}`);
    return form;
  }

  createStep() {
    const step = createElement("div", "step");

    const labelContainer = createElement("span", "label-container");
    const icon = createElement(
      "span",
      `icon ${this.prev ? "icon-incomplete" : ""}`,
      this.index + 1
    );
    const label = createElement(
      "span",
      `label ${this.prev ? "label-incomplete" : ""}`,
      this.value
    );
    addChildren(labelContainer, icon, label);

    const form = this.createForm();
    const input = createElement("input", "input", null, { type: "text" });
    const buttons = createElement("div", "buttons");
    const back = createElement("button", "back", "Back");
    back.disabled = !this.prev;
    back.dataset.step = "back";
    const next = createElement("button", "next", this.next ? "Next" : "Finish");
    next.disabled = true;
    next.dataset.step = this.next ? "next" : "finish";
    addChildren(buttons, back, next);
    addChildren(form, input, buttons);
    addChildren(step, labelContainer, form);

    this.labelChildren = [icon, label];
    this.formElement = form;
    this.formChildren = [input, buttons];

    return step;
  }
}
