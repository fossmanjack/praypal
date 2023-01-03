import { Button, Dialog } from '@rneui/themed';
import {
	Text,
	TextInput,
	View
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import * as Rem from '../slices/reminderSlice';
import * as Utils from '../utils/Utils';
import notifee from '@notifee/react-native';

export default function ReminderEditDialog(props) {
	const { visible, toggleVisible, item, handleUpdateReminder } = props;
	const [ updatedReminder, setUpdatedReminder ] = useState({});
	const [ refReminder, setRefReminder ] = useState(item);
	const [ refTrigger, setRefTrigger ] = useState(new Date());
	const [ errorText, setErrorText ] = useState('');
	const dispatch = useDispatch();

	console.log('Loading PrayerEditDialog with', item);

	const updateProp = (prop, value) => setUpdatedReminder({ ...updatedReminder, [prop]: value });

	useEffect(_ => setRefReminder({ ...refReminder, ...updatedReminder }), [ updatedReminder ]);

	useEffect(_ => {
		console.log('### refTrigger changed!');
		if(refTrigger instanceof Date) {
			console.log('New value is Date with', refTrigger);
		} else {
			console.log('New value is NOT DATE with', refTrigger);
		}
	}, [ refTrigger ]);

	const resetState = _ => {
		setRefReminder(Rem.createNewReminder());
		setUpdatedReminder({});
		setRefTrigger(new Date(Date.now()));
		setErrorText('');
	}

	const showDatePicker = _ => {
		console.log('showDatePicker called with', refTrigger);
		DateTimePickerAndroid.open({
			value: refTrigger,
			mode: 'time',
			type: 'clock',
			onChange: (event, selectedDate) => {
				setRefTrigger(selectedDate);
				updateProp('hour', selectedDate.getHours());
				updateProp('minute', selectedDate.getMinutes());
				updateProp('active', true);
			},
		});
	}

/*
	const handleSubmitEdit = _ => {
		dispatch(Rem.updateReminder({ ...refReminder, modified: Date.now() }));
		if(refReminder.active) {
			Rem.createAndroidReminder({
				title: refReminder.title,
				body: refReminder.body,
				triggerTime: refTrigger,
				id: refReminder.id,
				repeatFrequency: notifee.RepeatFrequency.DAILY,
			});
		} else {
			notifee.cancelNotification(refReminder.id);
		}
		toggleVisible(!visible);
		resetState();
	}
*/

	const handleDeleteReminder = _ => {
		console.log('Deleting reminder with id', item.id);
		dispatch(Rem.deleteReminder(item.id));
		toggleVisible(!visible);
	}

	return (
		<Dialog
			isVisible={visible}
			onBackdropPress={_ => toggleVisible(false)}
		>
			<Dialog.Title title='Update Reminder' />
			<TextInput
				placeholder='Reminder title...'
				value={refReminder.title}
				onChangeText={text => updateProp('title', text)}
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
				value={refReminder.body}
				onChangeText={text => updateProp('body', text)}
				style={{
					padding: 10,
					borderWidth: 1,
				}}
			/>
			<View style={{ flexDirection: 'row' }}>
				<Text>Time</Text>
				<Button
					title={Utils.niceTime(refTrigger)}
					onPress={showDatePicker}
					key={Utils.niceTime(refTrigger)}
				/>
			</View>
			<Dialog.Actions>
				<Dialog.Button
					title='Delete'
					onPress={handleDeleteReminder}
				/>
				<Dialog.Button
					title='Update'
					onPress={_ => {
						if(!refReminder.title) {
							setErrorText('You must enter a name for this prayer!');
						} else {
							handleUpdateReminder({ ...refReminder });
							resetState();
							toggleVisible(!visible);
						}
					}}
				/>
				<Dialog.Button
					title='Cancel'
					onPress={_ => {
						resetState();
						toggleVisible(!visible);
					}}
				/>
			</Dialog.Actions>
		</Dialog>
	);
}
