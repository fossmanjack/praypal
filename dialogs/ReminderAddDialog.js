import {
	Button,
	Dialog
} from 'react-native-elements';
import {
	View,
	Text
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ReminderAddDialog(props) {
	const [ reminderTime, setReminderTime ] = useState(0);
	const [ reminderDays, setReminderDays ] = useState([ false, false, false, false, false, false, false ]);
	const { isVisible, toggleVisible, addReminder } = props;

	const dismissReminderAddDialog = _ => {
		setReminderTime(0);
		setReminderDays([ false, false, false, false, false, false, false ]);
		toggleVisible(!isVisible);
	}

	return (
		<Dialog
			isVisible={isVisible}
			onBackdropPress={dismissReminderAddDialog}
		>
			<Dialog.Title>
			</Dialog.Title>
			<View>
			</View>
			<Dialog.Actions>
				<Dialog.Button
					title="Cancel"
					onPress={dismissReminderAddDialog}
				/>
				<Dialog.Button
					title='Schedule'
					onPress={_ => addReminder(reminderTime, reminderDays)}
				/>
			</Dialog.Actions>
		</Dialog>
	);
}
