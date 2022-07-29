const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const loadPhoto = (input, preview, previewContainer) => {
  const photo = input.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return photoName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {

      if (previewContainer) {
        previewContainer.innerHTML = '';
        const image = document.createElement('img');
        image.src = reader.result;
        image.style.maxHeight = '100%';
        previewContainer.appendChild(image);
        previewContainer.style.display = 'flex';
        previewContainer.style.justifyContent = 'center';
        previewContainer.style.overflow = 'hidden';
      } else {
        preview.src = reader.result;
      }
    });

    reader.readAsDataURL(photo);
  }
};

export { loadPhoto };
