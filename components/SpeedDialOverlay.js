import { SpeedDial } from '@rneui/themed';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReminderAddDialog from '../dialogs/ReminderAddDialog';
import PrayerAddDialog from '../dialogs/PrayerAddDialog';
import { _Styles, _Colors } from '../assets/_Styles';

export default function SpeedDialOverlay() {
	// overlay visibility
	const [ speedDialOpen, setSpeedDialOpen ] = useState(false);

	// prayer modal controls
	const [ prayerDialog, showPrayerDialog ] = useState('');

	// reminder modal controls
	const [ reminderDialog, showReminderDialog ] = useState(false);

	// Options
	const { theme } = useSelector(S => S.options);

	return (
		<>
			<SpeedDial
				isOpen={speedDialOpen}
				icon={{
					name: 'add',
					type: 'material',
					color: _Colors[theme].buttonActiveText,
				}}
				openIcon={{
					name: 'minus',
					type: 'material-community',
					color: _Colors[theme].buttonActiveText,
				}}
				onOpen={_ => setSpeedDialOpen(!speedDialOpen)}
				onClose={_ => setSpeedDialOpen(!speedDialOpen)}
				placement='right'
				size='large'
				labelPressable={true}
				color={_Colors[theme].SDOButton}
				style={{
					marginBottom: 50,
				}}
			>
				<SpeedDial.Action
					icon={{
						name: 'playlist-add',
						type: 'material',
						color: _Colors[theme].buttonActiveText,
					}}
					title='Add prayer'
					onPress={_ => {
						setSpeedDialOpen(!speedDialOpen);
						showPrayerDialog(!prayerDialog);
					}}
					color={_Colors[theme].SDOButton}
				/>
				<SpeedDial.Action
					icon={{
						name: 'add-alert',
						type: 'material',
						color: _Colors[theme].buttonActiveText,
					}}
					title='Add reminder'
					onPress={_ => {
						setSpeedDialOpen(!speedDialOpen);
						showReminderDialog(!reminderDialog);
					}}
					color={_Colors[theme].SDOButton}
				/>
			</SpeedDial>
			<ReminderAddDialog
				visible={reminderDialog}
				toggleVisible={showReminderDialog}
			/>
			<PrayerAddDialog
				visible={prayerDialog}
				toggleVisible={showPrayerDialog}
			/>
		</>
	);
}
