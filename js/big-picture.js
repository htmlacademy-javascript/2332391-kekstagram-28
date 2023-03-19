/* eslint-disable no-use-before-define */
import { isEscPressed } from './util.js';

const COMMENTS_NUMBER = 5;
const ADD_SHOWN_COMMENTS = 5;
const commentsList = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.social__comments-loader');
const commentsNumberBlock = document.querySelector('.social__comment-count');

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

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  if (commentLoader.classList.contains('hidden')) {
    commentLoader.classList.remove('hidden');
  }
  comments.forEach((comment) => {
    createComment(comment);
  });
  loadMoreComments(comments);
};

const loadMoreComments = (comments) => {
  let shownComments = comments.slice(0, COMMENTS_NUMBER);
  let updatedShownComments = shownComments.length;
  shownComments.forEach((comment) => {
    renderComment(comment);
  });
  if (comments.length <= COMMENTS_NUMBER) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.addEventListener('click', () => {
      commentsList.innerHTML = '';
      shownComments = comments.slice(0, COMMENTS_NUMBER + ADD_SHOWN_COMMENTS);
      updatedShownComments += ADD_SHOWN_COMMENTS;
      if (updatedShownComments >= comments.length) {
        updatedShownComments = comments.length;
        commentLoader.classList.add('hidden');
      }
      shownComments.forEach((comment) => {
        renderComment(comment);
      });
      commentsNumberBlock.textContent = `
  ${updatedShownComments} из ${comments.length} комментариев
  `;
    });
  }
  commentsNumberBlock.textContent = `
  ${shownComments.length} из ${comments.length} комментариев
  `;
};

const bigPicture = document.querySelector('.big-picture');
const bigImageCrossButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const destructurizePictureDetails = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);
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

const hideBigImage = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  // commentLoader.removeEventListener('click', onLoadMoreClick);
};

const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    hideBigImage();
  }
};

export { showBigImage, renderComments };
