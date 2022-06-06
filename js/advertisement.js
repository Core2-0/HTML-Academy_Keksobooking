import { createAdvertisement } from './data.js';

const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const similarCards = createAdvertisement();
const similarListFragment = document.createDocumentFragment();

const getWordDeclension = (elementsCount) => {
  let wordDeclension = {
    room: 'комнат',
    guest: 'гостей',
  };

  if (elementsCount === 1) {
    wordDeclension = {
      room: 'комната',
      guest: 'гостя',
    }
  }

  if (elementsCount > 1 && elementsCount <=4) {
    wordDeclension = {
      room: 'комнаты',
    }
  }
  return wordDeclension;
};

const createSentence = (roomCount, guestCount) => {
  return `${roomCount} ${getWordDeclension(roomCount).room} для ${guestCount} ${getWordDeclension(guestCount).guest}`
};

const showFeatures = (allFeatures, availableFeatures) => {
  allFeatures.forEach((element) => {
    element.classList.add('hidden');
  });
  availableFeatures.forEach((feature) => {
    let availableFeature = feature;
    allFeatures.forEach((element) => {
      if (element.classList.contains(`popup__feature--${availableFeature}`)) {
        element.classList.remove('hidden');
      }
    });
  });
};

const showPhotos = (photos, availablePhotos) => {
  const photoTemplate = photos.querySelector('.popup__photo');
  const photoFragment = document.createDocumentFragment();
  availablePhotos.forEach((photo, index) => {
    let photoItem = photoTemplate;
    if (index >= 1) {
      photoItem = photoTemplate.cloneNode(true);
    }
    photoItem.src = photo;
    photoFragment.appendChild(photoItem);
  });
  photos.appendChild(photoFragment);
}

similarCards.forEach(({ author, offer }) => {
  const cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.popup__avatar').src = author.avatar;
  cardItem.querySelector('.popup__title').textContent = offer.title;
  cardItem.querySelector('.popup__text--address').textContent = offer.address;
  cardItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardItem.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[offer.type];
  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardItem.querySelector('.popup__text--capacity').textContent = createSentence (offer.rooms, offer.guests);
  showFeatures(cardItem.querySelectorAll('.popup__feature'), offer.features);
  cardItem.querySelector('.popup__description').textContent = offer.description;
  showPhotos(cardItem.querySelector('.popup__photos'), offer.photos);
  similarListFragment.appendChild(cardItem);
});

mapCanvas.appendChild(similarListFragment.children[0]);

export { similarCards };
