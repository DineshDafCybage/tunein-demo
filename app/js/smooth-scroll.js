import {jump} from "../js/vendor/jump";

/**
 * Scroll duration.
 * @private {number}
 */
const scrollDuration = 900;

/**
 * Handles smooth scroll functionality.
 */
export function smoothScroll () {
	let pageUrl = location.hash ? stripHash(location.href) : location.href;
	directLinkHijacking();

	/**
	 * Gets anchor element and register a click event.
	 */
	function directLinkHijacking() {
		[].slice.call(document.querySelectorAll('a')).filter(isInPageLink).forEach(
			function(a) {
				a.addEventListener('click', handleScroll, false);
			});
	}

	/**
	 * Handles smooth scrolling of page.
	 */
	function handleScroll(e) {
		e.stopPropagation();
		e.preventDefault();
		jump(this.getAttribute('href'), {
			duration: scrollDuration
		});
	}

	/**
	 * Manipulate anchor element.
	 */
	function isInPageLink(n) {
		return n.tagName.toLowerCase() === 'a' && n.hash.length > 0 && stripHash(n.href) ===
			pageUrl;
	}

	/**
	 * Strip hash value
	 *
	 * @param {string} url Page url.
	 */
	function stripHash(url) {
		return url.slice(0, url.lastIndexOf('#'));
	}
}
