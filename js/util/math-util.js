const getRandomNumber = (min, max, accuracy) => {
  min = parseFloat(min);
  max = parseFloat(max);
  accuracy = parseInt(accuracy);

  if (min < 0 || max < 0 || accuracy < 0) {
    throw new TypeError('Допустимы только положительные числа!');
  }

  if (isNaN(min) || isNaN(max) || isNaN (accuracy)) {
    throw new TypeError('Допускаются только числовые значения!')
  }

  if (parseInt(min) === parseInt(max) && accuracy === 0) {
    if(parseInt(min) !== min && parseInt(max) !== max) {
      throw new TypeError('Выполнение операции невозможно!');
    }
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const power = Math.pow(10 , accuracy);
  const start = Math.ceil(min * power) / power;
  const end = Math.floor(max * power) / power;

  return (Math.random() * (end - start) + start).toFixed(accuracy);
};

const getRandomInt = (min, max) => {
  return parseInt(getRandomNumber(min, max, 0));
};

const getRandomFloat = (min, max, accuracy) => {
  return parseFloat(getRandomNumber(min, max , accuracy));
};

export {getRandomInt, getRandomFloat};
