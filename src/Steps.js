import Step from "./Step";

export default class Steps {
  constructor(steps) {
    steps.forEach((step, index) => this.add(step, index));
  }

  add(value, index) {
    const step = new Step(value, index);
    if (!this.head) {
      this.head = step;
      this.tail = step;
      this.current = step;
    } else {
      const prev = this.tail;
      this.tail.next = step;
      this.tail = step;
      this.tail.prev = prev;
    }
  }

  createStepElements() {
    const elms = [];
    let step = this.head;
    while (step) {
      elms.push(step.createStep());
      if (this.current !== step) {
        step.closedState();
      }
      step = step.next;
    }
    return elms;
  }

  next() {
    if (this.current.validateStep()) {
      if (this.current.next) {
        this.current.completedState();
        this.current.next.openState();
        this.current = this.current.next;
      } else {
        this.current.completedState();
        this.current = null;
      }
    }
  }

  prev() {
    if (this.current.prev) {
      this.current.closedState();
      this.current.prev.openState();
      this.current = this.current.prev;
    }
  }
}
