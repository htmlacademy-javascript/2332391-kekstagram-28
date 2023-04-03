/* eslint-disable no-use-before-define */
import { isEscPressed } from './util.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (! response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error (errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

const successModal = document.querySelector('#success').content.querySelector('.success');
const errorModal = document.querySelector('#error').content.querySelector('.error');
const uploadSubmit = document.querySelector('.img-upload__submit');

const showSuccessModal = () => {
  const modal = successModal.cloneNode(true);
  document.body.append(modal);
  const successModalCloseButton = document.querySelector('.success__button');
  successModalCloseButton.addEventListener('click', hideSuccessModal);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onSuccessBodyClick);
};

const showErrorModal = () => {
  const modal = errorModal.cloneNode(true);
  document.body.append(modal);
  const errorModalCloseButton = document.querySelector('.error__button');
  errorModalCloseButton.addEventListener('click', hideErrorModal);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onErrorBodyClick);
};

const hideSuccessModal = () => {
  const modal = document.querySelector('.success');
  modal.remove();
  document.removeEventListener('click', onSuccessBodyClick);
};

const hideErrorModal = () => {
  const modal = document.querySelector('.error');
  modal.remove();
  uploadSubmit.disabled = false;
  document.removeEventListener('click', onErrorBodyClick);
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

export { getData, sendData, showSuccessModal, showErrorModal };