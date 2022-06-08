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

export { getData };
