import {
	Button,
	Chip,
	Dialog
} from '@rneui/themed';
import {
	View,
	Text,
	TextInput
} from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notifee, { RepeatFrequency } from '@notifee/react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as Rem from '../slices/reminderSlice';
import * as Utils from '../utils/Utils';
import uuid from 'react-native-uuid';
import { _Styles, _Colors } from '../assets/_Styles';

export default function ReminderAddDialog(props) {
	const { visible, toggleVisible } = props;
	const [ title, setTitle ] = useState('');
	const [ body, setBody ] = useState('');
	const [ triggerTime, setTriggerTime ] = useState(new Date(Date.now()));
	const [ active, setActive ] = useState(false);
	const [ errorText, setErrorText ] = useState('');
	const { theme } = useSelector(S => S.options);
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
			overlayStyle={_Styles[theme].cardActive}
		>
			<Dialog.Title title='Add Prayer Reminder' titleStyle={_Styles[theme].headerText} />
			<TextInput
				placeholder='Remind me...'
				value={title}
				onChangeText={text => setTitle(text)}
				style={_Styles[theme].textInput}
				placeholderTextColor={_Colors[theme].subtitleText}
			/>
			{ errorText && <Text style={{ color: 'red' }}>{errorText}</Text> }
			<TextInput
				multiline={true}
				numberOfLines={4}
				placeholder='Notes ...'
				value={body}
				onChangeText={text => setBody(text)}
				style={[ _Styles[theme].textInput, { marginTop: 10 } ]}
				placeholderTextColor={_Colors[theme].subtitleText}
			/>
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
				<Text style={[ _Styles[theme].headerText, { marginRight: 'auto' } ]}>Set Time</Text>
				<Button
					title={Utils.niceTime(triggerTime)}
					onPress={showPicker}
					key={triggerTime}
					buttonStyle={{
						borderRadius: 10,
					}}
					color={_Colors[theme].buttonHighlightBackground}
					titleStyle={{ color: _Colors[theme].buttonHighlightText }}
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
					titleStyle={_Styles[theme].buttonDialogText}
				/>
				<Dialog.Button
					title='Cancel'
					onPress={dismissReminderAddDialog}
					titleStyle={_Styles[theme].buttonDialogText}
				/>
			</Dialog.Actions>
		</Dialog>
	);
}
