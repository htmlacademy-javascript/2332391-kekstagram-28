import { showBigImage } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const createPicture = (data) => {
  const {comments, likes, url, id} = data;
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector('.picture__comments').textContent = comments.length;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__img').src = url;
  newPicture.dataset.pictureId = id;

  return newPicture;
};

async function renderPictures (picturesData) {
  const pictures = document.querySelectorAll('.pictures .picture');
  pictures.forEach((picture) => picture.remove());
  picturesData.forEach((elem) => {
    const newPicture = createPicture(elem);
    picturesFragment.append(newPicture);
  });

  picturesContainer.append(picturesFragment);

  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    if (!thumbnail) {
      return;
    }
    const matchedPicture = picturesData.find(
      (elem) => elem.id === +thumbnail.dataset.pictureId
    );
    showBigImage(matchedPicture);
  });
}

export { renderPictures };
