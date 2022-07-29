const getWordDeclension = (elementsCount) => {
  let wordDeclension = {
    ROOM: 'комнат',
    GUEST: 'гостей',
  };

  if (elementsCount === 1) {
    wordDeclension = {
      ROOM: 'комната',
      GUEST: 'гостя',
    }
  }

  if (elementsCount > 1 && elementsCount <=4) {
    wordDeclension = {
      ROOM: 'комнаты',
      GUEST: 'гостей',
    }
  }
  return wordDeclension;
};

const createSentence = (roomCount, guestCount) => {
  return `${roomCount} ${getWordDeclension(roomCount).ROOM} для ${guestCount} ${getWordDeclension(guestCount).GUEST}`
};

export { createSentence };
