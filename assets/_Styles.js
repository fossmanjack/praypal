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
	sunlightYellow: 'rgba(255, 244, 181, 1.0)',
	sunlightYellowTranslucent: 'rgba(255, 244, 181, 0.7)',
	//parchmentYellowTranslucent: 'rgba(252, 245, 229, 0.6)',
	parchmentYellowTranslucent: 'rgba(252, 245, 229, 0.7)',
	sepia: '#7f462c',
	shadowBoxTranslucent: 'rgba(53, 50, 56, 0.6)',
	//warriorBrown: 'rgba(198, 155, 109, 1.0)',
	warriorBrown: 'rgba(113, 88, 62, 1.0)',
	brickRed: 'rgba(112, 32, 4, 1.0)',
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
		buttonActiveBackground: _ColorRef.buttonPurple,
		buttonActiveText: _ColorRef.titleOrange,
		buttonDialogText: _ColorRef.titleOrange,
		buttonHighlightBackground: _ColorRef.titleOrange,
		buttonHighlightText: _ColorRef.buttonPurple,
		buttonInactiveBackground: '#000e19',
		buttonInactiveText: '#a2906e',
		// active card
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
		// header
		headerBackground: _ColorRef.nightPurple,
		headerText: _ColorRef.titleOrange,
		prayerBackground: '#002643',
		prayerText: _ColorRef.paladinPink,
		// speed dial
		SDOButton: _ColorRef.buttonPurple,
		SDOButtonText: _ColorRef.titleOrange,
		SDOButtonBackground: _ColorRef.nightPurpleTranslucent,
		subtitleText: _ColorRef.rogueYellow,
		switchTrack: '#808080',
		// tabs
		tabActiveBackground: _ColorRef.buttonPurple,
		tabBorder: _ColorRef.nightPurple,
		tabInactiveBackground: '#0f0020',
		//buttonActiveBackground: '#002643',
		//cardActive: '#16002e',
		//tabInactiveBackground: '#000e19',
		//tabActiveBackground: '#002643',
		//headerBackground: '#000e19',
		//SDOButton: '#002643',
	},
	light: {
		// prayerbook colors
		bookHeadingBackground: _ColorRef.parchmentYellowTranslucent,
		bookHeadingText: _ColorRef.warriorBrown,
		bookSubheadingBackground: _ColorRef.parchmentYellowTranslucent,
		bookSubheadingText: _ColorRef.brickRed,
		bookBodyBackground: _ColorRef.sunlightYellowTranslucent,
		bookBodyText: _ColorRef.sepia,
		// buttons
		buttonActiveBackground: _ColorRef.sunlightYellow,
		buttonActiveText: _ColorRef.warriorBrown,
		buttonDialogText: _ColorRef.warriorBrown,
		buttonHighlightBackground: _ColorRef.sunlightYellow,
		buttonHighlightText: _ColorRef.warriorBrown,
		buttonInactiveBackground: '#000e19',
		buttonInactiveText: '#a2906e',
		// active card
		cardActive: _ColorRef.parchmentYellowTranslucent,
		cardActiveBodyText: _ColorRef.sepia,
		cardActiveGradient: '#733300',
		cardActiveSubtitleText: _ColorRef.brickRed,
		cardActiveTitleText: _ColorRef.warriorBrown,
		// inactive card
		cardInactive: _ColorRef.shadowBoxTranslucent,
		cardInactiveBodyText: '#aea4b7',
		cardInactiveGradient: '#000000',
		cardInactiveSubtitleText: '#d6cae2',
		cardInactiveTitleText: '#4f4f4f',
		// header
		headerBackground: _ColorRef.parchmentYellow,
		headerText: _ColorRef.warriorBrown,
		prayerBackground: _ColorRef.sunlightYellowTranslucent,
		prayerText: _ColorRef.sepia,
		// speed dial
		SDOButton: _ColorRef.sunlightYellow,
		SDOButtonText: _ColorRef.warriorBrown,
		SDOButtonBackground: _ColorRef.parchmentYellowTranslucent,
		subtitleText: _ColorRef.brickRed,
		switchTrack: '#808080',
		// tabs
		tabActiveBackground: _ColorRef.sunlightYellow,
		tabBorder: _ColorRef.parchmentYellow,
		tabInactiveBackground: _ColorRef.parchmentYellow,
	},
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
			height: '100%'
		},
		backgroundImage: {
			...StyleSheet.absoluteFill,
			width: '100%',
			height: '100%',
		},
		bookHeading: {
			backgroundColor: _Colors.light.bookHeadingBackground,
		},
		bookSubheading: {
			backgroundColor: _Colors.light.bookSubheadingBackground,
		},
		bookBody: {
			backgroundColor: _Colors.light.bookBodyBackground,
		},
		bookBodyText: {
			color: _Colors.light.bookBodyText,
		},
		buttonActive: {
			backgroundColor: _Colors.light.cardActiveTitleText,

		},
		buttonActiveText: {
			color: _Colors.light.cardActive,

		},
		buttonDialogText: {
			color: _Colors.light.buttonDialogText,
			fontSize: 18,
		},
		buttonInactive: {
			backgroundColor: _Colors.light.cardActive,

		},
		buttonInactiveText: {
			color: _Colors.light.cardActiveTitleText,

		},
		cardActive: {
			backgroundColor: _Colors.light.cardActive,
			borderRadius: 15,
			borderWidth: 0,
		},
		cardActiveBodyText: {
			color: _Colors.light.cardActiveBodyText,

		},
		cardActiveSubtitleText: {
			color: _Colors.light.cardActiveSubtitleText,
		},
		cardActiveTitleText: {
			color: _Colors.light.cardActiveTitleText,
			fontSize: 18,
			textAlign: 'left',
		},
		cardInactive: {
			backgroundColor: _Colors.light.cardInactive,
			borderRadius: 15,
			borderWidth:0,
		},
		cardInactiveBodyText: {
			color: _Colors.light.cardInactiveBodyText,

		},
		cardInactiveSubtitleText: {
			color: _Colors.light.cardInactiveSubtitleText,
		},
		cardInactiveTitleText: {
			color: _Colors.light.cardInactiveTitleText,
			fontSize: 18,
			textAlign: 'left'
		},
		cardTitle: {
			flexDirection: 'row',
		},
		header: {
			backgroundColor: _Colors.light.headerBackground,

		},
		headerButton: {
			borderColor: _Colors.light.headerText,
			borderRadius: 10,
			marginRight: 10,
		},
		headerText: {
			color: _Colors.light.headerText,
			fontSize: 20,
		},
		sdoActionButtonTitle: {
			color: _Colors.light.SDOButtonText,
			backgroundColor: _Colors.light.SDOButtonBackground
		},
		switchStyle: {
			thumbColor: _Colors.light.cardActiveBodyText,
			trackColor: _Colors.light.switchTrack,
		},
		tabBar: {
			borderTopColor: _Colors.light.tabBorder,
			borderTopWidth: 0,
		},
		textInput: {
			padding: 10,
			borderWidth: 1,
			borderColor: _ColorRef.warriorBrown,
			borderRadius: 5,
			color: _ColorRef.sepia,
			backgroundColor: _ColorRef.parchmentYellowTranslucent,
		},

	},
});
