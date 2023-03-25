import { renderPictures } from './rendering-small-pictures.js';
import { getArrayOfPicturesData } from './data.js';
import { setFormEventListeners } from './form.js';

renderPictures(getArrayOfPicturesData());
setFormEventListeners();
