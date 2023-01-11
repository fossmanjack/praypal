import { Button, Dialog } from '@rneui/themed';
import {
	Text,
	TextInput,
	View
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import * as Rem from '../slices/reminderSlice';
import * as Utils from '../utils/Utils';
import notifee from '@notifee/react-native';
import { _Styles, _Colors } from '../assets/_Styles';

export default function ReminderEditDialog(props) {
	const { visible, toggleVisible, item, handleUpdateReminder } = props;
	const [ updatedReminder, setUpdatedReminder ] = useState({});
	const [ refReminder, setRefReminder ] = useState(item);
	const [ refTrigger, setRefTrigger ] = useState(new Date());
	const [ errorText, setErrorText ] = useState('');
	const { theme } = useSelector(S => S.options);
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

	const handleDeleteReminder = _ => {
		console.log('Deleting reminder with id', item.id);
		dispatch(Rem.deleteReminder(item));
		toggleVisible(!visible);
	}

	return (
		<Dialog
			isVisible={visible}
			onBackdropPress={_ => toggleVisible(false)}
			overlayStyle={_Styles[theme].cardActive}
		>
			<Dialog.Title title='Update Reminder' titleStyle={_Styles[theme].headerText} />
			<TextInput
				placeholder='Reminder title...'
				value={refReminder.title}
				onChangeText={text => updateProp('title', text)}
				style={_Styles[theme].textInput}
				placeholderTextColor={_Colors[theme].subtitleText}
			/>
			{ errorText && <Text style={{ color: 'red' }}>{errorText}</Text> }
			<TextInput
				multiline={true}
				numberOfLines={4}
				placeholder='Notes ...'
				value={refReminder.body}
				onChangeText={text => updateProp('body', text)}
				style={[ _Styles[theme].textInput, { marginTop: 10 } ]}
				placeholderTextColor={_Colors[theme].subtitleText}
			/>
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
				<Text style={[ _Styles[theme].headerText, { marginRight: 'auto' } ]}>Time</Text>
				<Button
					title={Utils.niceTime(refTrigger)}
					onPress={showDatePicker}
					key={Utils.niceTime(refTrigger)}
					buttonStyle={{
						borderRadius: 10,
					}}
					color={_Colors[theme].buttonHighlightBackground}
					titleStyle={{ color: _Colors[theme].buttonHighlightText }}
				/>
			</View>
			<Dialog.Actions>
				<Dialog.Button
					title='Delete'
					onPress={handleDeleteReminder}
					titleStyle={_Styles[theme].buttonDialogText}
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
					titleStyle={_Styles[theme].buttonDialogText}
				/>
				<Dialog.Button
					title='Cancel'
					onPress={_ => {
						resetState();
						toggleVisible(!visible);
					}}
					titleStyle={_Styles[theme].buttonDialogText}
				/>
			</Dialog.Actions>
		</Dialog>
	);
}
