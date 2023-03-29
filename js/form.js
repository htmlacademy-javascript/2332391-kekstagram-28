/* eslint-disable no-use-before-define */
import { resetScale, setScaleEventListeners } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const uploadInput = document.querySelector('.img-upload__input');
const uploadSubmit = document.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const HASHTAG_ERROR_MESSAGE = 'Неправильно заполнено поле хэштэгов!';

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const HASHTAG_SYMBOLS_CHECK = /^#[a-zа-яё0-9]{1,19}$/i;

const hasValidHashtagsCount = (hashtags) => hashtags.length <= 5;

const hasUniqueTags = (hastags) => {
  const lowerCaseHashtags = hastags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set (lowerCaseHashtags).size;
};

const isValidHashtag = (hashtag) => HASHTAG_SYMBOLS_CHECK.test(hashtag);

const validateHashtags = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter(Boolean);
  return hasValidHashtagsCount(hashtags) && hasUniqueTags && hashtags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  HASHTAG_ERROR_MESSAGE
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (! pristine.validate(hashtagsField) || ! pristine.validate(commentField)) {
    return;
  }
  sendData(new FormData(evt.target));
  uploadSubmit.disabled = true;
  hideModal();
};

const isTextFieldFocused = () => document.activeElement === hashtagsField || document.activeElement === commentField;

const onFormEscKeydown = (evt) => {
  if(evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
};

const showModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  uploadCloseButton.addEventListener('click', hideModal);
  setScaleEventListeners();
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  resetEffects();
  resetScale();
  uploadSubmit.disabled = false;
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

const onUploadInputChange = () => {
  showModal();
};

const setFormEventListeners = () => {
  uploadInput.addEventListener('change', onUploadInputChange);

  form.addEventListener('submit', onFormSubmit);
};

export { setFormEventListeners };
