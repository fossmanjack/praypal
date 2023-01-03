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
import * as Prayer from '../slices/prayerSlice';

export default function PrayerEditDialog(props) {
	const { visible, toggleVisible, item } = props;
	const [ updatedPrayer, setUpdatedPrayer ] = useState({});
	const [ refPrayer, setRefPrayer ] = useState(item);

/*
	const [ title, setTitle ] = useState(updatedPrayer.title);
	const [ body, setBody ] = useState(updatedPrayer.body);
	const [ expires, setExpires ] = useState(updatedPrayer.expires);
	const [ expireDate, setExpireDate ] = useState(new Date(updatedPrayer.expireDate));
*/
	const [ errorText, setErrorText ] = useState('');
	const dispatch = useDispatch();

	console.log('Loading PrayerEditDialog with', item);

	const updateProp = (prop, value) => setUpdatedPrayer({ ...updatedPrayer, [prop]: value });

	useEffect(_ => setRefPrayer({ ...refPrayer, ...updatedPrayer }), [ updatedPrayer ]);

	const resetState = _ => {
		setRefPrayer(item);
		setUpdatedPrayer({});
		setErrorText('');
	}

	const showDatePicker = _ => {
		console.log('showDatePicker called with', refPrayer.expireDate);
		DateTimePickerAndroid.open({
			value: new Date(refPrayer.expireDate),
			mode: 'date',
			onChange: (event, selectedDate) => {
				selectedDate.setHours(23, 59, 0);
				updateProp('expireDate', selectedDate.getTime());
				updateProp('expires', true);
			},
		});
	}

	const handleSubmitPrayer = _ => {
		/*
		if(refPrayer.expires) {

			expireDate.setHours(23, 59, 0);
		}
		*/
		dispatch(Prayer.updatePrayer({ ...refPrayer }));
/*
		dispatch(Prayer.updatePrayer({
			id: item.id,
			title,
			body,
			expires,
			expireDate: expireDate.getTime()
		}));
*/
		toggleVisible(!visible);
		resetState();
	}

	const handleDeletePrayer = _ => {
		console.log('Deleting prayer with id', item.id);
		dispatch(Prayer.deletePrayer(item.id));
		toggleVisible(!visible);
	}

	return (
		<Dialog
			isVisible={visible}
			onBackdropPress={_ => toggleVisible(false)}
		>
			<Dialog.Title title='Pray for...' />
			<TextInput
				placeholder='Pray for ...'
				value={refPrayer.title}
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
				value={refPrayer.body}
				onChangeText={text => updateProp('body', text)}
				style={{
					padding: 10,
					borderWidth: 1,
				}}
			/>
			<View style={{ flexDirection: 'row' }}>
				<Text>Expires?</Text>
				<Button
					title={refPrayer.expires ? new Date(refPrayer.expireDate).toLocaleDateString() : 'Set'}
					onPress={showDatePicker}
					key={refPrayer.expireDate}
				/>
			</View>
			<Dialog.Actions>
				<Dialog.Button
					title='Delete'
					onPress={handleDeletePrayer}
				/>
				<Dialog.Button
					title='Update'
					onPress={_ => {
						if(!refPrayer.title) {
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
