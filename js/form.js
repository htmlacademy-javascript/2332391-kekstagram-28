
import { resetScale, setScaleEventListeners } from './scale.js';
import { resetEffects, hideSlider } from './effects.js';
import { onFormEscKeydown, onUploadInputChange } from './modal-handlers.js';
import { sendData, showErrorModal, showSuccessModal } from './api.js';

const HASHTAG_ERROR_MESSAGE = 'Неправильно заполнено поле хэштэгов!';
const HASHTAGS_MAX_NUMBER = 5;
const HASHTAG_SYMBOLS_CHECK = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCloseButtonElement = document.querySelector('.img-upload__cancel');
const uploadInputElement = document.querySelector('.img-upload__input');
const uploadSubmitElement = document.querySelector('.img-upload__submit');
const formElement = document.querySelector('.img-upload__form');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__preview');

const pristine = new Pristine (formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const hasValidHashtagsCount = (hashtags) => hashtags.length <= HASHTAGS_MAX_NUMBER;

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
  return hasValidHashtagsCount(hashtags) && hasUniqueTags(hashtags) && hashtags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  HASHTAG_ERROR_MESSAGE
);

const disable = () => {
  uploadSubmitElement.disabled = false;
};

const hideModal = () => {
  formElement.reset();
  pristine.reset();
  resetEffects();
  hideSlider();
  resetScale();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

const isTextFieldFocused = () => document.activeElement === hashtagsField || document.activeElement === commentField;

const showModal = () => {
  resetScale();
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  uploadCloseButtonElement.addEventListener('click', hideModal);
  setScaleEventListeners();
  uploadSubmitElement.disabled = false;
};

const changeImagePreview = () => {
  const file = uploadInputElement.files[0];
  imagePreview.src = URL.createObjectURL(file);
  effectsItems.forEach((elem) => {
    elem.style.backgroundImage = `url(${imagePreview.src})`;
  });
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (!pristine.validate(hashtagsField) || !pristine.validate(commentField)) {
    return;
  }
  uploadSubmitElement.disabled = true;
  sendData(new FormData(evt.target))
    .then(showSuccessModal)
    .then(hideModal)
    .catch(showErrorModal)
    .catch(disable);
};

const setFormEventListeners = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  formElement.addEventListener('submit', onFormSubmit);
};

export { setFormEventListeners, isTextFieldFocused, changeImagePreview, showModal, hideModal };
