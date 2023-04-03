import { getRandomInteger, debounce } from './util.js';
import { renderPictures, showMatchedPicture } from './rendering-small-pictures.js';
import { picturesData } from './api.js';

const RANDOM_PICTURES_NUMBER = 10;
const RERENDER_DELAY = 500;

const sortButtons = document.querySelectorAll('.img-filters__button');
const imageSortButtonsSection = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');

const getRandomPictures = () => {
  const randomPictures = [];
  const randomIndexes = [];

  while (randomPictures.length < RANDOM_PICTURES_NUMBER) {
    const currentIndex = getRandomInteger(0, picturesData.length - 1);
    if (randomIndexes.includes(currentIndex)) {
      continue;
    }
    randomPictures.push(picturesData[currentIndex]);
    randomIndexes.push(currentIndex);
  }
  return randomPictures;
};

const getSortedByCommentsPictures = () => {
  const sortedComments = picturesData.slice().sort((a, b) => b.comments.length - a.comments.length);
  return sortedComments;
};

const activateButton = (button) => {
  button.classList.add('img-filters__button--active');
};

const inactivateButtons = () => {
  sortButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const renderDefaultPictures = () => {
  try {
    renderPictures(picturesData);
    const sortingButtonsSection = document.querySelector('.img-filters');
    sortingButtonsSection.classList.remove('img-filters--inactive');
  } catch (err) {
    return true;
  }
};

const removeSmallPicturesEventListeners = () => {
  picturesContainer.removeEventListener('click', showMatchedPicture);
};

const renderFilteredPictures = () => {
  const activeSortButtonId = document.querySelector('.img-filters__button--active').id;
  removeSmallPicturesEventListeners();

  if (activeSortButtonId === 'filter-random') {
    renderPictures(getRandomPictures());
  } else if (activeSortButtonId === 'filter-discussed') {
    renderPictures(getSortedByCommentsPictures());
  } else {
    renderDefaultPictures();
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

export { setSortButtonsEventListeners, renderDefaultPictures };
