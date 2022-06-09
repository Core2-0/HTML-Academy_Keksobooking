import { getPrice } from './form.js';

const  TITLE_LENGTHS = {
  MIN: 30,
  MAX: 100,
};

const checkEmptyField = (field) => {
  if (field.validity.valueMissing) {
    field.setCustomValidity('Обязательное поле!');
  }
};

const checkValidePrice = (priceField, type, price) => {
  if (price < getPrice(type).MIN) {
    priceField.setCustomValidity(`Цена не может быть меньше ${getPrice(type).MIN}`);
  } else if (price > getPrice().MAX) {
    priceField.setCustomValidity(`Цена не может быть больше ${getPrice().MAX}`);
  } else {
    priceField.setCustomValidity('');
  }
};

const checkValideTitle = (titleField, titleLength) => {
  if (titleField.validity.tooShort) {
    titleField.setCustomValidity(`Введите ещё ${TITLE_LENGTHS.MIN - titleLength} симв.`);
  } else if (titleField.validity.tooLong) {
    titleField.setCustomValidity(`Заголовок не может превышать ${titleLength - TITLE_LENGTHS.MAX} симв.`);
  } else {
    titleField.setCustomValidity('');
  }
}

export { checkEmptyField, checkValidePrice, checkValideTitle };
