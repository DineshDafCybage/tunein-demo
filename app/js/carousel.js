import { lory } from "../js/vendor/lory.js";

var multiSlides,
    slider,
    desktopBreakPoint = 1200;

function handleSlider() {
    multiSlides = document.querySelector('.js_multislides');
    
    if (window.innerWidth > desktopBreakPoint && multiSlides) {
        addClass(multiSlides, 'desktop');
        if (slider) {            
            slider.destroy();
            slider = null;
        }        
    } else {
        if (!slider && multiSlides) {
          
          if (hasClass(multiSlides, 'desktop')) { 
            removeClass(multiSlides, 'desktop');
          }
          
          slider = lory(multiSlides, {
              infinite: 9,
              slidesToScroll: 1,
              enableMouseEvents: true
          });
        }
    }
}

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

document.addEventListener('DOMContentLoaded', handleSlider);
window.addEventListener('resize', handleSlider);