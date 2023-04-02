import { getData } from './api.js';
import { getRandomInteger, showAlert, debounce } from './util.js';
import { renderPictures } from './rendering-small-pictures.js';

const picturesData = getData;

const RANDOM_PICTURES_NUMBER = 10;
const RERENDER_DELAY = 500;


const sortDefaultButton = document.querySelector('#filter-default');
const sortByRandomButton = document.querySelector('#filter-random');
const sortByCommentsButton = document.querySelector('#filter-discussed');
const sortButtons = document.querySelectorAll('.img-filters__button');

async function getRandomPictures () {
  const randomPictures = [];
  const randomIndexes = [];
  const data = await picturesData();

  while (randomPictures.length < RANDOM_PICTURES_NUMBER) {
    const currentIndex = getRandomInteger(0, data.length - 1);
    if (randomIndexes.includes(currentIndex)) {
      continue;
    }
    randomPictures.push(data[currentIndex]);
    randomIndexes.push(currentIndex);
  }
  return randomPictures;
}

async function renderRandomPictures () {
  try {
    const randomPictures = await getRandomPictures();
    debounce(renderPictures(randomPictures), RERENDER_DELAY);
    sortByRandomButton.removeEventListener('click', renderRandomPictures);
  } catch (err) {
    showAlert(err.message);
  }
}

async function renderDefaultPictures () {
  try {
    const data = await getData();
    debounce(renderPictures(data), RERENDER_DELAY);
    sortByRandomButton.addEventListener('click', renderRandomPictures);
    const sortingButtonsSection = document.querySelector('.img-filters');
    sortingButtonsSection.classList.remove('img-filters--inactive');
  } catch (err) {
    showAlert(err.message);
  }
}

async function getSortedByCommentsPictures () {
  const data = await getData();
  const sortedComments = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  return sortedComments;
}

async function renderDiscussedPictures () {
  try {
    const discussedPictures = await getSortedByCommentsPictures();
    debounce(renderPictures(discussedPictures), RERENDER_DELAY);
    sortByRandomButton.addEventListener('click', renderRandomPictures);
  } catch (err) {
    showAlert(err.message);
  }
}

const setActiveClass = (evt) => {
  sortButtons.forEach((button) =>
    button.classList.remove('img-filters__button--active')
  );
  evt.target.classList.add('img-filters__button--active');
};

const setSortButtonsEventListeners = () => {
  sortButtons.forEach((button) =>
    button.addEventListener('click', setActiveClass)
  );

  sortByRandomButton.addEventListener('click', renderRandomPictures);
  sortDefaultButton.addEventListener('click', renderDefaultPictures);
  sortByCommentsButton.addEventListener('click', renderDiscussedPictures);
};

export { setSortButtonsEventListeners, renderDefaultPictures };
