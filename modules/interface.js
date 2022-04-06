import { gridSize } from './events.js'

const menu = document.querySelector('#menu');
const grid = document.querySelector('#grid');

// generate grid of squares the user draws on
export function initializeGrid() {
  // width and height rounded to number divisible by four (pixels will be 3 x 3)
  const width = gridSize * Math.round((window.innerWidth - (window.innerWidth * .25)) / gridSize);
  const height = gridSize * Math.round((window.innerHeight - (window.innerHeight * .1)) / gridSize);
  const cols = width / gridSize;
  const rows = height / gridSize;

  console.log('cols' + cols);
  console.log('rows' + rows);

  let i = 0;
  while (i <= cols) {
    const col = document.createElement('div');
    col.setAttribute('data-type', 'col');
    grid.appendChild(col);
    let j = 0;
    while (j <= rows) {
      const pixel = document.createElement('span');
      pixel.style.width = `${gridSize}px`;
      pixel.style.height = `${gridSize}px`;
      if (
        i === 0 && j < rows * .05 || i === cols && j < rows * .05 ||
        i === 0 && j > rows * .95 || i === cols && j > rows * .95 ||
        j === 0 && i < cols * .05 || j === 0 && i > cols * .95 ||
        j === rows && i < cols * .05 || j === rows && i > cols * .95
      ) {
        pixel.className = 'border locked';
      } else {
        pixel.className = 'pixel';
        pixel.setAttribute('data-level', '0');
      }
      col.appendChild(pixel);
      j++;
    }
    i++;
  }
}

// generate menu selection
function initializeMenu() {
  // app name
  const appNameDiv = document.createElement('div');
  appNameDiv.innerHTML = '<span class="active">Pixel</span><span' +
    ' class="idle">Sketch</span>';
  appNameDiv.className = 'locked';
  menu.appendChild(appNameDiv);
  // divider
  const divider = document.createElement('div');
  divider.className = 'divider';
  menu.appendChild(divider);
  // draw button (toggles with erase button)
  const drawButtonDiv = document.createElement('div');
  drawButtonDiv.textContent = 'Draw';
  drawButtonDiv.id = 'draw';
  drawButtonDiv.className = 'active button locked';
  menu.appendChild(drawButtonDiv);
  // erase button (toggles with draw button)
  const eraseButtonDiv = document.createElement('div');
  eraseButtonDiv.textContent = 'Erase';
  eraseButtonDiv.id = 'erase';
  eraseButtonDiv.className = 'idle button locked';
  menu.appendChild(eraseButtonDiv);
  // pressure toggles three levels in events module (default is low)
  const pressureButtonDiv = document.createElement('div');
  pressureButtonDiv.textContent = 'Pressure: high';
  pressureButtonDiv.id = 'pressure';
  pressureButtonDiv.className = 'idle button locked';
  menu.appendChild(pressureButtonDiv);
  // pixel size toggles three sizes (3x, 6x, 9x)
  const pixelSizeButtonDiv = document.createElement('div');
  pixelSizeButtonDiv.textContent = 'Pixels: 9x';
  pixelSizeButtonDiv.id = 'size';
  pixelSizeButtonDiv.className = 'idle button locked';
  menu.appendChild(pixelSizeButtonDiv);
  // toggle between two css profiles
  const invertButtonDiv = document.createElement('div');
  invertButtonDiv.textContent = 'Invert';
  invertButtonDiv.id = 'invert';
  invertButtonDiv.className = 'idle button locked';
  menu.appendChild(invertButtonDiv);
}

export function drawInterface() {
  initializeGrid();
  initializeMenu();
}
