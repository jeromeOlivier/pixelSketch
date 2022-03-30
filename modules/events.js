// const drawButton = document.querySelector('#draw');
// const eraseButton = document.querySelector('#erase');

function clickDraw() {
  const drawButton = document.querySelector('#draw');
  const eraseButton = document.querySelector('#erase');
  drawButton.addEventListener('click', () => {
    drawButton.className = 'active button locked';
    eraseButton.className = 'idle button locked';
  });
}

function clickErase() {
  const drawButton = document.querySelector('#draw');
  const eraseButton = document.querySelector('#erase');
  eraseButton.addEventListener('click', () => {
    drawButton.className = 'idle button locked';
    eraseButton.className = 'active button locked';
  });
}

function clickPressure() {
  const pressureButton = document.querySelector('#pressure');
  pressureButton.addEventListener('mousedown', () => pressureButton.className = 'active button locked');
  pressureButton.addEventListener('mouseup', () => pressureButton.className = 'idle button locked');
  pressureButton.addEventListener('click', () => {
    if (pressureButton.textContent === 'Pressure: low') {
      pressureButton.textContent = 'Pressure: med';
    } else if (pressureButton.textContent === 'Pressure: med') {
      pressureButton.textContent = 'Pressure: high';
    } else {
      pressureButton.textContent = 'Pressure: low';
    }
  });
}

function clickPixelSize() {
  const pixelSizeButton = document.querySelector('#size');
  pixelSizeButton.addEventListener('mousedown', () => pixelSizeButton.className = 'active button locked');
  pixelSizeButton.addEventListener('mouseup', () => pixelSizeButton.className = 'idle button locked');
  pixelSizeButton.addEventListener('click', () => {
    if (pixelSizeButton.textContent === 'Pixels: 3x') {
      pixelSizeButton.textContent = 'Pixels: 6x';
    } else if (pixelSizeButton.textContent === 'Pixels: 6x') {
      pixelSizeButton.textContent = 'Pixels: 9x';
    } else {
      pixelSizeButton.textContent = 'Pixels: 3x'
    }
  });
}

function draw() {
  const pixels = document.querySelectorAll('.pixel');
  let active = false;
  pixels.forEach(pixel => pixel.addEventListener('mouseover', () => {
    pixel.addEventListener('mousedown', () => active = true);
    pixel.addEventListener('mouseup', () => active = false);
    if (active) {
      let level = Number(pixel.getAttribute('data-level'));
      level = level === 15 ? 15 : level + 3 > 15 ? 15 : level + 3;
      pixel.setAttribute('data-level', `${ level }`);
    }
  }));
}

export function initializeEvents() {
  draw();
  clickDraw();
  clickErase();
  clickPressure();
  clickPixelSize();
}
