export const createElement = (tag, classes = "", text, props = {}) => {
  const elm = document.createElement(tag);
  classes
    .trim()
    .split(" ")
    .forEach((cl) => elm.classList.add(cl));
  if (text !== undefined) elm.textContent = text;
  Object.entries(([key, value]) => (elm[prop] = value));
  return elm;
};

export const addChildren = (parentElm, ...children) => {
  children.forEach((child) => parentElm.appendChild(child));
};

export const removeChildren = (parentElm) => {
  const children = [];
  while (parentElm.firstElementChild) {
    children.push(parentElm.removeChild(parentElm.firstElementChild));
  }
  return children;
};
