import { getData } from './api.js';
import { showAlert, getRandomInteger } from './util.js';
import { RANDOM_PICTURES_NUMBER } from './filter.js';

const picturesData = await getData().catch(showAlert);

const getDefaultPictures = () => picturesData;

const getRandomPictures = (data) => {
  const randomPictures = [];
  const randomIndexes = [];

  while (randomPictures.length < RANDOM_PICTURES_NUMBER) {
    const currentIndex = getRandomInteger(0, data.length - 1);
    if (randomIndexes.includes(currentIndex)) {
      continue;
    }
    randomPictures.push(data[currentIndex]);
    randomIndexes.push(currentIndex);
  }
  return randomPictures;
};

const getSortedByCommentsPictures = (data) => {
  const sortedComments = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  return sortedComments;
};

export { picturesData, getDefaultPictures, getRandomPictures, getSortedByCommentsPictures };
