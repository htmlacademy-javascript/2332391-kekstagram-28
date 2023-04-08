import { showBigImage } from './big-picture.js';
import { picturesData } from './get-data.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragmentElement = document.createDocumentFragment();

const createPicture = (data) => {
  const {comments, likes, url, id} = data;
  const newPictureElement = pictureTemplateElement.cloneNode(true);

  newPictureElement.querySelector('.picture__comments').textContent = comments.length;
  newPictureElement.querySelector('.picture__likes').textContent = likes;
  newPictureElement.querySelector('.picture__img').src = url;
  newPictureElement.dataset.pictureId = id;

  return newPictureElement;
};

const showMatchedPicture = (evt) => {
  const thumbnail = evt.target.closest('[data-picture-id]');
  if (!thumbnail) {
    return;
  }
  const matchedPicture = picturesData.find(
    (elem) => elem.id === +thumbnail.dataset.pictureId
  );
  showBigImage(matchedPicture);
};

const renderPictures = (data) => {
  if (!data?.length) {
    return;
  }
  const pictures = document.querySelectorAll('.pictures .picture');
  pictures.forEach((picture) => picture.remove());
  data.forEach((elem) => {
    const newPicture = createPicture(elem);
    picturesFragmentElement.append(newPicture);
  });
  picturesContainerElement.append(picturesFragmentElement);
  picturesContainerElement.addEventListener('click', showMatchedPicture);

  const sortingButtonsSection = document.querySelector('.img-filters');
  sortingButtonsSection.classList.remove('img-filters--inactive');
};

export { renderPictures, showMatchedPicture };
