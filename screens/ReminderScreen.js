import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	useState,
	useEffect
} from 'react';
import PBO from '../dialogs/PrayerButtonOverlay';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export default function ReminderScreen() {
	const [ loaded, setLoaded ] = useState(false);
	const [ addReminderVisible, setAddReminderVisible ] = useState(false);
	const [ updateReminderVisible, setUpdateReminderVisible ] = useState(false);

	const onCreateTrigger = async t => {
		const date = new Date(t);
		date.setSeconds(date.getSeconds() + 10);

		console.log('onCreateTrigger called...');

		const trigger: TimestampTrigger = {
			type: TriggerType.TIMESTAMP,
			timestamp: date.getTime(),
		};

		console.log('Awaiting permission...');
		await notifee.requestPermission();
		console.log('Done.');

		console.log('Creating channel...');
		const channelId = await notifee.createChannel({
			id: 'portusNotify',
			name: 'Portus Notifications'
		});
		console.log('Done.');

		console.log('Creating trigger notification...');
		await notifee.createTriggerNotification(
			{
				title: 'Test notification',
				body: 'This is a test',
				android: {
					channelId,
					pressAction: {
						id: 'default',
					},
				},
			},
			trigger,
		);
		console.log('Done.');

		notifee.getTriggerNotificationIds().then(ids => console.log('All trigger notifications and IDs:', ids));
	}

	useEffect(_ => {
		if(!loaded) {
			onCreateTrigger(Date.now());
			console.log('Creating trigger at', Date.now());
			setLoaded(true);
		}
	}, []);

	return (
		<View style={styles.container}>
			<Text style={{
				fontWeight: 'bold'
			}}>
				Alarms go here!
			</Text>
			<Button
				title="Add Reminder"
				onPress={_ => onCreateTrigger(Date.now())}
			/>
			<PBO />
		</View>
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
