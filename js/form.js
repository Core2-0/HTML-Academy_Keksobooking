import { getPrice } from './data.js';

const COORDINATE_ACCURACY = 5;

const adForm = document.querySelector('.ad-form');
const adTypeSelect = adForm.querySelector('#type');
const adPriceInput = adForm.querySelector('#price');
const adAddress = adForm.querySelector('#address');
const timeCheck = adForm.querySelector('.ad-form__element--time');

const setAddress = (lat, lng) => {
  const Coordinates = {
    LAT: lat.toFixed(COORDINATE_ACCURACY),
    LNG: lng.toFixed(COORDINATE_ACCURACY),
  };
  adAddress.value = `${Coordinates.LAT}, ${Coordinates.LNG}`;
};

const setMinPrice = (offerType = adTypeSelect.value) => {
  adPriceInput.placeholder = getPrice(offerType).MIN;
  adPriceInput.min = getPrice(offerType).MIN;
}


const setTimeCheck = (evt) => {
  const FIELD_TIMEIN_ID = 'timein';
  const FIELD_TIMEOUT_ID = 'timeout';
  const nessesaryTimeValue = evt.target.value;
  const elementId = evt.srcElement.id;
  let relateElementId = '';
  elementId === FIELD_TIMEIN_ID ? relateElementId = FIELD_TIMEOUT_ID : relateElementId = FIELD_TIMEIN_ID;
  const relateEventElement = timeCheck.querySelector(`#${relateElementId}`);
  relateEventElement.value = nessesaryTimeValue;
}

setMinPrice();

adTypeSelect.addEventListener('change', () => {
  setMinPrice();
});

timeCheck.addEventListener('change', setTimeCheck);

export { setAddress };
