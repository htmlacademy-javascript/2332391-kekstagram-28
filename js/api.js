import { showAlert } from './util.js';
import { onSuccessBodyClick, onSuccessModalEscKeydown, onErrorModalEscKeydown, onErrorBodyClick } from './modal-handlers.js';

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

const successModalElement = document.querySelector('#success').content.querySelector('.success');
const errorModalElement = document.querySelector('#error').content.querySelector('.error');
const uploadSubmitElement = document.querySelector('.img-upload__submit');

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

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA).catch((err) => showAlert(err));

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

const createSuccessModalElement = () => {
  const modal = successModalElement.cloneNode(true);
  modal.classList.add('hidden');
  document.body.append(modal);
};

const createErrorModalElement = () => {
  const modal = errorModalElement.cloneNode(true);
  modal.classList.add('hidden');
  document.body.append(modal);
};

const hideSuccessModalElement = () => {
  const modalElement = document.querySelector('.success');
  modalElement.classList.add('hidden');
  document.removeEventListener('click', onSuccessBodyClick);
};

const hideErrorModalElement = () => {
  const modalElement = document.querySelector('.error');
  modalElement.classList.add('hidden');
  uploadSubmitElement.disabled = false;
  document.removeEventListener('click', onErrorBodyClick);
};

const showSuccessModalElement = () => {
  const modalElement = document.querySelector('.success');
  modalElement.classList.remove('hidden');
  const successModalCloseButtonElement = document.querySelector('.success__button');
  successModalCloseButtonElement.addEventListener('click', hideSuccessModalElement);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onSuccessBodyClick);
};

const showErrorModalElement = () => {
  const modalElement = document.querySelector('.error');
  modalElement.classList.remove('hidden');
  const errorModalCloseButtonElement = document.querySelector('.error__button');
  errorModalCloseButtonElement.addEventListener('click', hideErrorModalElement);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onErrorBodyClick);
};

createSuccessModalElement();
createErrorModalElement();

export {
  getData,
  sendData,
  showSuccessModalElement,
  showErrorModalElement,
  hideErrorModalElement,
  hideSuccessModalElement
};
