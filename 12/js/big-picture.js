import { onPopupEscKeydown } from './modal-handlers.js';

const COMMENTS_NUMBER = 5;
const EXTRA_COMMENTS_NUMBER = 5;
const commentsList = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.social__comments-loader');
const commentsNumberBlock = document.querySelector('.social__comment-count');
const bigPicture = document.querySelector('.big-picture');
const bigImageCrossButton = document.querySelector('.big-picture__cancel');
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
  commentsList.append(createComment(comment));
};

const onLoadMoreClick = (evt) => {
  evt.preventDefault();

  let shownComments = pictureComments.slice(0, COMMENTS_NUMBER);
  commentsList.innerHTML = '';
  shownComments = pictureComments.slice(0, commentsAccumulator + EXTRA_COMMENTS_NUMBER);
  commentsAccumulator += EXTRA_COMMENTS_NUMBER;
  shownComments.forEach((comment) => {
    renderComment(comment);
  });
  if (shownComments.length >= pictureComments.length) {
    shownComments.length = pictureComments.length;
    commentLoader.classList.add('hidden');
  }
  commentsNumberBlock.textContent = `
  ${shownComments.length} из ${pictureComments.length} комментариев
  `;
};

const loadMoreComments = (comments) => {
  const shownComments = comments.slice(0, COMMENTS_NUMBER);

  shownComments.forEach((comment) => {
    renderComment(comment);
  });

  if (comments.length <= COMMENTS_NUMBER) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.addEventListener('click', onLoadMoreClick);
  }
  commentsNumberBlock.textContent = `
  ${shownComments.length} из ${comments.length} комментариев
  `;
};

const renderComments = (comments) => {
  pictureComments = comments;
  commentsList.innerHTML = '';
  if (commentLoader.classList.contains('hidden')) {
    commentLoader.classList.remove('hidden');
  }
  comments.forEach((comment) => {
    createComment(comment);
  });
  loadMoreComments(comments);
};

const destructurizePictureDetails = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const hideBigImage = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsAccumulator = COMMENTS_NUMBER;
  commentLoader.removeEventListener('click', onLoadMoreClick);
};

const showBigImage = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  bigImageCrossButton.addEventListener('click', () => {
    hideBigImage();
  });
  destructurizePictureDetails(data);
};

export { showBigImage, renderComments, hideBigImage };
