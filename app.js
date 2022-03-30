'use strict';

import { drawInterface } from './modules/interface.js';
import { initializeEvents } from './modules/events.js';

document.addEventListener('DOMContentLoaded', () => {
  drawInterface();
  initializeEvents();
});
