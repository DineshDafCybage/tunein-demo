/**
 * Detects OS and appends class to the body tag.
 */
export function detectOS() {
	let getBody = document.getElementsByTagName('body')[0];
	if (navigator.appVersion.indexOf("Mac")!=-1) {
		getBody.classList.add('ios');
	} else if (navigator.appVersion.indexOf("X11")!=-1) {
		getBody.classList.add('ubuntu');
	}
}