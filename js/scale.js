const Scale = {
  MIN_SCALE: 25,
  MAX_SCALE: 100,
  DEFAULT_SCALE: 100,
  SCALE_STEP: 25
};

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

scaleInputElement.value = Scale.DEFAULT_SCALE;

const scaleImage = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue - Scale.SCALE_STEP;
  if (newValue < Scale.MIN_SCALE) {
    newValue = Scale.MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue + Scale.SCALE_STEP;
  if (newValue > Scale.MAX_SCALE) {
    newValue = Scale.MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(Scale.DEFAULT_SCALE);

const setScaleEventListeners = () => {
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

export { resetScale, setScaleEventListeners };
