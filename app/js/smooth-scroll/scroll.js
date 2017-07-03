import smoothScrollTo from 'smooth-scroll-to';

var scrollFrom = document.getElementById('scroll-from');
var scrollBtn = document.getElementById('scroll-btn');
var target = document.getElementById('whatson-tunein');

var carouselContainer = document.getElementsByClassName('block__whatson-carousel')[0];
var carouselImg = carouselContainer.getElementsByTagName('img');

scrollBtn.addEventListener('click', scrollTo);

for (var i = 0; i < carouselImg.length; i++) {
    carouselImg[i].addEventListener('click', carouselScrollTo);
}

function scrollTo() {
    smoothScrollTo(scrollFrom.offsetHeight+scrollBtn.offsetHeight);
}

function carouselScrollTo() {
    smoothScrollTo(scrollFrom.offsetHeight+target.offsetHeight);
}