import { StyleSheet } from 'react-native';

const _ColorRef = {
	paladinPink: '#f48cba',
	rogueYellow: '#fff468',
	druidOrange: '#ff7c0a',
	titleOrange: '#f0b746',
	nightPurple: '#0f0020',
	buttonPurple: '#370075',
	nightBlue: 'rgb(0, 38, 67)',
	nightBlueTranslucent: 'rgba(0, 38, 67, 0.7)',
	nightPurpleTranslucent: 'rgba(15, 0, 32, 0.6)',
	parchmentYellow: '#fcf5e5',
	parchmentYellowTranslucent: 'rgba(252, 245, 229, 0.6)',
	sepia: '#7f462c',
	shadowBoxTranslucent: 'rgba(53, 50, 56, 0.6)',
	warriorBrown: 'rgba(198, 155, 109, 1.0)',
}

export const _Colors = {
	dark: {
		// prayerbook colors
		bookHeadingBackground: _ColorRef.nightPurpleTranslucent,
		bookHeadingText: _ColorRef.titleOrange,
		bookSubheadingBackground: _ColorRef.nightPurpleTranslucent,
		bookSubheadingText: _ColorRef.rogueYellow,
		bookBodyBackground: 'rgba(55, 0, 117, 0.8)',
		bookBodyText: _ColorRef.paladinPink,
		// buttons
		//buttonActiveBackground: '#002643',
		buttonActiveBackground: _ColorRef.buttonPurple,
		buttonActiveText: _ColorRef.titleOrange,
		buttonDialogText: _ColorRef.titleOrange,
		buttonHighlightBackground: _ColorRef.titleOrange,
		buttonHighlightText: _ColorRef.buttonPurple,
		buttonInactiveBackground: '#000e19',
		buttonInactiveText: '#a2906e',
		// active card
		//cardActive: '#16002e',
		cardActive: _ColorRef.nightPurpleTranslucent,
		cardActiveBodyText: _ColorRef.paladinPink,
		cardActiveGradient: '#733300',
		cardActiveSubtitleText: _ColorRef.rogueYellow,
		cardActiveTitleText: _ColorRef.titleOrange,
		// inactive card
		cardInactive: _ColorRef.shadowBoxTranslucent,
		cardInactiveBodyText: '#aea4b7',
		cardInactiveGradient: '#000000',
		cardInactiveSubtitleText: '#d6cae2',
		cardInactiveTitleText: '#4f4f4f',
		//headerBackground: '#000e19',
		headerBackground: _ColorRef.nightPurple,
		headerText: _ColorRef.titleOrange,
		prayerBackground: '#002643',
		prayerText: _ColorRef.paladinPink,
		//SDOButton: '#002643',
		SDOButton: _ColorRef.buttonPurple,
		SDOButtonText: _ColorRef.titleOrange,
		SDOButtonBackground: _ColorRef.nightPurpleTranslucent,
		subtitleText: _ColorRef.rogueYellow,
		switchTrack: '#808080',
		// tabs
		//tabActiveBackground: '#002643',
		tabActiveBackground: _ColorRef.buttonPurple,
		tabBorder: _ColorRef.nightPurple,
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
		bookHeading: {
			backgroundColor: _Colors.dark.bookHeadingBackground,
		},
		bookSubheading: {
			backgroundColor: _Colors.dark.bookSubheadingBackground,
		},
		bookBody: {
			backgroundColor: _Colors.dark.bookBodyBackground,
		},
		bookBodyText: {
			color: _Colors.dark.bookBodyText,
		},
		buttonActive: {
			backgroundColor: _Colors.dark.cardActiveTitleText,

		},
		buttonActiveText: {
			color: _Colors.dark.cardActive,

		},
		buttonDialogText: {
			color: _Colors.dark.buttonDialogText,
			fontSize: 18,
		},
		buttonInactive: {
			backgroundColor: _Colors.dark.cardActive,

		},
		buttonInactiveText: {
			color: _Colors.dark.cardActiveTitleText,

		},
		cardActive: {
			backgroundColor: _Colors.dark.cardActive,
			borderRadius: 15,
			borderWidth: 0,
		},
		cardActiveBodyText: {
			color: _Colors.dark.cardActiveBodyText,

		},
		cardActiveSubtitleText: {
			color: _Colors.dark.cardActiveSubtitleText,
		},
		cardActiveTitleText: {
			color: _Colors.dark.cardActiveTitleText,
			fontSize: 18,
			textAlign: 'left',
		},
		cardInactive: {
			backgroundColor: _Colors.dark.cardInactive,
			borderRadius: 15,
			borderWidth:0,
		},
		cardInactiveBodyText: {
			color: _Colors.dark.cardInactiveBodyText,

		},
		cardInactiveSubtitleText: {
			color: _Colors.dark.cardInactiveSubtitleText,
		},
		cardInactiveTitleText: {
			color: _Colors.dark.cardInactiveTitleText,
			fontSize: 18,
			textAlign: 'left'
		},
		cardTitle: {
			flexDirection: 'row',
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
		sdoActionButtonTitle: {
			color: _Colors.dark.SDOButtonText,
			backgroundColor: _Colors.dark.SDOButtonBackground
		},
		switchStyle: {
			thumbColor: _Colors.dark.cardActiveBodyText,
			trackColor: _Colors.dark.switchTrack,
		},
		tabBar: {
			borderTopColor: _Colors.dark.tabBorder,
			borderTopWidth: 0,
		},
		textInput: {
			padding: 10,
			borderWidth: 1,
			borderColor: _ColorRef.titleOrange,
			borderRadius: 5,
			color: _ColorRef.paladinPink,
			backgroundColor: _ColorRef.nightBlueTranslucent
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
