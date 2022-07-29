const DEFAULT_VALUE = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const mapFilter = document.querySelector('.map__filters');
const housingTypeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const featuresFilter = mapFilter.querySelector('#housing-features');

const checkHousingType = (data) => housingTypeFilter.value === data.offer.type || housingTypeFilter.value === DEFAULT_VALUE;

const checkHousingPrice = (data) => {
  switch (priceFilter.value) {
    case 'low':
      return data.offer.price < MIN_PRICE;
    case 'middle':
      return data.offer.price >= MIN_PRICE && data.offer.price <= MAX_PRICE;
    case 'high':
      return data.offer.price > MAX_PRICE;
    default:
      return true;
  }
};

const checkHousingRooms = (data) => {
  if (roomsFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return +roomsFilter.value === data.offer.rooms;
};

const checkHousingFeatures = (data) => {
  const chekedFeatures = Array.from(featuresFilter.querySelectorAll('input[type="checkbox"]:checked'));
  const dataFeatures = data.offer.features;
  if (dataFeatures) {
    return chekedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
};

const checkAllFilters = (data) => data.filter((value) =>
  checkHousingType(value) &&
  checkHousingPrice(value) &&
  checkHousingRooms(value) &&
  checkHousingFeatures(value));

const changeFilters = (cb) => {
  mapFilter.addEventListener('change', () => {
    cb();
  });
};

export { checkAllFilters, changeFilters };
