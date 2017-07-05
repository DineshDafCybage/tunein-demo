/**
 * Regex to check question mark at the end of url.
 * @private {!RegExp}
 */
const regexQuestionMark = /\?$/;

/**
 * Tracking class to track anchor element.
 * @private {string}
 */
const trackerClass = '.js-tracker';

/**
 * Default parameters if not avaiable in url and cookie.
 * @private {Array}
 */
const defaultParams =
  ['utm_source=ampush', 'utm_medium=prospecting', 'utm_campaign=111111222222'];

/**
 * UTM parameters.
 * @private @enum {string}
 */
const UtmParams = {
  UTM_SOURCE: 'utm_source',
  UTM_MEDIUM: 'utm_medium',
  UTM_CAMPAIGN: 'utm_campaign'
};

/**
 * Default parameters for utm parameters.
 * @private @enum {string}
 */
const DefaultParams = {
  UTM_SOURCE: 'ampush',
  UTM_MEDIUM: 'prospecting',
  UTM_CAMPAIGN: '111111222222'
};

/**
 * Valid utm_source values.
 * @private {Array}
 */
const ValidUtmSource = ['ampush', 'insiderenvy'];

/**
 * Valid utm_medium values.
 * @private {Array}
 */
const ValidUtmMedium = ['prospecting', 'retargeting', 'insiderenvy', 'test'];

/**
 * Handles utm parameters functionality.
 * 
 */
export function utmTracker () {
    let queryString = location.search.substr(1);
    let validatedParams;

		if (queryString != '') {
			validatedParams = checkParams(queryString);
			setCookie(validatedParams);
		} else if(document.cookie != '') {
			let cookieParams = getCookie();
			validatedParams = checkParams(cookieParams);
		} else {
		  validatedParams = setDefaultParams(defaultParams);
		}
		setParamsToLinks(validatedParams);

	/**
	 * Sets default parameters if not available.
	 * @return {Array}
	 */
	function setDefaultParams () {
		setCookie(defaultParams);
		return defaultParams;
	};

	/**
	 * Sets parameters to anchor links.
	 */	
	function setParamsToLinks (validatedParams) {
		let anchorEls = document.querySelectorAll(trackerClass);
		validatedParams= validatedParams.join('&');

		anchorEls.forEach(function(anchorEl) {
			anchorEl.href =
			    regexQuestionMark.test(anchorEl.href) ? anchorEl.href +
				      validatedParams : anchorEl.href + '?' + validatedParams;
		});
	}

	/**
	 * Sets paramters in browser cookie.
	 *
	 * @param {string} params utm parameter.
	 */
	function setCookie (params) {
		params.forEach(function(param) {
			document.cookie = param;    
		});
	};

	/**
	 * Gets cookie from browser.
	 */
	function getCookie () {
		let decodedCookie = decodeURIComponent(document.cookie);
		let params = decodedCookie.split('; ').join('&');
		return params;
	};

	/**
	 * Checks for valid parameters.
	 *
	 * @param {string} queryString utm parameters.
	 */
	function checkParams (queryString) {
		let params = queryString.split('&');
		let validParams = [];
		params.forEach(function(param) {
			switch (param.split('=')[0]) {
			case UtmParams.UTM_SOURCE:
				validParams.push(checkValidUtmValue(param));
				break;
			case  UtmParams.UTM_MEDIUM:
				validParams.push(checkValidUtmValue(param));
				break;
			case  UtmParams.UTM_CAMPAIGN:
        validParams.push(validUtmCampaign(param));
				break;
			}
		});
		return validParams;
	};

	/**
	 * Checks for valid campaign value.
	 *
	 * @param {string} param utm parameter.
	 */
  function validUtmCampaign(param) {
	  let value = param.split('=');
		let validValue = [];
		let regexAlphanumeric = /^[a-z0-9]+$/i;
		if (regexAlphanumeric.test(value[1])) {
			validValue.push(value[1]);
		} else {
		  validValue.push(DefaultParams.UTM_CAMPAIGN);
		}
		return value[0] + '=' + validValue[0];	
	};

	/**
	 * Checks for valid source value.
	 *
	 * @param {string} param utm parameter.
	 */
	function checkValidUtmValue(param) {
		let value = param.split('=');
		let validValue = [];
		if (value[0] === UtmParams.UTM_SOURCE) {
			ValidUtmSource.forEach(function(source){
				if (source.match(value[1])) {
					validValue.push(value[1]);
				}
			});
			if (validValue.length == 0) {
				validValue.push(DefaultParams.UTM_SOURCE);
			}
		} else {
			ValidUtmMedium.forEach(function(medium){
				if (medium.match(value[1])) {
					validValue.push(value[1]);
				}
			});
			if (validValue.length == 0) {
				validValue.push(DefaultParams.UTM_MEDIUM);
			}
	  }
    return value[0] + '=' + validValue[0]
	};
}
