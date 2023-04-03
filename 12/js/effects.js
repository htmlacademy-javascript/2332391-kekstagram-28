const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    minValue: 0,
    maxValue: 100,
    unit: '',
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    minValue: 0,
    maxValue: 1,
    unit: '',
    step: 0.1
  },
  {
    name: 'sepia',
    style: 'sepia',
    minValue: 0,
    maxValue: 1,
    unit: '',
    step: 0.1
  },
  {
    name: 'marvin',
    style: 'invert',
    minValue: 0,
    maxValue: 100,
    unit: '%',
    step: 1
  },
  {
    name: 'phobos',
    style: 'blur',
    minValue: 0,
    maxValue: 3,
    unit: 'px',
    step: 0.1
  },
  {
    name: 'heat',
    style: 'brightness',
    minValue: 0,
    maxValue: 3,
    unit: '',
    step: 0.1
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefaultEffect = () => Boolean(chosenEffect === DEFAULT_EFFECT);

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

hideSlider();

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': chosenEffect.minValue,
      'max': chosenEffect.maxValue
    },
    step: chosenEffect.step,
    start: chosenEffect.maxValue
  });
};

const onEffectsChange = (evt) => {

  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreviewElement.className = `effects__preview--${chosenEffect.name}`;
  if (evt.target.value === 'none') {
    hideSlider();
  } else {
    showSlider();
  }
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();

  imagePreviewElement.style.filter = isDefaultEffect()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

noUiSlider.create(sliderElement, {
  range: {
    'min': DEFAULT_EFFECT.minValue,
    'max': DEFAULT_EFFECT.maxValue
  },
  start: DEFAULT_EFFECT.maxValue,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

export { resetEffects, hideSlider };
