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

const showAllertMessage = (template) => {
  const element = template();

  body.appendChild(element);
};

export { createErrorMessage, showAllertMessage };
