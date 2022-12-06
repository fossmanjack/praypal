import { Dialog, FAB } from '@rneui/themed';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Prayer from '../slices/prayerSlice';

export default function PrayerButtonOverlay() {
	const [ prayerModal, showPrayerModal ] = useState(false);
	const [ prayerText, setPrayerText ] = useState('');
	const dispatch = useDispatch();

	const handleSubmitPrayer = _ => {
		console.log(prayerText);
		dispatch(Prayer.addPrayer({
			id: Date.now().toString(16),
			title: 'Prayer',
			text: prayerText,
			expiry: 0,
		}));

		setPrayerText('');
		showPrayerModal(false);
	}

	return (

		<>
			<FAB
				placement='right'
				visible='true'
				size='large'
				visible={true}
				icon={{
					name: 'playlist-add',
					type: 'material',
					color: 'white'
				}}
				onPress={_ => showPrayerModal(true)}
			/>

			<Dialog
				isVisible={prayerModal}
				onBackdropPress={_ => showPrayerModal(false)}
			>
				<Dialog.Title title='Enter Prayer' />
				<TextInput
					multiline={true}
					numberOfLines={4}
					placeholder='Pray for ...'
					value={prayerText}
					onChangeText={text => setPrayerText(text)}
					style={{
						padding: 10,
						borderWidth: 1,
					}}
				/>
				<Dialog.Actions>
					<Dialog.Button
						title='Pray!'
						onPress={handleSubmitPrayer}
					/>
					<Dialog.Button
						title='Cancel'
						onPress={_ => {
							setPrayerText('');
							showPrayerModal(false);
						}}
					/>
				</Dialog.Actions>
			</Dialog>
		</>
	);
}
