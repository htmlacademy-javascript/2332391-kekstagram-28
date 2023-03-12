import { getArrayOfPicturesData } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picturesData = getArrayOfPicturesData();

const picturesFragment = document.createDocumentFragment();

const createPicture = (data) => {
  const {comments, likes, url} = data;
  const newPicture = pictureTemplate.cloneNode(true);
  const newPictureComments = newPicture.querySelector('.picture__comments');
  const newPictureLikes = newPicture.querySelector('.picture__likes');
  const newPicturesUrl = newPicture.querySelector('.picture__img');

  newPictureComments.textContent = comments.length;
  newPictureLikes.textContent = likes;
  newPicturesUrl.src = url;

  return newPicture;
};

picturesData.forEach((elem) => {
  const newPicture = createPicture(elem);
  picturesFragment.append(newPicture);
});

picturesContainer.append(picturesFragment);
