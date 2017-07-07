/**
 * Tracking class to add custom tracker onclick of link.
 * @private @enum {string}
 */
const TrackerClasses = {
  HERO_CTA: 'js-hero-tracker',
	LANDING_CTA: 'js-landing-tracker',
	FOOTER_CTA: 'js-footer-tracker'
};


/**
 * Handles onclick tracking functionality for CTA buttons. This is CTA
 * tracking code so do not modify.
 * 
 */
export function customTracker () {
	let heroCtaEl = document.getElementsByClassName(TrackerClasses.HERO_CTA)[0];
	let landingCtaEl = document.getElementsByClassName(TrackerClasses.LANDING_CTA)[0];
	let footerCtaEl = document.getElementsByClassName(TrackerClasses.FOOTER_CTA)[0];

  heroCtaEl.addEventListener('click', heroCtaTracker);	
  landingCtaEl.addEventListener('click', landingCtaTracker);	
  footerCtaEl.addEventListener('click', footerCtaTracker);	
	
	/**
	 * Tracking code for hero CTA button.
	 */
	function heroCtaTracker() {
		/* -------------------------------------*/
		// Facebook Pixel Code
		fbq('trackCustom', 'CTAButtonClickLandingPage')
		fbq('trackCustom', 'InitiateSignUp')
		fbq('trackCustom', 'CTAButtonClickHeroLandingPage')
		// Ampush Tracking Pixel Code
		ampt.track('CTAButtonClickLandingPage')
		ampt.track('InitiateSignUp')
		ampt.track('CTAButtonClickHeroLandingPage')
		/* -------------------------------------*/
	}

	/**
	 * Tracking code for Go Premium section CTA button.
	 */
	function landingCtaTracker() {
		/* -------------------------------------*/
		// Facebook Pixel Code
		fbq('trackCustom', 'CTAButtonClickLandingPage')
		fbq('trackCustom', 'InitiateSignUp')
		fbq('trackCustom', 'CTAButtonClickSecondLandingPage')
		// Ampush Tracking Pixel Code
		ampt.track('CTAButtonClickLandingPage')
		ampt.track('InitiateSignUp')
		ampt.track('CTAButtonClickSecondLandingPage')
		/* -------------------------------------*/
	}

	/**
	 * Tracking code for footer CTA button.
	 */
	function footerCtaTracker() {
		/* -------------------------------------*/
		// Facebook Pixel Code
		fbq('trackCustom', 'CTAButtonClickLandingPage')
		fbq('trackCustom', 'InitiateSignUp')
		fbq('trackCustom', 'CTAButtonClickFooterLandingPage')
		// Ampush Tracking Pixel Code
		ampt.track('CTAButtonClickLandingPage')
		ampt.track('InitiateSignUp')
		ampt.track('CTAButtonClickFooterLandingPage')
		/* -------------------------------------*/
	}
}
