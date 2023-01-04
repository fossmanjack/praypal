import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { PRAYERS } from './data/PRAYERS';
//import { FAB } from 'react-native-elements';
//import { Modal, Dialog } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookScreen from './screens/BookScreen';
import ListScreen from './screens/ListScreen';
import ReminderScreen from './screens/ReminderScreen';
import DevScreen from './screens/DevScreen';
import { _Store, _Persist } from './redux/_Store';
import SpeedDialOverlay from './components/SpeedDialOverlay';
import { Blurhash } from 'react-native-blurhash';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Loading';
import OptionsModal from './dialogs/OptionsModal';

const Tab = createBottomTabNavigator();
const blurHashString = 'eRE#,ia~7jW=aiO@fQrZfjXN2zaz,+oJ$dz;j?O=a#rxtifkv~fPF3';

export default function App() {
	const [ optionsVisible, toggleOptionsVisible ] = useState(false);

	const restoreTriggers = async _ => {
		console.log('Restoring triggers...');
	};

	const updatePrayers = async _ => {
		console.log('Updating prayers...');
	};

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
}

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
