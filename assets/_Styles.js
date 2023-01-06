import { StyleSheet } from 'react-native';

export const _Colors = {
	dark: {
		bubbleTop: '#000e19',
		bubbleBottom: '#733300',
		bubbleTitle: '#f0b746',
		bubbleText: '#F48CBA',
		buttonBackground: '#000e19',
		buttonActiveText: '#f0b746',
		buttonInactiveText: '#a2906e',
		headerBackground: '#000e19',
		headerText: '#f0b746',
		prayerBackground: '#002643',
		prayerText: '#f48cba',
		SDOButton: '#002643',
		subtitleText: '#fff468',
		switchTrack: '#808080',
		tabActiveBackground: '#002643',
		tabInactiveBackground: '#000e19',
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
			backgroundColor: _Colors.dark.bubbleTop,
			borderRadius: 15,
			borderWidth: 0,
		},
		cardBodyText: {
			color: _Colors.dark.bubbleText,

		},
		cardInactive: {

			borderRadius: 15,
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
