import { Button, Dialog } from '@rneui/themed';
import {
	Text,
	TextInput,
	View
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import * as Prayer from '../slices/prayerSlice';

export default function PrayerAddDialog(props) {
	const { visible, toggleVisible } = props;
	const [ title, setTitle ] = useState('');
	const [ body, setBody ] = useState('');
	const [ expires, setExpires ] = useState(false);
	const [ expireDate, setExpireDate ] = useState(new Date(Date.now()));
	const [ errorText, setErrorText ] = useState('');
	const dispatch = useDispatch();

	const resetState = _ => {
		setTitle('');
		setBody('');
		setExpires(false);
		setExpireDate(new Date(Date.now()));
		setErrorText('');
	}

	const showDatePicker = _ => {
		console.log('showDatePicker called with', expires);
		DateTimePickerAndroid.open({
			value: expireDate,
			mode: 'date',
			onChange: (event, selectedDate) => {
				setExpireDate(selectedDate);
				setExpires(true);
			},
		});
	}

	const handleSubmitPrayer = _ => {
		if(expires) {
			expireDate.setHours(23, 59, 0);
		}
		dispatch(Prayer.addPrayer({
			id: uuid.v4(),
			title,
			body,
			expires,
			expireDate: expireDate.getTime()
		}));
		toggleVisible(!visible);
		resetState();
	}

	return (
		<Dialog
			isVisible={visible}
			onBackdropPress={_ => toggleVisible(false)}
		>
			<Dialog.Title title='Pray for...' />
			<TextInput
				placeholder='Pray for ...'
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
				<Text>Expires?</Text>
				<Button
					title={expires ? expireDate.toLocaleDateString() : 'Set'}
					onPress={showDatePicker}
					key={expireDate}
				/>
			</View>
			<Dialog.Actions>
				<Dialog.Button
					title='Pray!'
					onPress={_ => {
						if(!title) {
							setErrorText('You must enter a name for this prayer!');
						} else {
							handleSubmitPrayer();
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

/*

Prayers: title, body, expiration date

*/
