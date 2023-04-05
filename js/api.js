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

const successModal = document.querySelector('#success').content.querySelector('.success');
const errorModal = document.querySelector('#error').content.querySelector('.error');
const uploadSubmit = document.querySelector('.img-upload__submit');

const createSuccessModal = () => {
  const modal = successModal.cloneNode(true);
  modal.classList.add('hidden');
  document.body.append(modal);
};

const createErrorModal = () => {
  const modal = errorModal.cloneNode(true);
  modal.classList.add('hidden');
  document.body.append(modal);
};

const hideSuccessModal = () => {
  const modal = document.querySelector('.success');
  modal.classList.add('hidden');
  document.removeEventListener('click', onSuccessBodyClick);
};

const hideErrorModal = () => {
  const modal = document.querySelector('.error');
  modal.classList.add('hidden');
  uploadSubmit.disabled = false;
  document.removeEventListener('click', onErrorBodyClick);
};

const showSuccessModal = () => {
  const modal = document.querySelector('.success');
  modal.classList.remove('hidden');
  const successModalCloseButton = document.querySelector('.success__button');
  successModalCloseButton.addEventListener('click', hideSuccessModal);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onSuccessBodyClick);
};

const showErrorModal = () => {
  const modal = document.querySelector('.error');
  modal.classList.remove('hidden');
  const errorModalCloseButton = document.querySelector('.error__button');
  errorModalCloseButton.addEventListener('click', hideErrorModal);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onErrorBodyClick);
};

createSuccessModal();
createErrorModal();

export { getData, sendData, showSuccessModal, showErrorModal, hideErrorModal, hideSuccessModal };
