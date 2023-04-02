import { getData } from './api.js';
import { getRandomInteger, showAlert, debounce } from './util.js';
import { renderPictures } from './rendering-small-pictures.js';

const RANDOM_PICTURES_NUMBER = 10;
const RERENDER_DELAY = 500;

const picturesData = await getData();
const sortButtons = document.querySelectorAll('.img-filters__button');
const imageSortButtonsSection = document.querySelector('.img-filters');


function getRandomPictures () {
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
}

const renderDefaultPictures = () => {
  try {
    renderPictures(picturesData);
    const sortingButtonsSection = document.querySelector('.img-filters');
    sortingButtonsSection.classList.remove('img-filters--inactive');
  } catch (err) {
    showAlert(err.message);
  }
};

function getSortedByCommentsPictures () {
  const sortedComments = picturesData.slice().sort((a, b) => b.comments.length - a.comments.length);
  return sortedComments;
}

const activateButton = (button) => {
  button.classList.add('img-filters__button--active');
};

const inactivateButtons = () => {
  sortButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const renderFilteredPictures = () => {
  const activeSortButtonId = document.querySelector('.img-filters__button--active').id;

  if (activeSortButtonId === 'filter-random') {
    renderPictures(getRandomPictures());
  } else if (activeSortButtonId === 'filter-discussed') {
    renderPictures(getSortedByCommentsPictures());
  } else {
    renderPictures(picturesData);
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
