const TYPES_OF_HOUSING = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getWordDeclension = (elementsCount) => {
  let wordDeclension = {
    ROOM: 'комнат',
    GUEST: 'гостей',
  };

  if (elementsCount === 1) {
    wordDeclension = {
      ROOM: 'комната',
      GUEST: 'гостя',
    }
  }

  if (elementsCount > 1 && elementsCount <=4) {
    wordDeclension = {
      ROOM: 'комнаты',
      GUEST: 'гостей',
    }
  }
  return wordDeclension;
};

const createSentence = (roomCount, guestCount) => {
  return `${roomCount} ${getWordDeclension(roomCount).ROOM} для ${guestCount} ${getWordDeclension(guestCount).GUEST}`
};

// лучше переписать!!!!
const showFeatures = (parentBlock, availableFeatures) => {
  const allFeatures = parentBlock.querySelectorAll('.popup__feature');

  allFeatures.forEach((element) => {
    element.classList.add('hidden');
  })
  availableFeatures.forEach((feature) => {
    parentBlock.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
  })
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

const showProperties = (parentBlock, availableProperty) => {
  if (!availableProperty) {
    parentBlock.classList.add('hidden');
  } else if (parentBlock.classList.contains('popup__photos')) {
    showPhotos(parentBlock, availableProperty);
  } else if (parentBlock.classList.contains('popup__features')) {
    showFeatures(parentBlock, availableProperty);
  }
};

const renderSimilarAdvertise = ({ author, offer }) => {
  const cardItem = cardTemplate.cloneNode(true);

  cardItem.querySelector('.popup__avatar').src = author.avatar;
  cardItem.querySelector('.popup__title').textContent = offer.title;
  cardItem.querySelector('.popup__text--address').textContent = offer.address;
  cardItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardItem.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[offer.type];
  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardItem.querySelector('.popup__text--capacity').textContent = createSentence (offer.rooms, offer.guests);
  showProperties(cardItem.querySelector('.popup__feature'), offer.features);
  cardItem.querySelector('.popup__description').textContent = offer.description;
  showProperties(cardItem.querySelector('.popup__photos'), offer.photos);

  return cardItem;
};

export { renderSimilarAdvertise, getWordDeclension };
