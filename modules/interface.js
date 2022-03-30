const menu = document.querySelector('#menu');
const mesh = document.querySelector('#mesh');
// width and height rounded to number divisible by four (pixels will be 3 x 3)
const width = 3 * Math.round((window.innerWidth - (window.innerWidth * .25)) / 3);
const height = 3 * Math.round((window.innerHeight - (window.innerHeight * .1)) / 3);
const cols = width / 3;
const rows = height / 3;

function initializeGrid() {
  let i = 0;
  while (i <= cols) {
    const col = document.createElement('div');
    col.setAttribute('data-type', 'col');
    mesh.appendChild(col);
    let j = 0;
    while (j <= rows) {
      const pixel = document.createElement('span');
      if (
        i === 0 && j < rows * .05 || i === cols && j < rows * .05 ||
        i === 0 && j > rows * .95 || i === cols && j > rows * .95 ||
        j === 0 && i < cols * .05 || j === 0 && i > cols * .95 ||
        j === rows && i < cols * .05 || j === rows && i > cols * .95
      ) {
        pixel.className = 'border locked';
      } else {
        pixel.className = 'pixel locked';
        pixel.setAttribute('data-level', '0');
      }
      col.appendChild(pixel);
      j++;
    }
    i++;
  }
}

function initializeMenu() {
  const appNameDiv = document.createElement('div');
  appNameDiv.innerHTML = 'Pixel&emsp14;Sketch';
  appNameDiv.className = 'title';
  menu.appendChild(appNameDiv);

  const separator = document.createElement('div');
  separator.className = 'separator';
  menu.appendChild(separator);

  const drawButtonDiv = document.createElement('div');
  drawButtonDiv.textContent = 'Draw';
  drawButtonDiv.id = 'draw';
  drawButtonDiv.className = 'active button locked';
  menu.appendChild(drawButtonDiv);

  const eraseButtonDiv = document.createElement('div');
  eraseButtonDiv.textContent = 'Erase';
  eraseButtonDiv.id = 'erase';
  eraseButtonDiv.className = 'idle button locked';
  menu.appendChild(eraseButtonDiv);

  const pressureButtonDiv = document.createElement('div');
  pressureButtonDiv.textContent = 'Pressure: low';
  pressureButtonDiv.id = 'pressure';
  pressureButtonDiv.className = 'idle button locked';
  menu.appendChild(pressureButtonDiv);

  const pixelSizeButtonDiv = document.createElement('div');
  pixelSizeButtonDiv.textContent = 'Pixels: 3x';
  pixelSizeButtonDiv.id = 'size';
  pixelSizeButtonDiv.className = 'idle button locked';
  menu.appendChild(pixelSizeButtonDiv);
}

export function drawInterface() {
  initializeGrid();
  initializeMenu();
}
