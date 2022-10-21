export const refs = {
  form: document.querySelector('.search-form'),
  list: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

export const notifyOptions = {
  position: 'center-center',
  backOverlay: true,
  clickToClose: true,
};

export let lightbox = new SimpleLightbox('.photo-card a', {
  captionType: 'alt',
  captionsData: 'alt',
  captionDelay: 250,
});
