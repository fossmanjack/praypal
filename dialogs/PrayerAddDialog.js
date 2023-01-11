import { Button, Dialog } from '@rneui/themed';
import {
	Text,
	TextInput,
	View
} from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import * as Prayer from '../slices/prayerSlice';
import { _Styles, _Colors } from '../assets/_Styles';

export default function PrayerAddDialog(props) {
	const { visible, toggleVisible } = props;
	const { theme } = useSelector(S => S.options);
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
			overlayStyle={_Styles[theme].cardActive}
		>
			<Dialog.Title title='Pray for...' titleStyle={_Styles[theme].headerText} />
			<TextInput
				placeholder='Pray for ...'
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
				<Text style={[ _Styles[theme].headerText, { marginRight: 'auto' } ]}>Expires?</Text>
				<Button
					title={expires ? expireDate.toLocaleDateString() : 'Set'}
					onPress={showDatePicker}
					key={expireDate}
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
							setErrorText('You must enter a name for this prayer!');
						} else {
							handleSubmitPrayer();
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
