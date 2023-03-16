const ID_TYPES = {
  'forId': 'forId',
  'forUrl': 'forUrl',
  'forComments': 'forComments'
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getId = () => {
  let idForId = 0;
  let idForUrl = 0;
  let idForComments = 0;

  return function (type) {
    switch (type) {
      case ID_TYPES.forId:
        idForId++;
        return idForId;
      case ID_TYPES.forUrl:
        idForUrl++;
        return idForUrl;
      case ID_TYPES.forComments:
        idForComments++;
        return idForComments;
    }
  };
};

const generateId = getId();

const getRandomBoulean = () => Boolean(getRandomInteger(0, 1));

const isEscPressed = (evt) => evt.key === 'Escape';

const isEnterPressed = (evt) => evt.key === 'Enter';

export {
  ID_TYPES,
  getRandomArrayElement,
  getRandomInteger,
  generateId,
  getRandomBoulean,
  isEnterPressed,
  isEscPressed
};
