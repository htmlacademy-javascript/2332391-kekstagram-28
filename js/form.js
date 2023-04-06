
import { resetScale, setScaleEventListeners } from './scale.js';
import { resetEffects, hideSlider } from './effects.js';
import { onFormEscKeydown, onUploadInputChange } from './modal-handlers.js';
import { sendData, showErrorModal, showSuccessModal } from './api.js';

const HASHTAG_ERROR_MESSAGE = 'Неправильно заполнено поле хэштэгов!';
const HASHTAGS_MAX_NUMBER = 5;
const HASHTAG_SYMBOLS_CHECK = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const uploadInput = document.querySelector('.img-upload__input');
const uploadSubmit = document.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__preview');

const pristine = new Pristine (form, {
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
  uploadSubmit.disabled = false;
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  resetEffects();
  resetScale();
  hideSlider();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

const isTextFieldFocused = () => document.activeElement === hashtagsField || document.activeElement === commentField;

const showModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  uploadCloseButton.addEventListener('click', hideModal);
  setScaleEventListeners();
  uploadSubmit.disabled = false;
};

const changeImapePreview = () => {
  const file = uploadInput.files[0];
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
  uploadSubmit.disabled = true;
  sendData(new FormData(evt.target))
    .then(showSuccessModal)
    .then(hideModal)
    .catch(showErrorModal)
    .catch(disable);
};

const setFormEventListeners = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  form.addEventListener('submit', onFormSubmit);
};

export { setFormEventListeners, isTextFieldFocused, changeImapePreview, showModal, hideModal };
