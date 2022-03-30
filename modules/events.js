import { initializeGrid } from './interface.js';

let drawErase = 1; // drawErase 1 to draw and -1 to erase
let pressure = 1; // three pressure levels 1, 4 and 11
export let gridSize = 3; // exported to use in drawing grid size
let invert = true;

// event when draw button is clicked
function clickDraw() {
  const drawButton = document.querySelector('#draw');
  const eraseButton = document.querySelector('#erase');
  drawButton.addEventListener('click', () => {
    drawButton.className = 'active button locked';
    eraseButton.className = 'idle button locked';
    drawErase = 1;
  });
}
// event when erase button is clicked
function clickErase() {
  const drawButton = document.querySelector('#draw');
  const eraseButton = document.querySelector('#erase');
  eraseButton.addEventListener('click', () => {
    drawButton.className = 'idle button locked';
    eraseButton.className = 'active button locked';
    drawErase = -1;
  });
}
// event to adjust drawing or erasing pressure
function clickPressure() {
  const pressureButton = document.querySelector('#pressure');
  pressureButton.addEventListener('mousedown', () => pressureButton.className = 'active button locked');
  pressureButton.addEventListener('mouseup', () => pressureButton.className = 'idle button locked');
  pressureButton.addEventListener('click', () => {
    if (pressureButton.textContent === 'Pressure: low') {
      pressure = 4;
      pressureButton.textContent = 'Pressure: med';
    } else if (pressureButton.textContent === 'Pressure: med') {
      pressure = 11;
      pressureButton.textContent = 'Pressure: high';
    } else {
      pressureButton.textContent = 'Pressure: low';
      pressure = 1;
    }
  });
}
// event to adjust the size of the grid
function clickPixels() {
  const pixelSizeButton = document.querySelector('#size');
  pixelSizeButton.addEventListener('mousedown', () => pixelSizeButton.className = 'active button locked');
  pixelSizeButton.addEventListener('mouseup', () => pixelSizeButton.className = 'idle button locked');
  pixelSizeButton.addEventListener('click', () => {
    if (pixelSizeButton.textContent === 'Pixels: 3x') {
      pixelSizeButton.textContent = 'Pixels: 6x';
      gridSize = 6;
      purgeGrid();
      initializeGrid();
      draw();
    } else if (pixelSizeButton.textContent === 'Pixels: 6x') {
      pixelSizeButton.textContent = 'Pixels: 9x';
      gridSize = 9;
      purgeGrid();
      initializeGrid();
      draw();
    } else {
      pixelSizeButton.textContent = 'Pixels: 3x';
      gridSize = 3;
      purgeGrid();
      initializeGrid();
      draw();
    }
  });
}
// event to flip the css
function clickInvert() {
  const invertButton = document.querySelector('#invert');
  const link = document.querySelector('link');
  invertButton.addEventListener('mousedown', () => invertButton.className = 'active button locked');
  invertButton.addEventListener('mouseup', () => invertButton.className = 'idle button locked');
  invertButton.addEventListener('click', () => {
    if (invert) {
      link.href = 'styleDark.css';
      invert = false;
    } else {
      link.href = 'styleLight.css';
      invert = true;
    }
  });
}
// click and mouse over to draw on the grid
function draw() {
  const pixels = document.querySelectorAll('.pixel');
  let active = false;
  pixels.forEach(pixel => pixel.addEventListener('mouseover', () => {
    pixel.addEventListener('mousedown', () => active = true);
    pixel.addEventListener('mouseup', () => active = false);
    if (active) {
      let level = Number(pixel.getAttribute('data-level'));
      if (drawErase === 1) {
        level = level === 15 ? 15 : level + pressure > 15 ? 15 : level + pressure;
      } else {
        level = level === 0 ? 0 : level + drawErase * pressure < 0 ? 0 : level + drawErase * pressure;
      }
      pixel.setAttribute('data-level', `${ level }`);
    }
  }));
}
// remove the grid when changing size to make way for new grid
function purgeGrid() {
  const grid = document.querySelector('#grid');
  grid.innerHTML = '';
}

export function initializeEvents() {
  draw();
  clickDraw();
  clickErase();
  clickPressure();
  clickPixels();
  clickInvert();
}
