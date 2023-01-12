import {
	FlatList,
	Image,
	ImageBackground,
	Linking,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	ToastAndroid,
	View
} from 'react-native';
import {
	Button,
	ButtonGroup,
	Card,
	CheckBox
} from '@rneui/themed';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Opts from '../slices/optionsSlice';
import * as CONSTANTS from '../data/CONSTANTS';
import * as Utils from '../utils/Utils';
import { convertCode } from '../utils/IETF';
import { _Styles, _Colors } from '../assets/_Styles';

export default function OptionsModal(props) {
	const { visible, toggleVisible } = props;
	const { theme, denomination, language, devMode } = useSelector(S => S.options);
	const { _Book, _BookVersion } = useSelector(S => S.prayer);
	const [ devPress, setDevPress ] = useState(0);
	const [ loading, setLoading ] = useState(true);
	const dispatch = useDispatch();
	const backgroundImgSrc = theme === 'dark'
		? require('../assets/img/themes/dark/background.png')
		: require('../assets/img/themes/light/background.png');
	const logoSrc = require('../assets/img/p3soft_logo_128.png');

	const LANGS = Object.keys(_Book);
	const DENOMS = [
		'orthodox',
		'catholic',
		'protestant',
		'universal'
	];
	const THEMES = Object.keys(_Styles);
	const [ themeIdx, setThemeIdx ] = useState(THEMES.indexOf(theme));

	// Function to toggle dev mode
	const onTap = _ => {
		if(devPress === 0)
			setTimeout(_ => setDevPress(0), 3000);
		setDevPress(devPress + 1);
		if(devPress >= 5) {
			setDevPress(0);
			dispatch(Opts.toggleDevMode());
		}
	}

	// Sends toast to indicate dev mode enabled/disabled
	useEffect(_ => {
		if(loading) {
			setLoading(false);
		} else if(visible) {
			const msg = devMode ? 'enabled' : 'disabled';
			ToastAndroid.show(`Developer mode ${msg}`, ToastAndroid.LONG);
		}
	}, [ devMode ]);

	// Language selector button group
	const renderLanguageSelector = (data, rowMap) => {
		const langStr = convertCode(data.item);
		console.log('renderLanguageSelector for', data, ':', langStr);
		console.log('language', data.item, 'is', language.includes(data.item) ? '' : 'not', 'present');
		const checked = language.includes(data.item);

		return (
			<CheckBox
				title={langStr}
				checked={checked}
				onPress={_ => dispatch(Opts.toggleLanguage(data.item))}
				containerStyle={[ _Styles[theme].cardActive, { flex: 1/2 } ]}
				textStyle={_Styles[theme].cardActiveTitleText}
				uncheckedColor={_Colors[theme].cardInactiveSubtitleText}
				checkedColor={_Colors[theme].cardActiveSubtitleText}
			/>
		);
	};

	// Denomination selector button group
	const renderDenominationSelector = (data, rowMap) => {
		const denomStr = Utils.capitalize(data.item);
		const checked = denomination.includes(data.item);

		return (
			<CheckBox
				title={denomStr}
				checked={checked}
				onPress={_ => dispatch(Opts.toggleDenomination(data.item))}
				containerStyle={[ _Styles[theme].cardActive, { flex: 1/2 } ]}
				textStyle={_Styles[theme].cardActiveTitleText}
				uncheckedColor={_Colors[theme].cardInactiveSubtitleText}
				checkedColor={_Colors[theme].cardActiveSubtitleText}
			/>
		);
	};

	return (
		<Modal
			visible={visible}
			animationType={'fade'}
		>
			<ImageBackground source={backgroundImgSrc} style={_Styles[theme].backgroundImage} />

		{/* header */}
			<View style={[
				_Styles[theme].header,
				{
					flexDirection: 'row',
					paddingVertical: 10,
					width: '100%',
				}
			]}>
				<Text style={[ _Styles[theme].headerText, { marginVertical: 10, marginLeft: 10, marginRight: 'auto' } ]}>PrayPal: Options</Text>
				<Button
					onPress={_ => toggleVisible(!visible)}
					type='outline'
					icon={{
						name: 'options-outline',
						type: 'ionicon',
						color: _Colors[theme].headerText,
					}}
					buttonStyle={_Styles[theme].headerButton}
					containerStyle={{ alignSelf: 'flex-end' }}
				/>
			</View>

		{/* set theme */}
			<Card containerStyle={_Styles[theme].cardActive}>
				<Card.Title style={_Styles[theme].cardActiveTitleText}>
					Theme
				</Card.Title>
				<ButtonGroup
					buttons={[ ...THEMES.map(t => Utils.capitalize(t)) ]}
					selectedIndex={themeIdx}
					onPress={value => {
						dispatch(Opts.setTheme(THEMES[value]));
						setThemeIdx(value);
					}}
					selectedButtonStyle={_Styles[theme].buttonActive}
					selectedTextStyle={_Styles[theme].buttonActiveText}
					buttonStyle={_Styles[theme].buttonInactive}
					textStyle={_Styles[theme].buttonInactiveText}
					containerStyle={{
						borderColor: _Colors[theme].cardActiveTitleText,
						borderRadius: 10
					}}
					innerBorderStyle={{
						color: _Colors[theme].cardActiveBodyText,
					}}
				/>
			</Card>

		{/* set languages */}
			<Card containerStyle={_Styles[theme].cardActive}>
				<Card.Title style={_Styles[theme].cardActiveTitleText}>
					Languages
				</Card.Title>
				<FlatList
					data={LANGS}
					keyExtractor={item => `select-${item}`}
					renderItem={renderLanguageSelector}
					numColumns={2}
				/>
			</Card>

		{/* set denominations */}
			<Card containerStyle={_Styles[theme].cardActive}>
				<Card.Title style={_Styles[theme].cardActiveTitleText}>
					Denominations
				</Card.Title>
				<FlatList
					data={DENOMS}
					keyExtractor={item => `select-${item}`}
					renderItem={renderDenominationSelector}
					numColumns={2}
				/>

			</Card>

		{/* about plate */}
			<Pressable
				onPress={onTap}
			>
				<Card containerStyle={_Styles[theme].cardActive}>
					<Card.Title style={_Styles[theme].cardActiveTitleText}>
						About
					</Card.Title>
					<View style={{ flexDirection: 'row' }}>
						<Pressable onPress={_ => Linking.openURL('https://p3soft.com/praypal')}>
							<Image
								source={logoSrc}
								style={{
									borderWidth: 1,
									borderRadius: 10,
									borderColor: _Colors[theme].headerText,
									marginRight: 10
								}}
							/>
						</Pressable>
						<View>
							<View style={{ flexDirection: 'row' }}>
								<Text style={_Styles[theme].cardActiveSubtitleText}>
									Version:
								</Text>
								<Text style={[ _Styles[theme].cardActiveBodyText, { marginLeft: 4 } ]}>
									{CONSTANTS.VERSION}
								</Text>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<Text style={_Styles[theme].cardActiveSubtitleText}>
									Prayer Book Version:
								</Text>
								<Text style={[ _Styles[theme].cardActiveBodyText, { marginLeft: 4 } ]}>
									{_BookVersion}
								</Text>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<Text style={_Styles[theme].cardActiveSubtitleText}>
									Contact:
								</Text>
								<Text style={[ _Styles[theme].cardActiveBodyText, { marginLeft: 4 } ]}>
									praypal@p3soft.com
								</Text>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<Text style={_Styles[theme].cardActiveSubtitleText}>
									Web:
								</Text>
								<Text style={[ _Styles[theme].cardActiveBodyText, { marginLeft: 4 } ]}>
									https://p3soft.com/praypal
								</Text>
							</View>
						</View>
					</View>
				</Card>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',

	}
});
