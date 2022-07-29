import { setActiveState } from '../page-state.js';

const body = document.querySelector('body');

const createErrorMessage = () => {
  const errorContainer = document.createElement('div');

  errorContainer.style.position = 'absolute';
  errorContainer.style.top = 0;
  errorContainer.style.left = 0;
  errorContainer.style.margin = '10px 50px';
  errorContainer.style.padding = '15px 10px';
  errorContainer.style.fontSize = '13px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.color = '#d8000c';
  errorContainer.style.backgroundColor = '#ffbaba';
  errorContainer.style.border = '1px solid #d8000c';
  errorContainer.style.borderRadius = '5px';
  errorContainer.style.zIndex = 100;
  errorContainer.textContent = 'Произошла ошибка при загрузке данных';

  return errorContainer;
};

const showErrorMessage = (template) => {
  const element = template();

  body.appendChild(element);
};

const createFormMessage = (templateID, templateClass) => {
  const templateMessage = document.querySelector(`#${templateID}`).content.querySelector(`.${templateClass}`);
  const templateElement = templateMessage.cloneNode(true);

  return templateElement;
};

const showFormMessage = (templateElement) => {
  body.appendChild(templateElement);

  templateElement.addEventListener('click', () => {
    templateElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      templateElement.remove();
      document.removeEventListener('keydown', (evt));
    }
  });

  const tryButton = document.querySelector('.error__button');

  if (body.contains(tryButton)) {
    tryButton.addEventListener('click', () => {
      templateElement.remove();
    });
  }
  setActiveState();
};

const debounce = (cb, timeout = 500) => {
  let timeoutID;
  return (...rest) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => cb.apply(this, rest), timeout);
  };
};

export { createErrorMessage, showErrorMessage, createFormMessage, showFormMessage, debounce };
