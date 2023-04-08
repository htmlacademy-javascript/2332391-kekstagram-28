import { onPopupEscKeydown } from './modal-handlers.js';

const COMMENTS_NUMBER = 5;
const EXTRA_COMMENTS_NUMBER = 5;

const commentsListElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const commentsNumberElement = document.querySelector('.social__comment-count');
const bigPictureElement = document.querySelector('.big-picture');
const bigImageCrossButtonElement = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
let commentsAccumulator = COMMENTS_NUMBER;
let pictureComments;

const createComment = (comment) => {
  const { avatar, name, message } = comment;
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.src = avatar;
  userAvatar.alt = name;
  userAvatar.width = 35;
  userAvatar.height = 35;

  const userMessage = document.createElement('p');
  userMessage.classList.add('social.text');
  userMessage.textContent = message;

  newComment.append(userAvatar);
  newComment.append(userMessage);

  return newComment;
};

const renderComment = (comment) => {
  commentsListElement.append(createComment(comment));
};

const onLoadMoreClick = (evt) => {
  evt.preventDefault();

  let shownComments = pictureComments.slice(0, COMMENTS_NUMBER);
  commentsListElement.innerHTML = '';
  shownComments = pictureComments.slice(0, commentsAccumulator + EXTRA_COMMENTS_NUMBER);
  commentsAccumulator += EXTRA_COMMENTS_NUMBER;
  shownComments.forEach((comment) => {
    renderComment(comment);
  });
  if (shownComments.length >= pictureComments.length) {
    shownComments.length = pictureComments.length;
    commentsLoaderElement.classList.add('hidden');
  }
  commentsNumberElement.textContent = `
  ${shownComments.length} из ${pictureComments.length} комментариев
  `;
};

const loadMoreComments = (comments) => {
  const shownComments = comments.slice(0, COMMENTS_NUMBER);

  shownComments.forEach((comment) => {
    renderComment(comment);
  });

  if (comments.length <= COMMENTS_NUMBER) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.addEventListener('click', onLoadMoreClick);
  }
  commentsNumberElement.textContent = `
  ${shownComments.length} из ${comments.length} комментариев
  `;
};

const renderComments = (comments) => {
  pictureComments = comments;
  commentsListElement.innerHTML = '';
  if (commentsLoaderElement.classList.contains('hidden')) {
    commentsLoaderElement.classList.remove('hidden');
  }
  comments.forEach((comment) => {
    createComment(comment);
  });
  loadMoreComments(comments);
};

const destructurizePictureDetails = ({ url, likes, description, comments }) => {
  const bigPictureInage = bigPictureElement.querySelector('.big-picture__img img');
  bigPictureInage.src = url;
  bigPictureInage.alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const hideBigImage = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsAccumulator = COMMENTS_NUMBER;
  commentsLoaderElement.removeEventListener('click', onLoadMoreClick);
};

const showBigImage = (data) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  bigImageCrossButtonElement.addEventListener('click', hideBigImage);
  destructurizePictureDetails(data);
};

export { showBigImage, renderComments, hideBigImage };
