export default function createDiv(className, text = '') {
  const element = document.createElement('div');
  element.classList.add(className);
  element.textContent = text;

  return element;
}
