const NAMES = [
  'Chuck',
  'Alex',
  'Petr',
  'Denis',
  'Vlad',
  'Roman',
  'Marissa',
  'Mary',
  'Marina',
  'Yolanda',
  'Olga',
  'Isaak',
  'Pete'
];

const SURNAMES = [
  'Smith',
  'Johnson',
  'Krueger',
  'Shwartsenegger',
  'Chan',
  'Seagal',
  'Norris',
  'Bullet',
  'Ramsi',
  'Baratheon',
  'Stark',
  'Skywalker',
  'Johns'
];

const DESCRIPTIONS = [
  'Two monkeys are showing off about their bananas',
  'Portrait on sunset background',
  'Sunflowers on the field on the mountains background',
  'The ship is sinking in the open cea',
  'A lonely stranger in the mountains of Tibet',
  'The birth of a supernova',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const ID_TYPES = {
  'forId': 'forId',
  'forUrl': 'forUrl',
  'forComments': 'forComments'
};

const getRandomInteger = function (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

const getId = function () {
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

const createComment = function () {
  return {
    id: generateId(ID_TYPES.forComments),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`
  };
};

const createObject = function () {
  return {
    name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    id: generateId(ID_TYPES.forId),
    url: `photos/${generateId(ID_TYPES.forUrl)}.jpg`,
    comments: Array.from({length: getRandomInteger(1,3)}, createComment)
  };
};

const getArrayOfObjects = Array.from({length: 25}, createObject);
console.log(getArrayOfObjects);
