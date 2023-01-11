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
import * as Prayer from '../slices/prayerSlice';
import { _Styles, _Colors } from '../assets/_Styles';

export default function PrayerEditDialog(props) {
	const { visible, toggleVisible, item } = props;
	const [ updatedPrayer, setUpdatedPrayer ] = useState({});
	const [ refPrayer, setRefPrayer ] = useState(item);
	const [ errorText, setErrorText ] = useState('');
	const { theme } = useSelector(S => S.options);
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
		dispatch(Prayer.updatePrayer({ ...refPrayer }));
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
			overlayStyle={_Styles[theme].cardActive}
		>
			<Dialog.Title title='Pray for...' titleStyle={_Styles[theme].headerText} />
			<TextInput
				placeholder='Pray for ...'
				value={refPrayer.title}
				onChangeText={text => updateProp('title', text)}
				style={_Styles[theme].textInput}
				placeholderTextColor={_Colors[theme].subtitleText}
			/>
			{ errorText && <Text style={{ color: 'red' }}>{errorText}</Text> }
			<TextInput
				multiline={true}
				numberOfLines={4}
				placeholder='Notes ...'
				value={refPrayer.body}
				onChangeText={text => updateProp('body', text)}
				style={[ _Styles[theme].textInput, { marginTop: 10 } ]}
				placeholderTextColor={_Colors[theme].subtitleText}
			/>
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
				<Text style={[ _Styles[theme].headerText, { marginRight: 'auto' } ]}>Expires?</Text>
				<Button
					title={refPrayer.expires ? new Date(refPrayer.expireDate).toLocaleDateString() : 'Set'}
					onPress={showDatePicker}
					key={refPrayer.expireDate}
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
					onPress={handleDeletePrayer}
					titleStyle={_Styles[theme].buttonDialogText}
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
