/* eslint-disable no-use-before-define */
import { isEscPressed } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigImageCrossButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsBlock = document.querySelector('.social__comment-count');
const hideCommentsBlock = document.querySelector('.comments-loader');

const destructurizePictureDetails = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigImage = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  // temporarily hidden blocks
  commentsBlock.classList.add('hidden');
  hideCommentsBlock.classList.add('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
  bigImageCrossButton.addEventListener('click', () => {
    hideBigImage();
  });

  destructurizePictureDetails(data);
};

const hideBigImage = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    hideBigImage();
  }
};

export { showBigImage };
