import { renderPictures } from './rendering-small-pictures.js';
import { setFormEventListeners } from './form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

try {
  const data = await getData();
  renderPictures(data);
} catch (err) {
  showAlert(err.message);
}

setFormEventListeners();
