const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFilters.querySelectorAll('.map__filter, .map__features');
const inputs = adForm.querySelectorAll('input[type=file]');

const setInactiveState = () => {
  const setElementsDisabled = (elements) => {
    for (let element of elements) {
      element.disabled = true;
    }
  };

  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  setElementsDisabled(adFormElements);
  setElementsDisabled(mapFiltersFormElements);
  setElementsDisabled(inputs);
};


const setActiveState = () => {
  const setElementsActive = (elements) => {
    for (let element of elements) {
      element.disabled = false;
    }
  };

  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  setElementsActive(adFormElements);
  setElementsActive(mapFiltersFormElements);
  setElementsActive(inputs);
};
export { setInactiveState, setActiveState };
