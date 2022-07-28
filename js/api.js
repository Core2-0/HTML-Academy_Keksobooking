import { setUsualMarker, renderPins, removePins } from './map.js';
import { showErrorMessage, createErrorMessage } from './util/util-util.js';
import { setInactiveState } from './page-state.js';
import { changeFilters, checkAllFilters } from './filter.js';

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
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
    'https://23.javascript.pages.academy/keksobooking',
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
  changeFilters(() => {
    removePins();
    renderPins(checkAllFilters(advertise));
  });
}, () => showErrorMessage(createErrorMessage));

export { getData, sendData };
