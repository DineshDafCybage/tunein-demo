import { customTracker } from "../js/custom-tracker.js";
import { utmTracker } from "../js/utm-tracker.js";
import { carousel } from "../js/carousel.js";
import { smoothScroll } from "../js/smooth-scroll.js";
import { detectOS } from "../js/detect-os.js";
import Blazy from "../js/vendor/blazy.js";

/**
 * Manages functionality on tuneIn page.
 */
export function tuneIn () {
  new customTracker();
  new utmTracker();
  new carousel();
	new smoothScroll();
	new detectOS();
	new Blazy({
    breakpoints: [{
	    width: 420,
      src: 'data-src-small'
	  }]
  });
}

window.onload = new tuneIn ();
