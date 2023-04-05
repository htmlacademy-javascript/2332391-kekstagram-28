import { setFormEventListeners } from './form.js';
import { setSortButtonsEventListeners, renderFilteredPictures } from './filter.js';
import { picturesData } from './get-data.js';

renderFilteredPictures(picturesData);
setFormEventListeners();
setSortButtonsEventListeners();
