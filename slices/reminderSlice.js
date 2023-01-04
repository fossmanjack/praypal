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
			// expects new reminder object as action payload
			if(!action.payload) return rState;

			const remArr = [ ...rState._Reminders,
				{
					...action.payload,
					created: Date.now(),
					modified: Date.now(),
				}
			].sort((a, b) => {
				if(a.hour !== b.hour) return a.hour - b.hour;
				else return a.minute - b.minute;
			});

			return {
				...rState,
				_Reminders: [ ...remArr ]
			}
		},
		updateReminder: (rState, action) => {
			if(!action.payload) {
				return rState;
			}

			let idx = rState._Reminders.indexOf(rState._Reminders.find(({ id }) => id === action.payload.id));
			if(idx === -1) return rState;

			return {
				...rState,
				_Reminders: [
					...rState._Reminders.slice(0, idx),
					{ ...action.payload, modified: Date.now() },
					...rState._Reminders.slice(idx + 1)
				]
			}
		},
		deleteReminder: (rState, action) => {
			return {
				...rState,
				_Reminders: [ ...rState._Reminders.filter(rem => rem.id !== action.payload.id) ],
			}
		},
	},
});

export const createNewReminder = (date = new Date(Date.now())) => {
	// Expects a date object
	return {
		id: uuid.v4(),
		name: 'New reminder',
		text: '',
		hour: date.getHours(),
		minute: date.getMinutes(),
		active: false,
		created: date.getTime(),
		modified: date.getTime(),
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

	while(triggerTime.getTime() < Date.now())
		triggerTime.setDate(triggerTime.getDate() + 1);

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
	updateReminder,
	deleteReminder
} = reminderSlice.actions;

