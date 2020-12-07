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

  openState() {
    const [icon, label] = this.labelChildren;
    if (this.formElement.children.length === 0) {
      addChildren(this.formElement, ...this.formChildren);
      this.formElement.children[0].focus();
    }
    icon.textContent = this.index + 1;
    icon.classList.remove("icon-incomplete");
    label.classList.remove("label-incomplete");
  }

  closedState() {
    const [icon, label] = this.labelChildren;
    removeChildren(this.formElement);
    icon.textContent = this.index + 1;
    icon.classList.add("icon-incomplete");
    label.classList.add("label-incomplete");
  }

  completedState() {
    const [icon, label] = this.labelChildren;
    removeChildren(this.formElement);
    icon.textContent = "\u2713";
    icon.classList.remove("icon-incomplete");
    label.classList.remove("label-incomplete");
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

  createForm() {
    const form = createElement("form", `form ${!this.next ? "no-border" : ""}`);
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
    const next = createElement("button", "next", this.next ? "Next" : "Finish");
    next.disabled = true;
    next.dataset.step = "next";
    addChildren(buttons, back, next);
    addChildren(form, input, buttons);
    addChildren(step, labelContainer, form);

    this.labelChildren = [icon, label];
    this.formElement = form;
    this.formChildren = [input, buttons];

    return step;
  }
}
