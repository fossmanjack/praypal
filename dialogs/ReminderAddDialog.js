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

export default function ReminderAddDialog(props) {
//	const [ reminderTime, setReminderTime ] = useState(0);
//	const [ reminderDays, setReminderDays ] = useState([ false, false, false, false, false, false, false ]);
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
	const {
		isVisible,
		toggleVisible,
		addReminder,
		showTimePicker,
		newReminderTime,
		setNewReminderTime
	} = props;

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
		setNewReminderTime(new Date(Date.now()));
		setReminderDays(_ReminderDays);
		toggleVisible(!isVisible);
	}


	return (
		<Dialog
			isVisible={isVisible}
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
			</Dialog.Actions>
		</Dialog>
	);
}
