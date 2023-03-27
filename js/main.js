import { renderPictures } from './rendering-small-pictures.js';
import { setFormEventListeners } from './form.js';
import { getData, sendData } from './api.js';

try {
  const data = getData();
  renderPictures(data);
} catch (error) {
  throw new Error(error);
}
setFormEventListeners();
