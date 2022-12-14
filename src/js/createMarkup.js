export function createMarkup(photos) {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
            <a href="${largeImageURL}" class="gallery-link">
                <img class = "gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                      <p class="info-item"><b>Likes</b>${likes}</p>
                      <p class="info-item"><b>Views</b>${views}</p>
                      <p class="info-item"><b>Comments</b>${comments}</p>
                      <p class="info-item"><b>Downloads</b>${downloads}</p>
                </div>
            </a>
        </div>`;
      }
    )
    .join('');
}
