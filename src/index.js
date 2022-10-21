import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { PixabayAPI, PixabayAPI } from './js/fetchPixabay';
import { createMarkup } from './js/createMarkup';
import { refs, notifyOptions, lightbox } from './js/refs';
import './css/gallery.css';

const pixabay = new PixabayAPI();

const handleSubmit = async e => {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return Notify.info(
      'Sorry, there are no images matching your search query. Please try again.',
      notifyOptions
    );
  }

  pixabay.searchQuery = query;
  clearPage();

  try {
    Loading.hourglass();
    const { hits, total } = await pixabay.getImages();

    if (hits.length === 0) {
      Notify.failure(
        `No pictures were found for your query ${query}.`,
        notifyOptions
      );
      return;
    }

    const markup = createMarkup(hits);
    refs.list.insertAdjacentHTML('beforeend', markup);
    pixabay.calculateTotalPages(total);
    refs.loadMoreBtn.classList.remove('is-hidden');

    Notify.success(`"Hooray! We found ${total} images."`);

    lightbox.refresh();

    if (pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong...', notifyOptions);
    clearPage();
  } finally {
    Loading.remove();
  }
};

const loadMore = async () => {
  try {
    Loading.hourglass();
    pixabay.incrementPage();
    lightbox.refresh();
    const { hits } = await pixabay.getImages();

    if (!pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info(
        "We're sorry, but you've reached the end of search results.",
        {
          position: 'right-bottom',
        }
      );
    }
    const markup = createMarkup(hits);
    refs.list.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong...', notifyOptions);
    clearPage();
  } finally {
    Loading.remove();
  }
};

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);

function clearPage() {
  pixabay.resetPage();
  refs.list.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
