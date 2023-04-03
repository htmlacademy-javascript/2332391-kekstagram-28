import { setFormEventListeners } from './form.js';
import { setSortButtonsEventListeners, renderDefaultPictures } from './sort.js';
import { showAlert } from './util.js';
import { picturesData } from './api.js';

try {
  renderDefaultPictures(picturesData);
  setFormEventListeners();
  setSortButtonsEventListeners();
} catch (err) {
  showAlert(err);
}
