import { createElement, addChildren, removeChildren } from "./domHelpers";

export default class Step {
  constructor(value, index) {
    this.value = value;
    this.next = null;
    this.prev = null;
    this.formElement = null;
    this.formChildren = null;
    this.index = index;
  }

  toggleDisplay() {
    if (this.formElement.children.length === 0) {
      addChildren(this.formElement, ...this.formChildren);
    } else {
      removeChildren(this.formElement);
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
    const next = createElement("button", "next", "Next");
    next.disabled = !this.next;
    next.dataset.step = "next";
    addChildren(buttons, back, next);
    addChildren(form, input, buttons);
    addChildren(step, labelContainer, form);

    this.formElement = form;
    this.formChildren = [input, buttons];

    return step;
  }
}
