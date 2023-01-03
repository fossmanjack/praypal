import {
	Button,
	Chip,
	Dialog
} from 'react-native-elements';
import {
	View,
	Text,
	TextInput
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import notifee, { RepeatFrequency } from '@notifee/react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as Rem from '../slices/reminderSlice';
import * as Utils from '../utils/Utils';
import uuid from 'react-native-uuid';

export default function ReminderAddDialog(props) {
	const { visible, toggleVisible } = props;
	const [ title, setTitle ] = useState('');
	const [ body, setBody ] = useState('');
	const [ triggerTime, setTriggerTime ] = useState(new Date(Date.now()));
	const [ active, setActive ] = useState(false);
	const [ errorText, setErrorText ] = useState('');
	const dispatch = useDispatch();

	const resetState = _ => {
		setTitle('');
		setBody('');
		setErrorText('');
		setTriggerTime(new Date(Date.now()));
		setActive(false);
	}

	const dismissReminderAddDialog = _ => {
		resetState();
		toggleVisible(!visible);
	}

	const showPicker = _ => {
		setTriggerTime(new Date(Date.now()));
		console.log('showTimePicker called with', triggerTime);
		DateTimePickerAndroid.open({
			value: triggerTime,
			onChange: (event, selectedDate) => setTriggerTime(selectedDate),
			mode: 'time',
			display: 'clock',
			is24Hour: true
		});
	}

	const handleSubmitReminder = _ => {
		const id = uuid.v4();

		dispatch(Rem.addReminder({
			id,
			title,
			body,
			hour: triggerTime.getHours(),
			minute: triggerTime.getMinutes(),
			active,
		}));

		Rem.createAndroidReminder({
			id,
			title,
			body,
			triggerTime,
			repeatFrequency: RepeatFrequency.DAILY,
		});
		dismissReminderAddDialog();
	}

	return (
		<Dialog
			isVisible={visible}
			onBackdropPress={dismissReminderAddDialog}
		>
			<Dialog.Title title='Add Prayer Reminder' />
			<TextInput
				placeholder='Remind me...'
				value={title}
				onChangeText={text => setTitle(text)}
				style={{
					padding: 10,
						borderWidth: 1,
				}}
			/>
			{ errorText && <Text>{errorText}</Text> }
			<TextInput
				multiline={true}
				numberOfLines={4}
				placeholder='Notes ...'
				value={body}
				onChangeText={text => setBody(text)}
				style={{
					padding: 10,
					borderWidth: 1,
				}}
			/>
			<View style={{ flexDirection: 'row' }}>
				<Text>Set Time</Text>
				<Button
					title={Utils.niceTime(triggerTime)}
					onPress={showPicker}
					key={triggerTime}
				/>
			</View>
			<Dialog.Actions>
				<Dialog.Button
					title='Pray!'
					onPress={_ => {
						if(!title) {
							setErrorText('You must enter a name for this reminder!');
						} else {
							handleSubmitReminder();
						}
					}}
				/>
				<Dialog.Button
					title='Cancel'
					onPress={dismissReminderAddDialog}
				/>
			</Dialog.Actions>
		</Dialog>
	);
}
