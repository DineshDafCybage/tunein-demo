/**
 * Regex to check question mark at the end of url.
 * @private {!RegExp}
 */
const REGEX_QUESTION_MARK = /\?$/;

/**
 * Tracking class to track anchor element.
 * @private {string}
 */
const TRACKER_CLASS = '.js-tracker';

/**
 * Default UTM parameters values.
 * @private {Array}
 */
const DEFAULT_PARAMETERS = 
  ['utm_source=ampush', 'utm_medium=prospecting', 'utm_campaign=amp_kOOYb-7M_lKzAES5TyStJA'];

/**
 * UTM parameters.
 * @private @enum {string}
 */
const UTM_PARAMS = 
  ['utm_source', 'utm_medium', 'utm_campaign']

/**
 * Default parameters for utm parameters.
 * @private @enum {string}
 */
const DefaultParams = {
  UTM_SOURCE: 'ampush',
  UTM_MEDIUM: 'prospecting',
  UTM_CAMPAIGN: 'amp_kOOYb-7M_lKzAES5TyStJA'
};

/**
 * Valid utm_source values.
 * @private {Array}
 */
const VALID_UTM_SOURCE = ['ampush', 'insiderenvy'];

/**
 * Valid utm_medium values.
 * @private {Array}
 */
const VALID_UTM_MEDIUM = ['prospecting', 'retargeting', 'insiderenvy', 'test'];

/**
 * Handles utm parameters functionality.
 * 
 */
