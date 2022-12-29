import {
	Button,
	Chip,
	Dialog
} from 'react-native-elements';
import {
	View,
	Text
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as Reminder from '../utils/Reminder';

export default function ReminderAddDialog(props) {
//	const [ reminderTime, setReminderTime ] = useState(0);
//	const [ reminderDays, setReminderDays ] = useState([ false, false, false, false, false, false, false ]);
	const { visible, toggleVisible } = props;
	const _ReminderDays = {
		'monday': false,
		'tuesday': false,
		'wednesday': false,
		'thursday': false,
		'friday': false,
		'saturday': false,
		'sunday': false
	};
	const [ reminderDays, setReminderDays ] = useState(_ReminderDays);
	const [ newReminderTime, setNewReminderTime ] = useState(new Date(Date.now()));
	const [ reminderTitle, setReminderTitle ] = useState('');
	const [ showPicker, setShowPicker ] = useState(false);
/*
	const {
		isVisible,
		toggleVisible,
		addReminder,
		showTimePicker,
		newReminderTime,
		setNewReminderTime
	} = props;
*/
	const resetState = _ => {
		setReminderDays(_ReminderDays);
		setNewReminderTime(new Date(Date.now()));
		setReminderTitle('');
	}

	const DayChip = ({ day }) => {
		const myTitle = day.toUpperCase()[0];
		const myStatus = reminderDays[day];
		console.log('Rendering daychip for', day, 'with title', myTitle);

		return (
			<Chip
				title={myTitle}
				onPress={_ => setReminderDays({ ...reminderDays, [day]: !myStatus })}
				type={myStatus ? 'solid' : 'outline'}
			/>
		);
	}

	const dismissReminderAddDialog = _ => {
		resetState();
		toggleVisible(!visible);
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
			id: 'PrayPalReminder',
			name: 'PrayPal Reminders',
			sound: 'church bell',
		});
		console.log('Done.');

		console.log('Creating trigger notification...');
		await notifee.createTriggerNotification(
			{
				title: 'PrayPal Test',
				body: 'This is a test of the PrayPal Reminders notification channel',
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
*/

/*
	const onCreateTrigger = async t => {
		const tt = new Date(t);
		tt.setSeconds(tt.getSeconds + 10);
		timestamp = tt.getTime();


		await Reminder.createReminder({
			title: 'PrayPal Test',
			body: 'This is a test of the PrayPal Reminders notification channel',
			timestamp,
		});
	};
*/



	return (
		<Dialog
			isVisible={visible}
			onBackdropPress={dismissReminderAddDialog}
		>
			<Dialog.Title>
				Add Prayer Reminder
			</Dialog.Title>
			<View>
				<Button
					onPress={showTimePicker}
					title="Select Time"
				/>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingTop: 10
				}}>
					<DayChip day='sunday' />
					<DayChip day='monday' />
					<DayChip day='tuesday' />
					<DayChip day='wednesday' />
					<DayChip day='thursday' />
					<DayChip day='friday' />
					<DayChip day='saturday' />
				</View>
			</View>
			<Dialog.Actions>
				<Dialog.Button
					title="Cancel"
					onPress={dismissReminderAddDialog}
				/>
				<Dialog.Button
					title='Schedule'
					onPress={_ => {
						addReminder(newReminderTime, reminderDays);
						dismissReminderAddDialog();
					}}
				/>
				<Dialog.Button
					title='Test'
					onPress={_ => Reminder.onCreateReminder({
						title: 'PrayPal Test',
						body: 'This is a test of PrayPal notifications',
						triggerTime: new Date(Date.now()),
						repeatFrequency: 0
					})}
				/>
			</Dialog.Actions>
		</Dialog>
	);
}

/* NOTES

Reminders:
{
	id: <uuidv4>
	name: String
	text: String
	hour: integer
	minute: integer
	days: { _ReminderDays }
	active: bool
}

*/
