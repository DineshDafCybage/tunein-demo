
import { smoothScroll } from "../js/smooth-scroll.js";
import { utmTracker } from "../js/utm-tracker.js";

/**
 * Manages functionality on tuneIn page.
 */
export function tuneIn () {
	new utmTracker();
	new smoothScroll();
}

window.onload = new tuneIn ();
