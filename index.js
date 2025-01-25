import{S as y,i as c}from"./assets/vendor-TVMjIRjt.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();window.global||(window.global=window);const b="https://pixabay.com/api/?";let l;const g="48399114-e6afb1ef5f2eaab40be0bb5b8";let s={q:"",image_type:"photo",orientation:"horizontal",safesearch:!0};const p=document.querySelector(".image-content"),d=document.querySelector(".loader");function v(){c.settings({timeout:5e3,transitionIn:"flipInX",transitionOut:"flipOutX"}),c.show({maxWidth:"350px",message:"Sorry, there are no images matching your search query.Please, try again!",position:"topRight",backgroundColor:"red"})}async function w(n){p.innerHTML="",d.style.display="flex";const r=await(await fetch(n)).json();d.style.display="none",r.total===0&&v();const a=r.hits.map(({webformatURL:e,largeImageURL:t,tags:o,likes:u,views:m,comments:f,downloads:h})=>`<li class="content-list-item">
            <div class="container-div">
                <a href="${t}">
                    <img src="${e}" alt="${o}" width="240" height="200">
                </a>
                <div class="content-bottom">
                    <div class="content-bottom-inner">
                        <p><b>Likes</b></p>
                        <p class="stats">${u}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Views</b></p>
                        <p class="stats">${m}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Comments</b></p>
                        <p class="stats">${f}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Downloads</b></p>
                        <p class="stats">${h}</p></div>
                </div> 
            </div> 
        </li>`).join("");p.innerHTML=a,new y(".content-list-item a",{captionsData:"alt",captionDelay:250})}const $=document.querySelector(".search-form"),L=document.querySelector(".search-input");$.addEventListener("submit",n=>{n.preventDefault(),s.q=L.value,l=`${b}key=${g}&q=${s.q}&image_type=${s.image_type}&orientation=${s.orientation}&safesearch=${s.safesearch}`,w(l)});
//# sourceMappingURL=index.js.map
