import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import {API_KEY} from '../keys'

const baseUrl = "https://pixabay.com/api/?";
let searchKeyword;
let myUrl;
// showing error using izitoast
function showError(){
    iziToast.settings({
        timeout: 5000,
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        onOpening: function(){
            console.log('callback abriu!');
        },
        onClosing: function(){
            console.log("callback fechou!");
        }
    });
    iziToast.show({
        message: 'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
        backgroundColor: "red",
        color:"white",
        theme: "none",
        onOpening: function(instance, toast){
            console.info('callback abriu!');
        },
        onClosing: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy); 
        }
    });
}

// fetch and create images with response
async function getData(url) {
    const response = await fetch(url);    
    const myJson = await response.json();

    if(myJson.total === 0){
        showError();
    } 
    const contentUL = document.querySelector(".image-content");
    const contentMarkup = myJson.hits.map(
    ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
        `<li class="content-list-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" width="240" height="200">
            </a>
            <div class="content-bottom">
                <div class="content-bottom-inner">
                    <p><b>Likes</b></p>
                    <p>${likes}</p></div>
                <div class="content-bottom-inner">
                    <p><b>Views</b></p>
                    <p>${views}</p></div>
                <div class="content-bottom-inner">
                    <p><b>Comments</b></p>
                    <p>${comments}</p></div>
                <div class="content-bottom-inner">
                    <p><b>Downloads</b></p>
                    <p>${downloads}</p></div>
            </div>  
        </li>`
    ).join("");
    
    contentUL.innerHTML = contentMarkup;
    const mylightbox = new SimpleLightbox('.content-list-item a', {
        captionsData: 'alt',
        captionDelay: 250,
        });
  }

  const searchForm =  document.querySelector('.search-form')
  const searchInput = document.querySelector('.search-input')
  
  searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      searchKeyword = searchInput.value;
      myUrl = `${baseUrl}key=${API_KEY}&q=${searchKeyword}`
      getData(myUrl);
  })
  