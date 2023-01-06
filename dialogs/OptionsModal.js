import {
	FlatList,
	ImageBackground,
	Modal,
	Pressable,
	StyleSheet,
	Text,
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
	const { theme, denomination, language } = useSelector(S => S.options);
	const { _Book, _BookVersion } = useSelector(S => S.prayer);
	const [ devPress, setDevPress ] = useState(0);
	const dispatch = useDispatch();
	const backgroundImgSrc = theme === 'dark'
		? require('../assets/img/themes/dark/background.png')
		: require('../assets/img/themes/light/background.png');

	const LANGS = Object.keys(_Book);
	const DENOMS = [
		'orthodox',
		'catholic',
		'protestant',
		'universal'
	];
	const THEMES = Object.keys(_Styles);
	const [ themeIdx, setThemeIdx ] = useState(THEMES.indexOf(theme));

	console.log('optionsModal:\n\t', language, '\n\t', denomination);


	const onTap = _ => setDevPress(devPress++);

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
			/>
		);
	};

	const renderDenominationSelector = (data, rowMap) => {
		const denomStr = Utils.capitalize(data.item);
		const checked = denomination.includes(data.item);

		return (
			<CheckBox
				title={denomStr}
				checked={checked}
				onPress={_ => dispatch(Opts.toggleDenomination(data.item))}
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
				<Card.Title style={_Styles[theme].cardTitleText}>
					Theme
				</Card.Title>
				<ButtonGroup
					buttons={[ ...THEMES.map(t => Utils.capitalize(t)) ]}
					selectedIndex={themeIdx}
					onPress={value => {
						dispatch(Opts.setTheme(THEMES[value]));
						setThemeIdx(value);
					}}
				/>
			</Card>

		{/* set languages */}
			<Card containerStyle={_Styles[theme].cardActive}>
				<Card.Title style={_Styles[theme].cardTitleText}>
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
				<Card.Title style={_Styles[theme].cardTitleText}>
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
				onLongPress={_ => dispatch(Opts.toggleDevMode())}
			>
				<Card containerStyle={_Styles[theme].cardActive}>
					<Card.Title style={_Styles[theme].cardTitleText}>
						About
					</Card.Title>
					<View style={{ flexDirection: 'row' }}>
						<Text style={_Styles[theme].cardSubtitleText}>
							Version:
						</Text>
						<Text style={[ _Styles[theme].cardBodyText, { marginLeft: 4 } ]}>
							{CONSTANTS.VERSION}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={_Styles[theme].cardSubtitleText}>
							Prayer Book Version:
						</Text>
						<Text style={[ _Styles[theme].cardBodyText, { marginLeft: 4 } ]}>
							{_BookVersion}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={_Styles[theme].cardSubtitleText}>
							Contact:
						</Text>
						<Text style={[ _Styles[theme].cardBodyText, { marginLeft: 4 } ]}>
							praypal@p3soft.com
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={_Styles[theme].cardSubtitleText}>
							Web:
						</Text>
						<Text style={[ _Styles[theme].cardBodyText, { marginLeft: 4 } ]}>
							https://p3soft.com/praypal
						</Text>
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
