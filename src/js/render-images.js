export function renderImages(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
                <a class="gallery-item" href="${largeImageURL}"><img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span class="info-item-api">${likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span class="info-item-api">${views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span class="info-item-api">${comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span class="info-item-api">${downloads}</span>
                    </p>
                </div>
              </div>`
    )
    .join('');
  return markup;
}
