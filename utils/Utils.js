// Converts toLocaleTimeString() output to HH:mm
export const niceTime = d => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(':').slice(0, 2).join(':');

// Strips forbidden characters from a string
export const sanitize = str => str ? str.replace(/[~!@#$%^&*().,<>?_=+:;\'\"\/\-\[\]\{\}\\\|\`]/g, '') : false;

// Converts a string to camelCase
export const camelize = str => str ? str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase()) : false;

// Truncates a string at the given length and adds an ellipsis
export const truncateString = (str, num) => str.length >= num ? str.slice(0, num)+' ...' : str;

// Strips leading and trailing spaces, sanitizes, camelizes input string
export const parseName = val => val ? camelize(sanitize(val.trim())) : '';

// Checks whether two strings collide in their parsed form
export const collisionCheck = (a, b) => parseName(a) === parseName(b);

export const getBlurHashString = theme => {
	switch(theme) {
		default:
			return 'eRE#,ia~7jW=aiO@fQrZfjXN2zaz,+oJ$dz;j?O=a#rxtifkv~fPF3';
	}
};

