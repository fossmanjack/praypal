import { createSlice } from '@reduxjs/toolkit';
import { REMINDERS } from '../data/REMINDERS';
import uuid from 'react-native-uuid';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { Alert } from 'react-native';

const initialState = {
	_Reminders: REMINDERS
};

const reminderSlice = createSlice({
	name: 'reminder',
	initialState,
	reducers: {
		addReminder: (rState, action) => {
			// expects [ rid, { props } ] as action.payload

		},
		modifyReminder: (rState, action) => {
			// expects [ rid, { updated props } ] as action.payload
			console.log('modifyReminder', action.payload);
			const [ id, props ] = action.payload;
			let oldr = rState._Reminders.find(ob => ob.id === id);
			let idx = rState._Reminders.indexOf(oldr);

			return {
				...rState,
				_Reminders: [
					...rState._Reminders.slice(0, idx),
					{
						...oldr,
						...props
					},
					...rState._Reminders.slice(idx + 1)
				]
			}

		},
		deleteReminder: (rState, action) => {
			// expects rid as action.payload

		},
	},
});

export const createNewReminder = date => {
	// Expects a date object
	return {
		id: uuid.v4(),
		name: 'New reminder',
		text: '',
		hour: date.getHour(),
		minute: date.getMinute(),
		active: false,
		created: date,
		modified: date,
	};
};

export const createAndroidReminder = async props => {
	const {
		id = uuid.v4(),
		title,
		body,
		triggerTime,
		repeatFrequency = notifee.RepeatFrequency.NONE,
	} = props;

//	triggerTime.setSeconds(triggerTime.getSeconds() + 10);

	console.log('onCreateReminder called...');

	const trigger: TimestampTrigger = {
		type: TriggerType.TIMESTAMP,
		timestamp: triggerTime.getTime(),
		repeatFrequency,
	};

	console.log('Awaiting permission...');
	await notifee.requestPermission();
	console.log('Done.');

	console.log('Checking battery restriction...');
	const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();

	if(batteryOptimizationEnabled) {

		Alert.alert(
			'Background Restriction Detected',
			'To ensure reminders are delivered, we recommend disabling power optimization '+
			'for this app.  Be aware that this may increase battery usage.  Would you '+
			'like to open your power optimization settings?',
			[
				{
					text: 'Open',
					onPress: async _ => await notifee.openBatteryOptimizationSettings(),
				},
				{
					text: 'Cancel',
					style: 'cancel',
				}
			],
			{ cancelable: false }
		);
	};

	console.log('Creating channel...');
	const channelId = await notifee.createChannel({
		id: 'PrayPalReminder',
		name: 'PrayPal Reminders',
		sound: 'church_bell',
	});
	console.log('Done.');

	console.log('Creating trigger notification...');
	await notifee.createTriggerNotification(
		{
			id,
			title,
			subtitle: 'PrayPal',
			body,
			android: {
				channelId,
				pressAction: {
					id: 'default',
				},
				showTimestamp: true,
			},
		},
		trigger,
	);
	console.log('Done.');
	console.log('Showing all existing triggers...');

	notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications and IDs:', ids));
	console.log('Done.');
}

export const reminderReducer = reminderSlice.reducer;

export const {
	addReminder,
	modifyReminder,
	deleteReminder
} = reminderSlice.actions;

