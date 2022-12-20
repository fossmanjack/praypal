import { Dialog } from '@rneui/themed';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function PrayerAddDialog({ visible }) {
	const [ prayerTitle, setPrayerTitle ] = useState('');
	const [ prayerText, setPrayerText ] = useState('');
	const [ prayerExp, setPrayerExp ] = useState(new Date(0));
	const dispatch = useDispatch();

	return (
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
	);
}
