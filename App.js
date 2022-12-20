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
import { FAB, Dialog, Icon } from '@rneui/themed';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookScreen from './screens/BookScreen';
import ListScreen from './screens/ListScreen';
import ReminderScreen from './screens/ReminderScreen';
import { _Store } from './redux/_Store';
import SpeedDialOverlay from './components/SpeedDialOverlay';

const Tab = createBottomTabNavigator();

export default function App() {

	return (
		<Provider store={_Store}>
			<NavigationContainer>
				<Tab.Navigator
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
					<Tab.Screen name='Book' component={BookScreen} />
					<Tab.Screen name='List' component={ListScreen} />
					<Tab.Screen name='Reminders' component={ReminderScreen} />
				</Tab.Navigator>
			</NavigationContainer>
			<SpeedDialOverlay />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
