import { renderPins, removePins } from './map.js';
import { showErrorMessage, createErrorMessage, debounce } from './util/util-util.js';
import { setInactiveState } from './page-state.js';
import { changeFilters, checkAllFilters } from './filter.js';

const GET_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_SERVER = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA)
    .then((response) => {
      if (response.ok) {
        const advertise = response.json();
        return advertise;
      } else {
        onFail();
      }
    })
    .then((advertise) => onSuccess(advertise))
    .catch(() => onFail());
};

const sendData = (onSuccess, onFail, body) => {
  setInactiveState();
  fetch(
    POST_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail()
      }
    })
    .catch(() => onFail());
};

getData((advertise) => {
  renderPins(advertise);
  changeFilters(debounce(() => {
    removePins();
    renderPins(checkAllFilters(advertise));
  }));
}, () => showErrorMessage(createErrorMessage));

export { getData, sendData };
