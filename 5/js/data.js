import { getRandomArrayElement, getRandomInteger, generateId, getRandomBoulean, ID_TYPES } from './util.js';

const OBJECTS_NUMBER = 25;
const LIKES_QUANTITY = {
  MIN: 15,
  MAX: 200
};
const COMMENTS_QUANTITY = {
  MIN: 0,
  MAX: 10
};
const AVATARS_QUANTITY = 6;
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

const createMessage = () => {
  if (!getRandomBoulean()) {
    return getRandomArrayElement(MESSAGES);
  }
  return `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`;
};

const createComment = () => ({
  id: generateId(ID_TYPES.forComments),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_QUANTITY)}.svg`,
  message: createMessage(),
  name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`});

const createPictureData = () => ({
  name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_QUANTITY.MIN, LIKES_QUANTITY.MAX),
  id: generateId(ID_TYPES.forId),
  url: `photos/${generateId(ID_TYPES.forUrl)}.jpg`,
  comments: Array.from({length: getRandomInteger(COMMENTS_QUANTITY.MIN, COMMENTS_QUANTITY.MAX)}, createComment)
});

const getArrayOfPicturesData = () => Array.from({ length: OBJECTS_NUMBER }, createPictureData);

export { getArrayOfPicturesData };