export function utmTracker() {
	let queryString = location.search.substr(1);
	let validatedParams;

	if (queryString != '') {
		let params = queryString.split('&');
		params.forEach(function(param) {
			if (param.split('=')[0] == UTM_PARAMS[2]) {
				validUtmCampaign(param);
			}
		});
		if (!queryString.match(UTM_PARAMS[2])) {
		  getOtherParams();
		}
	} else {
	  getOtherParams();
	}

	/**
	 * Gets utm_medium and utm_source params.
	 *
	 * @param {?string} campaignValue utm_campaign parameter.
	 */
	function getOtherParams (campaignValue) {
		if (queryString != '') {
			validatedParams = checkParams(queryString);
			if (campaignValue) {
				validatedParams.push(campaignValue);
			}
			setCookie(validatedParams);
		} else if(document.cookie != '') {
			let cookieParams = getCookie();
			cookieParams = cookieParams.split('; ').join('&');
			validatedParams = checkParams(cookieParams);
		} else {
			validatedParams = setDefaultParams();
		}

		if (validatedParams.length == 3) {
			setParamsToLinks(validatedParams);
		} else {
			validatedParams.push(addMissingParameter());
			setCookie(validatedParams);
			setParamsToLinks(validatedParams);
		}
	}

	/**
	 * Adds missing utm parameter if present in cookie.
	 * @return {string}
	 */
	function addMissingParameter() {
		let missedParam = UTM_PARAMS[2];
		let i = 0, j = 0;
		for (;i < UTM_PARAMS.length;i++) {
			for (;j < validatedParams.length;j++) {
				let validatedParam = validatedParams[i].split('=')[0];
				if(validatedParam.match(UTM_PARAMS[j])) {
					j = j + 1;
					break
				} else {
					missedParam = UTM_PARAMS[j];
				}
			}
		}		
		return getParamValue(missedParam);
	}
	
	
	/**
	 * Sets default parameters if not available.
	 * @return {Array}
	 */
	function setDefaultParams() {
		setCookie(DEFAULT_PARAMETERS);
		return DEFAULT_PARAMETERS;
	}

	/**
	 * Sets parameters to anchor links.
	 */	
	function setParamsToLinks(validatedParams) {
		let anchorEls = document.querySelectorAll(TRACKER_CLASS);
		validatedParams= validatedParams.join('&');

		for (let i = 0; i < anchorEls.length; i++) {
			anchorEls[i].href =
			    REGEX_QUESTION_MARK.test(anchorEls[i].href) ? anchorEls[i].href +
				      validatedParams : anchorEls[i].href + '?' + validatedParams;
		};
	}

	/**
	 * Sets paramters in browser cookie.
	 *
	 * @param {string} params utm parameter.
	 */
	function setCookie(params) {
		let date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
		let expires = "expires=" + date.toUTCString();
		params.forEach(function(param) {
			document.cookie = param + ';' + expires;    
		});
	}

	/**
	 * Gets cookie from browser.
	 */
	function getCookie() {
		let decodedCookie = decodeURIComponent(document.cookie);
		return decodedCookie;
	}

	/**
	 * Checks for valid parameters.
	 *
	 * @param {string} queryString utm parameters.
	 */
	function checkParams(queryString) {
		let params = queryString.split('&');
		let validParams = [];
		params.forEach(function(param) {
			switch (param.split('=')[0]) {
			case UTM_PARAMS[0]:
				validParams.push(checkValidUtmValue(param));
				break;
			case  UTM_PARAMS[1]:
				validParams.push(checkValidUtmValue(param));
				break;
			}
		});
		return validParams;
	}

	/**
	 * Checks for valid campaign value.
	 *
	 * @param {string} param utm parameter.
	 */
  function validUtmCampaign(param) {
	  let value = param.split('=');
		let validValue = [];
		let ampId;
		let regexAlphanumeric = /^[a-z0-9]+$/i;
		if (regexAlphanumeric.test(value[1])) {
		  ampService(value[1]).then(function(response) {
				  ampId = JSON.parse(response);
    		  validValue.push(ampId.amp_id);
					getOtherParams(value[0] + '=' + validValue[0]);
			  })
				.catch(function (error) {
          console.log(error);
				});
		} else {
		  return getParamValue(value[0]);
		}		
	}

	/**
	 * Calls AMP api service and returns encoded utm_campaign value.
	 *
	 * @param {string} campaignValue utm_campaign value.
	*/
	function ampService(campaignValue) {
	  // Return a new promise.
	  return new Promise(function(resolve, reject) {
			let xhttp = new XMLHttpRequest();
			xhttp.open('POST', 'https://ampid.ampush.io/translate?id=' + campaignValue, true);
			xhttp.onload = function() {
				if (xhttp.status == 200) {
					// Resolve the promise with the response text.
					resolve(xhttp.response);
				} else {
					// Otherwise reject with the status text.
					reject(Error(xhttp.statusText));
				}
			};

			xhttp.send();
		});
  }

  /**
	 * Checks for valid utm parameter value.
	 *
	 * @param {string} param utm parameter.
	 */
	function checkValidUtmValue(param) {
		let value = param.split('=');
		let validValue = [];
		if (value[0] === UTM_PARAMS[0]) {
			VALID_UTM_SOURCE.forEach(function(source){
				if (source.match(value[1])) {
					validValue.push(value[1]);
				}
			});
			if (validValue.length == 0) {
				return getParamValue(value[0]);
			} else {
			  return value[0] + '=' + validValue[0]
			}
		} else {
			VALID_UTM_MEDIUM.forEach(function(medium){
				if (medium.match(value[1])) {
					validValue.push(value[1]);
				}
			});
			if (validValue.length == 0) {
        return getParamValue(value[0]);
			} else {
			  return value[0] + '=' + validValue[0]
			}
	  }
	}
	
	/**
	 * Search for a specific utm paramter in cookie, if avialable return the
	 * value otherwise set default value.
	 *
	 * @param {string} utmValue utm parameter value.
	 * @return {string} utm parameter with key, value pair.
	 */	
	function getParamValue(utmValue) {
		let specificParam;
		let cookieParams = getCookie();
		cookieParams = cookieParams.split('; ');
		cookieParams.forEach(function(param) {
			if (param.match(utmValue)) {
				specificParam = param;
			}
		});
		if (!specificParam) {
			switch (utmValue) {
				case UTM_PARAMS[0]:
					specificParam = UTM_PARAMS[0] + '=' + DefaultParams.UTM_SOURCE;
					break;
				case UTM_PARAMS[1]:
					specificParam = UTM_PARAMS[1] + '=' + DefaultParams.UTM_MEDIUM;
					break;
				case UTM_PARAMS[2]:
					specificParam = UTM_PARAMS[2] + '=' + DefaultParams.UTM_CAMPAIGN;
					break;
			}
		}
		return specificParam;
	}
}
