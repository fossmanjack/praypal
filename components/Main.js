// Main.js
// Handles all displayed information
// jsp/P3Soft
// 2023-01-04

// React Native imports
import { useState } from 'react';
import {
	ImageBackground,
	Modal,
	Text,
	TextInput,
	View
} from 'react-native';
import { useSelector } from 'react-redux';

// Community imports
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon } from '@rneui/themed';
import { Blurhash } from 'react-native-blurhash';

// Screens
import BookScreen from '../screens/BookScreen';
import ListScreen from '../screens/ListScreen';
import ReminderScreen from '../screens/ReminderScreen';
import DevScreen from '../screens/DevScreen';

// Assets and utils
import { _Styles, _Colors } from '../assets/_Styles';
import * as Utils from '../utils/Utils';
import SpeedDialOverlay from '../components/SpeedDialOverlay';
import Loading from '../components/Loading';
import OptionsModal from '../dialogs/OptionsModal';

const Tab = createBottomTabNavigator();

export default function Main(props) {
	const { theme, devMode } = useSelector(S => S.options);
	const [ optionsVisible, toggleOptionsVisible ] = useState(false);
/*
	const [ backgroundImgSrc, setBackgroundImgSrc ] = useState(theme === 'dark'
		? require('../assets/img/themes/dark/background.png')
		: require('../assets/img/themes/light/background.png');
*/

	const backgroundImgSrc = theme === 'dark'
		? require('../assets/img/themes/dark/background.png')
		: require('../assets/img/themes/light/background.png');

	// Used as the header for all screens
	const Header = props => {

		return (
			<View style={_Styles[theme].header}>
				<Text style={_Styles[theme].headerText}>PrayPal: {props.title}</Text>
			</View>
		);
	}

	// Toggles the options modal
	const OptionsButton = _ => {

		return (
			<Button
				onPress={_ => toggleOptionsVisible(!optionsVisible)}
				type='outline'
				icon={{
					name: 'options-outline',
					type: 'ionicon',
					color: _Colors[theme].headerText,
				}}
				buttonStyle={_Styles[theme].headerButton}
			/>
		);
	}

	return (
		<>
		{/*<Blurhash blurhash={Utils.getBlurHashString(theme)} style={_Styles[theme].backgroundBlurHash}/>*/}
			<ImageBackground source={backgroundImgSrc} style={_Styles[theme].backgroundImage} />
			<NavigationContainer theme={navTheme}>
				<Tab.Navigator
					initialRouteName='List'
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName, iconFamily;

							switch(route.name) {
								case 'Book':
									iconName = focused ? 'book-open' : 'book';
									iconFamily = 'font-awesome-5';
									break;
								case 'List':
									iconName = focused ? 'list-circle' : 'list-circle-outline';
									iconFamily = 'ionicon';
									break;
								case 'Reminders':
									iconName = focused ? 'clock-alert' : 'clock-alert-outline';
									iconFamily = 'material-community';
									break;
								case 'Dev':
									iconName = focused ? 'developer-mode' : 'perm-device-info';
									iconFamily = 'material';
									break;
								case 'Almanac':
									iconName = focused ? 'calendar-text' : 'calendar-text-outline';
									iconFamily = 'material-community';
									break;
								case 'Tracker':
									iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';
									iconFamily='ionicon';
									break;
								default:
									iconName = focused ? 'info-circle' : 'info';
									iconFamily = 'font-awesome';
							}

							return (
								<Icon
									name={iconName}
									type={iconFamily}
									size={size}
									color={color}
								/>
							);
						},
						tabBarActiveTintColor: _Colors[theme].buttonActiveText,
						tabBarInactiveTintColor: _Colors[theme].buttonInactiveText,
						tabBarActiveBackgroundColor: _Colors[theme].tabActiveBackground,
						tabBarInactiveBackgroundColor: _Colors[theme].tabInactiveBackground,
						tabBarStyle: _Styles[theme].tabBar,
						tabBarShowLabel: false,
					})}
				>
					<Tab.Screen
						name='Book'
						component={BookScreen}
						options={{
							title: '',
							headerTitle: props => <Header style={_Styles[theme].header} title='Prayer Book' />,
							headerRight: _ => <OptionsButton />,
							headerStyle: _Styles[theme].header,
						}}
					/>
					<Tab.Screen
						name='List'
						component={ListScreen}
						options={{
							title: '',
							headerTitle: props => <Header title='Prayer List' />,
							headerRight: _ => <OptionsButton />,
							headerStyle: _Styles[theme].header,
						}}
					/>
					<Tab.Screen
						name='Reminders'
						component={ReminderScreen}
						options={{
							title: '',
							headerTitle: props => <Header title='Reminders' />,
							headerRight: _ => <OptionsButton />,
							headerStyle: _Styles[theme].header,
						}}
					/>
					{ devMode && (
						<Tab.Screen
							name='Dev'
							component={DevScreen}
							options={{
								title: '',
								headerTitle: props => <Header title='Dev Options' />,
								headerRight: _ => <OptionsButton />,
								headerStyle: _Styles[theme].header,
							}}
						/>
					)}
				</Tab.Navigator>
			</NavigationContainer>
			<SpeedDialOverlay />
			<OptionsModal
				visible={optionsVisible}
				toggleVisible={toggleOptionsVisible}
			/>
		</>
	);
}

const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent'
	}
};
