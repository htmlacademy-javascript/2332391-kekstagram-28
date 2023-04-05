import { debounce } from './util.js';
import { renderPictures, showMatchedPicture } from './rendering-small-pictures.js';
import { getDefaultPictures, getRandomPictures, getSortedByCommentsPictures } from './get-data.js';
import { picturesData } from './get-data.js';

const RANDOM_PICTURES_NUMBER = 10;
const RERENDER_DELAY = 500;

const sortButtons = document.querySelectorAll('.img-filters__button');
const imageSortButtonsSection = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');

const activateButton = (button) => {
  button.classList.add('img-filters__button--active');
};

const inactivateButtons = () => {
  sortButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const removeSmallPicturesEventListeners = () => {
  picturesContainer.removeEventListener('click', showMatchedPicture);
};

const renderFilteredPictures = () => {
  const activeSortButtonId = document.querySelector('.img-filters__button--active').id;
  removeSmallPicturesEventListeners();

  if (activeSortButtonId === 'filter-random') {
    renderPictures(getRandomPictures(picturesData));
  } else if (activeSortButtonId === 'filter-discussed') {
    renderPictures(getSortedByCommentsPictures(picturesData));
  } else {
    renderPictures(getDefaultPictures());
  }
};

const debouncePicturesRendering = debounce(renderFilteredPictures, RERENDER_DELAY);

const setSortButtonsEventListeners = () => {
  imageSortButtonsSection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      inactivateButtons();
      activateButton(evt.target);
      debouncePicturesRendering();
    }
  });
};

export { setSortButtonsEventListeners, renderFilteredPictures, RANDOM_PICTURES_NUMBER };
