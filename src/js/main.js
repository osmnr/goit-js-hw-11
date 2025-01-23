import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

import {API_KEY} from '../keys'

let searchKeyword = "cat";
const baseUrl = "https://pixabay.com/api/?"
const myUrl = `${baseUrl}key=${API_KEY}&q=${searchKeyword}`

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
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        backgroundColor: "red",
        color:"white",
        theme: "none",
        onOpening: function(instance, toast){
            console.info('callback abriu!');
        },
        onClosing: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        }
    });
}


try {
    const response = await fetch(myUrl);    
    const myJson = await response.json();

    if(myJson.total === 0){
        showError();
    } 
    
    console.log(myJson);
    
    const contentUL = document.querySelector(".image-content");
    const contentMarkup = myJson.hits.map(
    ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
        `<li class="content-list-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" width="240" height="225">
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

} catch (error) {
    console.error(error.message);
}








