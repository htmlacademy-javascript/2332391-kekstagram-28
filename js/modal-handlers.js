import { hideSuccessModal, hideErrorModal } from './api.js';
import { hideBigImage } from './big-picture.js';
import { isTextFieldFocused, changeImagePreview, hideModal, showModal } from './form.js';
import { isEscPressed } from './util.js';

const onSuccessBodyClick = (evt) => {
  if (! evt.target.classList.contains('success__inner') && ! evt.target.classList.contains('success__title')) {
    evt.preventDefault();
    hideSuccessModal();
  }
};

const onErrorBodyClick = (evt) => {
  if (! evt.target.classList.contains('error__inner') && ! evt.target.classList.contains('error__title')) {
    evt.preventDefault();
    hideErrorModal();
  }
};

const onFormEscKeydown = (evt) => {
  const errorModal = document.querySelector('.error');
  if(evt.key === 'Escape' && ! isTextFieldFocused() && errorModal.classList.contains('hidden')) {
    evt.preventDefault();
    hideModal();
  }
};

const onUploadInputChange = () => {
  showModal();
  changeImagePreview();
};

const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    hideBigImage();
  }
};

const onErrorModalEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    hideErrorModal();
  }
};

const onSuccessModalEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    hideSuccessModal();
  }
};

export {
  onSuccessBodyClick,
  onErrorBodyClick,
  onPopupEscKeydown,
  onUploadInputChange,
  onFormEscKeydown,
  onErrorModalEscKeydown,
  onSuccessModalEscKeydown
};
