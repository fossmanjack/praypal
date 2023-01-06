export const convertCode = input => {
	switch(input) {
		case 'el': return 'Greek/Ελληνικά'; break;
		case 'en': return 'English'; break;
		case 'enUS': return 'English (US)'; break;
		case 'enUK': return 'English (UK)'; break;
		case 'eo': return 'Esperanto'; break;
		case 'ga': return 'Irish/Gaeilge'; break;
		case 'Greek': return 'el'; break;
		case 'English': return 'en'; break;
		case 'Esperanto': return 'eo'; break;
		case 'Irish': case 'Gaeilge': return 'ga'; break;
		default: return 'Unknown';
	};
}


