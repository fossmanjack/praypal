import { SpeedDial } from '@rneui/themed';
import { useState } from 'react';
import ReminderAddDialog from '../dialogs/ReminderAddDialog';
import PrayerAddDialog from '../dialogs/PrayerAddDialog';

export default function SpeedDialOverlay() {
	// overlay visibility
	const [ speedDialOpen, setSpeedDialOpen ] = useState(false);

	// prayer modal controls
	const [ prayerDialog, showPrayerDialog ] = useState('');

	// reminder modal controls
	const [ reminderDialog, showReminderDialog ] = useState(false);

	return (
		<>
			<SpeedDial
				isOpen={speedDialOpen}
				icon={{
					name: 'add',
					type: 'material',
					color: 'white'
				}}
				openIcon={{
					name: 'minus',
					type: 'material-community',
					color: 'white'
				}}
				onOpen={_ => setSpeedDialOpen(!speedDialOpen)}
				onClose={_ => setSpeedDialOpen(!speedDialOpen)}
				placement='right'
				size='large'
				labelPressable={true}
				style={{
					marginBottom: 50,
				}}
			>
				<SpeedDial.Action
					icon={{
						name: 'playlist-add',
						type: 'material',
						color: 'white'
					}}
					title='Add prayer'
					onPress={_ => {
						setSpeedDialOpen(!speedDialOpen);
						showPrayerDialog(!prayerDialog);
					}}
				/>
				<SpeedDial.Action
					icon={{
						name: 'add-alert',
						type: 'material',
						color: 'white'
					}}
					title='Add reminder'
					onPress={_ => {
						setSpeedDialOpen(!speedDialOpen);
						showReminderDialog(!reminderDialog);
					}}
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
