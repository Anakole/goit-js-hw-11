const axios = require('axios').default;
axios.defaults.baseURL = 'https://pixabay.com/api';

export class PixabayAPI {
  #page = 1;
  #searchQuery = '';
  #totalHits = 0;
  #params = {
    params: {
      key: '7759209-af26fbf7f42c83ac7a267ccb1',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    },
  };

  async getImages() {
    const { data } = await axios.get(
      `/?q=${this.#searchQuery}&page=${this.#page}`,
      this.#params
    );
    return data;
  }

  get searchQuery() {
    return this.#searchQuery;
  }

  set searchQuery(newQuery) {
    this.#searchQuery = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#totalHits = Math.ceil(total / this.#params.params.per_page);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalHits;
  }
}
