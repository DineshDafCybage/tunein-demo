import { lory } from "../js/vendor/lory.js";

/**
 * Check white space at start.
 * @private {!RegExp}
 */
const REGEX_WHITE_SPACE_START = '(\\s|^)';

/**
 * Check white space at end.
 * @private {!RegExp}
 */
const REGEX_WHITE_SPACE_END = '(\\s|$)';

/**
 * Break point after which carousel will disable.
 * @private {number}
 */
const DESKTOP_BREAK_POINT = 1200;

/**
 * Slider Classes to manipulate carousel.
 * @private @enum {string}
 */
const SliderClasses = {
  MULTI_SLIDES: '.js_multislides',
  DESKTOP: 'desktop'
};


/**
 * Manages carousel functionality for smaller viewports.
 * 
 */
export function carousel () {
	document.addEventListener('DOMContentLoaded', handleSlider);
  window.addEventListener('resize', handleSlider);
	var slider;
	/**
	 * Enable or disable carousel depends on viewport.
	 */
	function handleSlider() {
		let multiSlides = document.querySelector(SliderClasses.MULTI_SLIDES);

		if (window.innerWidth > DESKTOP_BREAK_POINT && multiSlides) {
				addClass(multiSlides, SliderClasses.DESKTOP);
				if (slider) {            
					slider.destroy();
					slider = null;
				}        
		} else {
			if (!slider && multiSlides) {
				if (hasClass(multiSlides, SliderClasses.DESKTOP)) { 
					removeClass(multiSlides, SliderClasses.DESKTOP);
				}

				slider = lory(multiSlides, {
						infinite: 9,
						slidesToScroll: 1,
						enableMouseEvents: false
				});
			}
		}
	}

	/**
	 * Checks for class name.
	 * 
	 * @param {!Element} el Element.
	 * @param {string} className Name of class.
	 */
	function hasClass(el, className) {
		if (el.classList)
			return el.classList.contains(className)
		else
			return !!el.className.match(new RegExp(REGEX_WHITE_SPACE_START +
			    className + REGEX_WHITE_SPACE_END))
	}

	/**
	 * Adds class to an element.
	 * 
	 * @param {!Element} el Element.
	 * @param {string} className Name of class.
	 */
	function addClass(el, className) {
		if (el.classList)
			el.classList.add(className)
		else if (!hasClass(el, className)) el.className += " " + className
	}

	/**
	 * Removes class from an element.
	 * 
	 * @param {!Element} el Element.
	 * @param {string} className Name of class.
	 */
	function removeClass(el, className) {
		if (el.classList)
			el.classList.remove(className)
		else if (hasClass(el, className)) {
			var reg = new RegExp(REGEX_WHITE_SPACE_START + className +
			    REGEX_WHITE_SPACE_END)
			el.className=el.className.replace(reg, ' ')
		}
	}
}
