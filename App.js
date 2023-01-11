//import { StatusBar } from 'expo-status-bar';
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { Provider } from 'react-redux';
import { _Store, _Persist } from './redux/_Store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Loading';
import Main from './components/Main';
import { VERSION, FETCHURL } from './data/CONSTANTS';
import { replacePrayerBook, updatePrayerBookVersion } from './slices/prayerSlice';
import { createAndroidReminder } from './slices/reminderSlice';

export default function App() {
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
}
