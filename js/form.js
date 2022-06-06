import { getPrice } from './data.js';

const MAX_PRICE = 1000000;
const ACCURACY = 5;

const  TITLE_LENGTHS = {
  MIN: 30,
  MAX: 100,
};

const ROOM_VALUES = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const houseType = adForm.querySelector('#type');
const housePriceInput = adForm.querySelector('#price');
const checkinTime = adForm.querySelector('#timein');
const checkoutTime = adForm.querySelector('#timeout');
const inputAddress = adForm.querySelector('#address');
const adTitleInput = adForm.querySelector('#title');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

const checkEmptyField = (field) => {
  if (field.validity.valueMissing) {
    field.setCustomValidity('Обязательное поле!');
  }
};

// Минимальное значение цены в зависимости от типа жилья и валидация

const setMinPrice = (offerType = houseType.value) => {
  housePriceInput.placeholder = getPrice(offerType).MIN;
  housePriceInput.min = getPrice(offerType).MIN;
};

setMinPrice();

houseType.addEventListener('change', () => {
  setMinPrice();
});

const checkValidePrice = (priceField, type, price) => {
  if (price < getPrice(type).MIN) {
    priceField.setCustomValidity(`Цена не может быть меньше ${housePriceInput.min}`);
  } else if (price > getPrice(type).MAX) {
    priceField.setCustomValidity(`Цена не может быть больше ${MAX_PRICE}`);
  } else {
    priceField.setCustomValidity('');
  }
};

housePriceInput.addEventListener('invalid', () => {
  checkEmptyField(housePriceInput);
});

housePriceInput.addEventListener('input', () => {
  checkValidePrice(housePriceInput, houseType.value, housePriceInput.value);
  housePriceInput.reportValidity();
});

// Синхронизация времени заезда и выезда

checkinTime.addEventListener('change', () => {
  checkoutTime.value = checkinTime.value;
});

checkoutTime.addEventListener('change', () => {
  checkinTime.value = checkoutTime.value;
});

// Функция для установки координат в поле адресс

const setAddress = (lat, lng) => {
  inputAddress.value = `${lat.toFixed(ACCURACY)}, ${lng.toFixed(ACCURACY)}`;
};

// Валидация формы заголовка объявления

const checkValideTitle = (titleField, titleLength) => {
  if (titleLength < TITLE_LENGTHS.MIN) {
    titleField.setCustomValidity(`Введите ещё ${TITLE_LENGTHS.MIN - titleLength} симв.`);
  } else if (titleLength > TITLE_LENGTHS.MAX) {
    titleField.setCustomValidity(`Заголовок не может превышать ${titleLength - TITLE_LENGTHS.MAX} симв.`);
  } else {
    titleField.setCustomValidity('');
  }
}

adTitleInput.addEventListener('invalid', () => {
  checkEmptyField(adTitleInput);
});

adTitleInput.addEventListener('input', () => {
  const titleLength = adTitleInput.value.length;
  checkValideTitle(adTitleInput, titleLength);
  adTitleInput.reportValidity();
})

// Валидация комнат и гостей

const disabledCapacityOptions = (inputValue) => {
  const capacityOptions = capacitySelect.querySelectorAll('option');

  for (let i = 0; i < capacityOptions.length; i += 1) {
    capacityOptions[i].disabled = true;
  }

  for (let i = 0; i < ROOM_VALUES[inputValue].length; i += 1) {
    capacitySelect.querySelector(`option[value="${ROOM_VALUES[inputValue][i]}"]`).disabled = false;
    capacitySelect.value = ROOM_VALUES[inputValue][i];
  }
};

disabledCapacityOptions(roomNumberSelect.value);

roomNumberSelect.addEventListener('change', () => {
  disabledCapacityOptions(roomNumberSelect.value);
});

const checkGuest = () => {
  const roomGuests = ROOM_VALUES[roomNumberSelect.value];

  if (roomGuests.indexOf(+capacitySelect.value) === -1) {
    capacitySelect.setCustomValidity('Количество гостей не соответствует выбранному количеству комнат');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

roomNumberSelect.addEventListener('change', (evt) => {
  evt.target.setCustomValidity('');
});

capacitySelect.addEventListener('change', (evt) => {
  evt.target.setCustomValidity('');
});

submitButton.addEventListener('click', () => {
  checkGuest();
});

export { setAddress };
