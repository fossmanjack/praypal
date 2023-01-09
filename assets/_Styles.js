import { StyleSheet } from 'react-native';

export const _Colors = {
	dark: {
		// deprecated, remove
		bubbleTop: '#000e19',
		bubbleBottom: '#733300',
		bubbleTitle: '#f0b746',
		bubbleText: '#F48CBA',
		bubbleInactiveBottom: '#000000',
		bubbleInactiveTop: '#000000',
		bubbleInactiveText: '#000000',
		bubbleInactiveTitle: '#000000',
		bubbleInactiveTitleText: '#000000',
		buttonBackground: '#000e19',
		// buttons
		//buttonActiveBackground: '#002643',
		buttonActiveBackground: '#370075',
		buttonActiveText: '#f0b746',
		buttonInactiveBackground: '#000e19',
		buttonInactiveText: '#a2906e',
		// active card
		//cardActive: '#16002e',
		cardActive: '#0f0020',
		cardActiveGradient: '#733300',
		cardActiveSubtitle: '#fff468',
		cardActiveText: '#f48cba',
		cardActiveTitle: '#f0b746',
		// inactive card
		cardInactive: '#353238',
		cardInactiveGradient: '#000000',
		cardInactiveSubtitle: '#d6cae2',
		cardInactiveText: '#aea4b7',
		cardInactiveTitle: '#4f4f4f',
		//headerBackground: '#000e19',
		headerBackground: '#0f0020',
		headerText: '#f0b746',
		prayerBackground: '#002643',
		prayerText: '#f48cba',
		//SDOButton: '#002643',
		SDOButton: '#370075',
		subtitleText: '#fff468',
		switchTrack: '#808080',
		// tabs
		//tabActiveBackground: '#002643',
		tabActiveBackground: '#370075',
		//tabInactiveBackground: '#000e19',
		tabInactiveBackground: '#0f0020',
	},
	light: {
		bubbleTop: '#000e19',
		bubbleBottom: '#733300',
		bubbleTitle: '#f0b746',
		bubbleText: '#F48CBA',
		buttonBackground: '#000e19',
		buttonActiveText: '#f0b746',
		buttonInactiveText: '#a2906e',
		headerBackground: '#000e19',
		headerText: '#f0b746',
		SDOButton: '#000e19',
		switchTrack: '#808080',
		tabActiveBackground: '#002643',
		tabInactiveBackground: '#000e19',
	}
}

export const _Styles = StyleSheet.create({
	dark: {
		backgroundBlurHash: {
			...StyleSheet.absoluteFill,
			width: '100%',
			height: '100%'
		},
		backgroundImage: {
			...StyleSheet.absoluteFill,
			width: '100%',
			height: '100%',
		},
		cardActive: {
			backgroundColor: _Colors.dark.cardActive,
			borderRadius: 15,
			borderWidth: 0,
		},
		cardBodyText: {
			color: _Colors.dark.bubbleText,

		},
		cardInactive: {
			backgroundColor: _Colors.dark.cardInactive,
			borderRadius: 15,
			borderWidth:0,
		},
		cardInactiveBodyText: {

		},
		cardInactiveSubtitleText: {

		},
		cardInactiveTitle: {
			color:_Colors.dark.cardInactiveTitle,

		},
		cardInactiveTitleText: {

		},
		cardSubtitleText: {
			color: _Colors.dark.subtitleText,
		},
		cardTitle: {
			flexDirection: 'row',
		},
		cardTitleText: {
			color: _Colors.dark.bubbleTitle,
			fontSize: 16,
			textAlign: 'left',
		},
		header: {
			backgroundColor: _Colors.dark.headerBackground,

		},
		headerButton: {
			borderColor: _Colors.dark.headerText,
			borderRadius: 10,
			marginRight: 10,
		},
		headerText: {
			color: _Colors.dark.headerText,
			fontSize: 20,
		},
		inactiveCard: {

		},
		inactiveCardBodyText: {

		},
		inactiveCardSubtitleText: {
			color: _Colors.dark.inactiveSubtitleText,

		},
		inactiveCardTitle: {

		},
		inactiveCardTitleText: {

		},
		prayerText: {
			color: _Colors.dark.prayerText,
		},
		switchStyle: {
			thumbColor: _Colors.dark.bubbleText,
			trackColor: _Colors.dark.switchTrack,
		},

	},
	light: {
		backgroundBlurHash: {
			...StyleSheet.absoluteFill,
			width: '100%',
			height: '100%',
		},
		header: {

		},

	},
});
