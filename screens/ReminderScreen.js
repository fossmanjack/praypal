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
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import ReminderAddDialog from '../dialogs/ReminderAddDialog';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
//import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReminderScreen() {
	const [ loaded, setLoaded ] = useState(false);
	const [ addReminderVisible, setAddReminderVisible ] = useState(false);
	const [ updateReminderVisible, setUpdateReminderVisible ] = useState(false);
	const [ newReminderTime, setNewReminderTime ] = useState(new Date(Date.now()));
	const [ showPicker, setShowPicker ] = useState(false);

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
			id: 'celticPrayerNotify',
			name: 'Celtic Prayer Reminders',
			sound: 'church-bell',
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
		console.log('Showing all existing triggers...');

		notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications and IDs:', ids));
		console.log('Done.');
	}

	const addReminder = (time, days) => {
		console.log("New reminder added with", time, days);
	}

	const onChange = (ev, selectedDate) => {
		setNewReminderTime(selectedDate)
	}


	const showTimePicker = _ => {
		setNewReminderTime(new Date(Date.now()));
		console.log('showTimePicker called with', newReminderTime);
		DateTimePickerAndroid.open({
			value: newReminderTime,
			onChange,
			mode: 'time',
			display: 'clock',
			is24Hour: true
		});
	}

/*
	const showTimePicker = _ => {
		console.log('Toggling showPicker to', !showPicker);
		setShowPicker(!showPicker);
	}
*/

	useEffect(_ => {
		if(!loaded) {
			onCreateTrigger(Date.now());
			console.log('Creating trigger at', Date.now());
			setLoaded(true);
		}
	}, []);

	return (
		<>
			<View style={styles.container}>
				<Text style={{
					fontWeight: 'bold'
				}}>
					Alarms go here!
				</Text>
				<Button
					title="Add Reminder"
					onPress={_ => setAddReminderVisible(!addReminderVisible)}
				/>
				<Button
					title="Show Picker"
					onPress={showTimePicker}
				/>
				<Button
					title="Create Trigger"
					onPress={_ => onCreateTrigger(Date.now())}
				/>
			</View>
			<ReminderAddDialog
				isVisible={addReminderVisible}
				toggleVisible={setAddReminderVisible}
				addReminder={addReminder}
				showTimePicker={showTimePicker}
				newReminderTime={newReminderTime}
				setNewReminderTime={setNewReminderTime}
			/>
		</>
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

/*


*/
