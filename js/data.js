import { getRandomInt, getRandomFloat } from './util/math-util.js';
import { getRandomElement, getUniqueIndex, getRandomLengthArray } from './util/array-util.js';

const ADVERTISEMENT_QUANTITY = 10;

const Rooms = {
  MIN: 1,
  MAX: 20,
};

const Guests = {
  MIN: 1,
  MAX: 20,
};

const Prices = {
  MIN: 2000,
  MAX: 5000,
};

const Coordinates = {
  X: {
    MIN: 35.65,
    MAX: 35.7,
  },
  Y: {
    MIN: 139.7,
    MAX: 139.8,
  },
  ACCURACY: 4,
};

const TITLES = [
  'Лучшая квартира в Токио',
  'Горячее предложение',
  'Все включено',
  'Жилье на ночь',
];

const OBJECT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const TIMES_TO_CHECK_IN = [
  '12:00',
  '13:00',
  '14:00',
];

const TIMES_TO_CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Великолепная квартира-студия в центре Токио.',
  'Подходит как туристам, так и бизнесменам.',
  'Квартира полностью укомплектована и недавно отремонтирована.',
  'Имеется кондиционер и сейф, а так же розетки возле кровати.',
]

const PHOTO_SOURCES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const createAuthor = (photoIndex) => {
  const nameLength = String(ADVERTISEMENT_QUANTITY).length;
  const photoName = new Array(nameLength - String(photoIndex).length).fill('0').join() + photoIndex;
  return  {
    avatar: `img/avatars/user${photoName}.png`,
  };
};

const createLocation = (xMin = Coordinates.X.MIN, xMax = Coordinates.X.MAX, yMin = Coordinates.Y.MIN, yMax = Coordinates.Y.MAX, accuracy = Coordinates.ACCURACY) => {
  return {
    x: getRandomFloat(xMin, xMax, accuracy),
    y: getRandomFloat(yMin, yMax, accuracy),
  };
};

const createOffer = (coordinateX, coordinateY) => {
  return {
    title: getRandomElement(TITLES),
    address: `${coordinateX}, ${coordinateY}`,
    price: getRandomInt(Prices.MIN, Prices.MAX),
    type: getRandomElement(OBJECT_TYPES),
    rooms: getRandomInt(Rooms.MIN, Rooms.MAX),
    guests: getRandomInt(Guests.MIN, Guests.MAX),
    checkin: getRandomElement(TIMES_TO_CHECK_IN),
    checkout: getRandomElement(TIMES_TO_CHECK_OUT),
    features: getRandomLengthArray(FEATURES, getRandomInt(1, FEATURES.length)),
    description: getRandomElement(DESCRIPTIONS),
    photos: getRandomLengthArray(PHOTO_SOURCES, getRandomInt(1, PHOTO_SOURCES.length)),
  };
};

const createAdvertisement = () => {
  const getIndex = getUniqueIndex(1, ADVERTISEMENT_QUANTITY);
  const advertisements = new Array(ADVERTISEMENT_QUANTITY).fill(null).map(() => {
    const getLocation = createLocation();
    return Object.assign({}, { author: createAuthor(getIndex()) }, { offer: createOffer(getLocation.x, getLocation.y) }, { location: getLocation });
  });
  return advertisements;
};

export { createAdvertisement };
