const canvas = document.querySelector('.canvas');
const amount = document.querySelector('#color-amount');
const colorChooser = document.querySelector('.control--color-range');
const colorPickerRange = document.querySelector('#color-picker-range');
const chooseBaseColor = document.querySelector('.control--base-color');
const chooseBaseColorCheckbox = chooseBaseColor.querySelector('input');
const chooseBaseColorLabel = chooseBaseColor.querySelector('label');
const createArt = document.querySelector('#create-art');
const saveArt = document.querySelector('#save-art');
const svgns = "http://www.w3.org/2000/svg";
let iterations = randomNumber(amount.value);
let color = randomNumber(361);
// The SVG viwBox is the same dimensions as an A2/3/4/etc sheet of paper.
const viewBoxWidth = 298;
const viewBoxHeight = 211;

canvas.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

function randomNumber(number) {
  return Math.floor(Math.random() * number);
}

function handleColorPickerRange() {
  document.documentElement.style.setProperty('--color-h', colorPickerRange.value);
  colorPickerRange.value = colorPickerRange.value;
}

function createItem() {
  const item = document.createElementNS(svgns, "rect"); 
  const width = `${randomNumber(viewBoxWidth)}`;
  const height = `${randomNumber(viewBoxHeight)}`;
  const xNumber = `${randomNumber(101)}`;
  const yNumber = `${randomNumber(101)}`;
  let x;
  let y;

  if (xNumber % 2) {
    x = `${xNumber * -1}%`;
  } else {
    x = `${xNumber * 1}%`
  }
  if (yNumber % 2) {
    y = `${yNumber * -1}%`;
  } else {
    y = `${yNumber * 1}%`
  }

  item.style.setProperty('--color-h', `${randomNumber(361)}`);
  item.style.setProperty('--color-s', `${randomNumber(101)}%`);
  item.style.setProperty('--color-l', `${randomNumber(101)}%`);
  item.style.setProperty('--color-a', `${randomNumber(101)}%`);
  item.setAttribute('width', width);
  item.setAttribute('height', height);
  item.setAttribute('x', x);
  item.setAttribute('y', y);
  item.style.fill = `hsla(var(--color-h), var(--color-s), var(--color-l), var(--color-a))`;
  item.classList.add('canvas__item');
  
  canvas.appendChild(item);
}

function handleCreateItems() {
  const items = document.querySelectorAll('.canvas__item');
  if (items) {
    items.forEach(item => {
      item.remove();
    });
  }
  
  for (let index = 0; index < iterations; index++) {
    createItem();
  }

  if (chooseBaseColorCheckbox.checked) {
    const items = document.querySelectorAll('.canvas__item');
    items.forEach(item => {
      item.style.setProperty('--color-h', colorPickerRange.value);
    });
  }

  iterations = randomNumber(amount.value);
}

function handleChooseBaseColor() {
  chooseBaseColorCheckbox.checked ? colorChooser.style.display = 'block' : colorChooser.style.display = 'none';
  chooseBaseColorCheckbox.checked ? chooseBaseColorLabel.innerText = 'Reset to random colors' : chooseBaseColorLabel.innerText = 'Choose base color';
}

function saveSvg() {
  canvas.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  var svgData = canvas.outerHTML;
  var preface = '<?xml version="1.0" standalone="no"?>\r\n';
  var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
  var svgUrl = URL.createObjectURL(svgBlob);
  var downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = 'generative-art.svg';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

handleCreateItems();

chooseBaseColorCheckbox.addEventListener('click', handleChooseBaseColor);
colorPickerRange.addEventListener('input', handleColorPickerRange);
createArt.addEventListener('click', handleCreateItems);
saveArt.addEventListener('click', saveSvg);