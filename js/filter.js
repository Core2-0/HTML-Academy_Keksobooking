const DEFAULT_VALUE = 'any';

const mapFilter = document.querySelector('.map__filters');
const housingTypeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const featuresFilter = mapFilter.querySelector('#housing-features');

const checkHousingType = (data) => housingTypeFilter.value === data.offer.type || housingTypeFilter.value === DEFAULT_VALUE;

const checkHousingPrice = (data) => {};

const checkHousingRooms = (data) => {};

const checkHousingFeatures = (data) => {};

const checkAllFilters = (data) => data.filter((value) => checkHousingType(value));

const changeFilters = (cb) => {
  mapFilter.addEventListener('change', () => {
    cb();
  });
};

export { checkAllFilters, changeFilters };
