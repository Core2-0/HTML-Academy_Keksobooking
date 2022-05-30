import { getRandomInt } from './math-util.js';

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const getUniqueIndex = (min, max) => {
  const randomIndexes = [];

  return () => {
    let randomIndex = getRandomInt(min, max);

    if (randomIndexes.length >= max - min + 1) {
      throw new Error('Невозможно сформировать разные числа в данном диапазоне!');
    }

    while (randomIndexes.includes(randomIndex)) {
      randomIndex = getRandomInt(min,max);
    }

    randomIndexes.push(randomIndex);
    return randomIndex;
  }
};

const getRandomLengthArray = (arrayElements, size) => {
  const getUniqueRandomInt = getUniqueIndex(0, arrayElements.length -1);
  const randomArray = new Array(size).fill(null).map(() => {
    return arrayElements[getUniqueRandomInt()];
  });
  return randomArray;
};

export { getRandomElement, getUniqueIndex, getRandomLengthArray };
