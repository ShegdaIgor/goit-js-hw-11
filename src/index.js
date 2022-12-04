import { PictureAPI } from './js/pixabayAPI.js';
import { renderImages } from './js/render-images';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formElem: document.querySelector('.search-form'),
  inputFormElem: document.querySelector('.search-form__input'),
  btnSearch: document.querySelector('.search-form__button'),
  gallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.btnLoad.style.display = 'none';

const pictureAPI = new PictureAPI();

refs.formElem.addEventListener('submit', searchPictures);
refs.btnLoad.addEventListener('click', addPictures);

function searchPictures(event) {
  event.preventDefault();
  clearGallery();
  pictureAPI.searchQuery =
    event.currentTarget.elements.searchQuery.value.trim();
  const inputValue = pictureAPI.searchQuery;
  let amounItemsPage = pictureAPI.amountOfElements;

  pictureAPI.getPicture().then(data => {
    refs.btnLoad.style.display = 'none';

    if (inputValue && data.hits.length) {
      appendPictureMarkup(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.btnLoad.style.display = 'block';
      if (data.hits.length < amounItemsPage) {
        refs.btnLoad.style.display = 'none';
      }
      gallerySimpleLightbox.refresh();
    } else if (inputValue === '') {
      Notiflix.Notify.failure('Please enter a search term.');
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  });
}

function addPictures() {
  pictureAPI.getPicture().then(data => {
    appendPictureMarkup(data.hits);
    gallerySimpleLightbox.refresh();
    if (+refs.gallery.children.length === +data.totalHits) {
      console.log(data.totalHits);
      refs.btnLoad.style.display = 'none';
      Notiflix.Notify.info(
        'We are sorry, but you have reached the end of search results.'
      );
    } else {
      Notiflix.Notify.success('Next page.');
    }
  });
}

function appendPictureMarkup(hits) {
  console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', renderImages(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  pictureAPI.resetPage();
  refs.btnLoad.style.display = 'none';
}
