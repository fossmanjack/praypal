import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import uuid from 'react-native-uuid';

const createPrayPalChannel = async _ => {

	await notifee.requestPermission();

	const channelId = await notifee.createChannel({
		id: 'PrayPalReminder',
		name: 'PrayPal Reminders',
		sound: 'church_bell',
	});

	return channelId;
};

/*
export const createTrigger = ({ timestamp, repeatFrequency = -1 }) => {
	return trigger: TimestampTrigger = {
		type: TriggerType.TIMESTAMP,
		timestamp,
		repeatFrequency,
	}
};
*/

export const createReminder = async ({ rid = '', title, body, timestamp, repeatFrequency = -1 }) => {
	const id = rid || uuid.v4();
	const channelId = await createPrayPalChannel();

	const trigger: TimestampTrigger = {
		type: TriggerType.TIMESTAMP,
		timestamp,
	};

	await notifee.createTriggerNotification(
		{
			title,
			body,
			android: {
				channelId,
				pressAction: {
					id: 'default',
				},
			},
		},
		trigger
	);
}

export const onCreateTrigger = async t => {
	const date = new Date(t);
	date.setSeconds(date.getSeconds() + 10);

	console.log('onCreateTrigger called...');

	const trigger: TimestampTrigger = {
		type: TriggerType.TIMESTAMP,
		timestamp: date.getTime(),
	};

	console.log('Awaiting permission...');
	await notifee.requestPermission();
	console.log('Done.');

	console.log('Creating channel...');
	const channelId = await notifee.createChannel({
		id: 'PrayPalReminder',
		name: 'PrayPal Reminders',
		sound: 'church bell',
	});
	console.log('Done.');

	console.log('Creating trigger notification...');
	await notifee.createTriggerNotification(
		{
			title: 'PrayPal Test',
			body: 'This is a test of the PrayPal Reminders notification channel',
			android: {
				channelId,
				pressAction: {
					id: 'default',
				},
			},
		},
		trigger,
	);
	console.log('Done.');
	console.log('Showing all existing triggers...');

	notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications and IDs:', ids));
	console.log('Done.');
}

export const onCreateReminder = async props => {
	const {
		id = uuid.v4(),
		title,
		body,
		triggerTime,
		repeatFrequency = -1
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

export const findNotification = async rid => {
	let ret = false;
	console.log('findNotification called...');

	notifee.getTriggerNotifications()
	.then(ids => {
		ids.forEach(id => {
			console.log('Checking notification with id', id.notification.id, '...');
			if(id.notification.id === rid) {
				console.log('Found!', rid, ' = ', id.notification.id);
				ret = true;
			};
		})
		//	if(ids.find(id => id.notification.id === rid) !== 'undefined') ret = true;
	});

	return ret;
}
