/* eslint-disable no-use-before-define */
import './rendering.js';
import { isEnterPressed, isEscPressed } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigImageCrossButton = document.querySelector('.big-picture__cancel');
// const bigPictureImage = document.querySelector('.big-picture__img');
const body = document.querySelector('body');

const showPopup = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const hidePopup = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    hidePopup();
  }
};

picturesContainer.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('picture__img')) {
    return;
  }
  showPopup();
});

bigImageCrossButton.addEventListener('click', () => {
  hidePopup();
});

bigImageCrossButton.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  if (isEnterPressed(evt)) {
    hidePopup();
  }
});


const renderPictureData = (data) => {
  const {url, description} = data;
  const bigImage = document.querySelector('.big-picture__img img');

  bigImage.src = url;
  bigImage.alt = description;

};

export { showPopup, renderPictureData };
