//import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar';
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
//import { PRAYERS } from './data/PRAYERS';
//import { FAB } from 'react-native-elements';
//import { Modal, Dialog } from 'react-native';
//import { Button, Icon } from '@rneui/themed';
//import { useState } from 'react';
//import { Provider, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
//import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import BookScreen from './screens/BookScreen';
//import ListScreen from './screens/ListScreen';
//import ReminderScreen from './screens/ReminderScreen';
//import DevScreen from './screens/DevScreen';
import { _Store, _Persist } from './redux/_Store';
//import SpeedDialOverlay from './components/SpeedDialOverlay';
//import { Blurhash } from 'react-native-blurhash';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Loading';
//import OptionsModal from './dialogs/OptionsModal';
import Main from './components/Main';
import { VERSION, FETCHURL } from './data/CONSTANTS';
import { replacePrayerBook, updatePrayerBookVersion } from './slices/prayerSlice';
import { createAndroidReminder } from './slices/reminderSlice';

//const Tab = createBottomTabNavigator();
//const blurHashString = 'eRE#,ia~7jW=aiO@fQrZfjXN2zaz,+oJ$dz;j?O=a#rxtifkv~fPF3';

export default function App() {
//	const [ optionsVisible, toggleOptionsVisible ] = useState(false);
	const dispatch = _Store.dispatch;

	// Ensure all active reminders are "in the system" by re-adding them by
	// ID.  With Notifee adding a reminder with an existing ID just updates
	// that reminder.
	const restoreTriggers = async _ => {
		console.log('Restoring triggers...');
		const rems = _Store.getState().reminder._Reminders;
		// _Reminders is an array of reminder objects
		rems.forEach(r => {
			const { id, title, body, hour, minute, active } = r;

			if(active) {
				const triggerTime = new Date(Date.now());
				triggerTime.setHours(hour, minute, 0);

				createAndroidReminder({
					id,
					title,
					body,
					triggerTime,
					repeatFrequency: 1
				});
			}
		});
	};

	// Fetch prayer book JSON from p3soft servers
	const updatePrayers = async _ => {
		/*
		console.log('Updating prayers...');
		const vData = await fetch(FETCHURL + 'VERSIONS.json');
		console.log('Received vData', vData);
		//const vJson = await vData.json();
		const vJson = await JSON.parse(vData.json());
		console.log('Got vData JSON', vJson);
		//const versions = await JSON.parse(vJson);
		//console.log('Parsed versions', versions);

		const pVersion = versions[VERSION];
		console.log('Found prayer version', pVersion);
		*/
		// Fetches a JSON containing the current prayer book version for each
		// app version.  If the current prayer book version is newer than the
		// stored version, fetch and update both.

		//console.log('Updating prayers...');
		fetch(FETCHURL + 'VERSIONS.json')
			.then(response => response.json())
			.then(data => {
				const newVer = data[VERSION];
				if(newVer && _Store.getState().prayer._BookVersion < newVer) {
					fetch(FETCHURL + `PRAYERS_${VERSION}.json`)
						.then(response => response.json())
						.then(data => {
							console.log('New prayer data:', data);
							dispatch(replacePrayerBook(data));
							dispatch(updatePrayerBookVersion(newVer));
						});
				}
			})
			.catch(err => {
				console.log('ERROR: Fetch failed!', err);
			});
	};
/*

	const Header = props => {

		return (
			<View style={styles.header}>
				<Text>PrayPal: {props.title}</Text>
			</View>
		);
	}

	const OptionsButton = _ => {

		return (
			<Button
				onPress={_ => toggleOptionsVisible(!optionsVisible)}
				type='outline'
				icon={{
					name: 'options-outline',
					type: 'ionicon'
				}}
			/>
		);
	}
*/

	return (
		<PersistGate
			loading={<Loading />}
			persistor={_Persist}
			onBeforeLift={async _ => {
				await restoreTriggers();
				console.log('Done.');
				await updatePrayers();
				console.log('Done.');
			}}
		>
			<Provider store={_Store}>
				<Main />
			</Provider>
		</PersistGate>
	);
/*
	return (
		<PersistGate
			loading={<Loading />}
			persistor={_Persist}
			onBeforeLift={async _ => {
				await restoreTriggers();
				console.log('Done.');
				await updatePrayers();
				console.log('Done.');
			}}
		>
			<Provider store={_Store}>
				<Blurhash blurhash={blurHashString} style={styles.background}/>
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
							tabBarActiveTintColor: 'tomato',
							tabBarInactiveTintColor: 'gray',
						})}
					>
						<Tab.Screen
							name='Book'
							component={BookScreen}
							options={{
								title: '',
								headerTitle: props => <Header title='Prayer Book' />,
								headerRight: _ => <OptionsButton />,
							}}
						/>
						<Tab.Screen
							name='List'
							component={ListScreen}
							options={{
								title: '',
								headerTitle: props => <Header title='Prayer List' />,
								headerRight: _ => <OptionsButton />,
							}}
						/>
						<Tab.Screen
							name='Reminders'
							component={ReminderScreen}
							options={{
								title: '',
								headerTitle: props => <Header title='Reminders' />,
								headerRight: _ => <OptionsButton />,
							}}
						/>
						<Tab.Screen
							name='Dev'
							component={DevScreen}
							options={{
								title: '',
								headerTitle: props => <Header title='Dev Options' />,
								headerRight: _ => <OptionsButton />,
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>
				<SpeedDialOverlay />
				<OptionsModal
					visible={optionsVisible}
					toggleVisible={toggleOptionsVisible}
				/>
			</Provider>
		</PersistGate>
	);
*/

}

/*
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	background: {
		...StyleSheet.absoluteFill,
		width: '100%',
		height: '100%'
	},
	header: {
	},
});

const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent'
	}
};
*/
