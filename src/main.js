import './js/init';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
//import { API_KEY } from './js/keys';

const baseUrl = 'https://pixabay.com/api/?';
let urlFinal;
const API_KEY = "48399114-e6afb1ef5f2eaab40be0bb5b8";
let params = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const contentUL = document.querySelector('.image-content');
const loader = document.querySelector('.loader');

// showing error using izitoast
function showError() {
  iziToast.settings({
    timeout: 5000,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
  });
  iziToast.show({
    maxWidth: '350px',
    message: 'Sorry, there are no images matching your search query.Please, try again!',
    position: 'topRight',
    backgroundColor: 'red',
  });
}

// fetch and create images with response
async function getData(url) {
  contentUL.innerHTML = "";
  loader.style.display ='flex';
  const response = await fetch(url);
  const jsonResponse = await response.json();
  loader.style.display = 'none';
  if (jsonResponse.total === 0) {
    showError();
  }
  
  const contentMarkup = jsonResponse.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="content-list-item">
            <div class="container-div">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" width="240" height="200">
                </a>
                <div class="content-bottom">
                    <div class="content-bottom-inner">
                        <p><b>Likes</b></p>
                        <p class="stats">${likes}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Views</b></p>
                        <p class="stats">${views}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Comments</b></p>
                        <p class="stats">${comments}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Downloads</b></p>
                        <p class="stats">${downloads}</p></div>
                </div> 
            </div> 
        </li>`
    )
    .join('');

  contentUL.innerHTML = contentMarkup;
  const mylightbox = new SimpleLightbox('.content-list-item a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  params.q = searchInput.value;
  urlFinal = `${baseUrl}key=${API_KEY}&q=${params.q}&image_type=${params.image_type}&orientation=${params.orientation}&safesearch=${params.safesearch}`;
  getData(urlFinal);
});
