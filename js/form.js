import { checkEmptyField, checkValidePrice, checkValideTitle } from './validation.js';
import { sendData } from './api.js';
import { createFormMessage, showFormMessage } from './util/util-util.js';
import { setMainMarkerDefault } from './map.js';
import { loadPhoto } from './photo.js';

const ACCURACY = 5;

const ROOM_VALUES = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const inputAddress = adForm.querySelector('#address');
const houseType = adForm.querySelector('#type');
const housePriceInput = adForm.querySelector('#price');
const checkinTime = adForm.querySelector('#timein');
const checkoutTime = adForm.querySelector('#timeout');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const avatarChooser = adForm.querySelector('.ad-form__field input[type=file]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const housePhoto = adForm.querySelector('.ad-form__upload input[type=file]');
const housePhotoContainer = adForm.querySelector('.ad-form__photo');
const housePhotoPreview = adForm.querySelector('.ad-form__photo img');

const getPrice = (objectType) => {
  const minPrice = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  }
  return {
    MIN: minPrice[objectType],
    MAX: 1000000,
  }
}

const setMinPrice = (offerType = houseType.value) => {
  housePriceInput.placeholder = getPrice(offerType).MIN;
  housePriceInput.min = getPrice(offerType).MIN;
};

setMinPrice();

houseType.addEventListener('change', () => {
  setMinPrice();
});

checkinTime.addEventListener('change', () => {
  checkoutTime.value = checkinTime.value;
});

checkoutTime.addEventListener('change', () => {
  checkinTime.value = checkoutTime.value;
});

const setAddress = (lat, lng) => {
  inputAddress.value = `${lat.toFixed(ACCURACY)}, ${lng.toFixed(ACCURACY)}`;
};

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

housePriceInput.addEventListener('invalid', () => {
  checkEmptyField(housePriceInput);
});

housePriceInput.addEventListener('input', () => {
  checkValidePrice(housePriceInput, houseType.value, housePriceInput.value);
  housePriceInput.reportValidity();
});

adTitleInput.addEventListener('invalid', () => {
  checkEmptyField(adTitleInput);
});

adTitleInput.addEventListener('input', () => {
  const titleLength = adTitleInput.value.length;
  checkValideTitle(adTitleInput, titleLength);
  adTitleInput.reportValidity();
});

const clearForm = () => {
  adForm.reset();
  setMainMarkerDefault();
};
const resetButton = adForm.querySelector('.ad-form__reset')
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

const setAdFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(() => onSuccess(), () => onFail(), formData);
  });
};

const setSuccesForm = () => {
  showFormMessage(createFormMessage('success', 'success'));
  clearForm();
};

const setErrorForm = () => {
  showFormMessage(createFormMessage('error', 'error'));
};

setAdFormSubmit(setSuccesForm, setErrorForm);

avatarChooser.addEventListener('change', () => loadPhoto(avatarChooser, avatarPreview));
housePhoto.addEventListener('change', () => {
  loadPhoto(housePhoto, housePhotoPreview, housePhotoContainer);
});

export { getPrice, setAddress };
