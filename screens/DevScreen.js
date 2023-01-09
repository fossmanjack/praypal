import {
	SafeAreaView,
	StyleSheet,
	View,
	Text
} from 'react-native';
import { useState, useEffect } from 'react';
import {
	Button,
	Card,
	Switch
} from '@rneui/themed';
import * as Reminder from '../utils/Reminder';
import { _Store, _Persist } from '../redux/_Store';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export default function DevScreen(props) {
	const [ testReminder, setTestReminder ] = useState(false);
	const [ change, setChange ] = useState(false);

	const showAllNotifications = _ => {
		console.log('Show all notifications', new Date(Date.now()).toLocaleString());
		notifee.getTriggerNotifications()
//			.then(ids => console.log('All trigger notifications and IDs:', ids));
		.then(notifs => {
			console.log('All trigger notifications active:');
			notifs.forEach(notif => {
				console.log('\tName:', notif.notification.title, '\n');
				console.log('\tID:', notif.notification.id, '\n');
				console.log('\tTimestamp:', new Date(notif.trigger.timestamp).toLocaleString(), '\n');
				console.log('\tRepeating:', notif.trigger.repeatFrequency, '\n');
				console.log('\n');
			});
		});
	}

	const cancelAllNotifications = _ => {
		notifee.cancelAllNotifications().then(_ => console.log('Notifications should be cancelled.'));
	}

	const purgeReduxState = _ => {
		_Persist.purge();
		cancelAllNotifications();
	}

/*
	const toggleTestReminder = async value => {
		console.log('toggleTestReminder called with:', value);
		const triggerTime = new Date(Date.now());
		triggerTime.setSeconds(triggerTime.getSeconds() + 10);

		if(value) {
			Reminder.onCreateReminder({
				id: 'reminderTest',
				title: 'PrayPal Test',
				body: 'This is a test of PrayPal notifications.  It should trigger hourly.',
				triggerTime,
				repeatFrequency: 0
			}).then(_ => setChange(true));
		} else {
			notifee.cancelNotification('reminderTest').then(_ => setChange(true));
		};
	}
*/

/*
	useEffect(_ => {
		console.log('useEffect(DevScreen -> change) called with:', change);
		if(change) {
			notifee.getTriggerNotifications
				.then(ids => {
					if(ids.find(id => id.notification.id === 'reminderTest'))
						setTestReminder(true);
					else setTestReminder(false);
				});
			setChange(false);
		}
	}, [ change, setTestReminder ]);
*/

/*
	const toggleTestReminder = value => {
		console.log('toggleTestReminder called with:', value);
		const triggerTime = new Date(Date.now());
		triggerTime.setSeconds(triggerTime.getSeconds() + 10);

		if(value) {
			Reminder.onCreateReminder({
				id: 'reminderTest',
				title: 'PrayPal Test',
				body: `This is a test of PrayPal notifications.  It should trigger hourly, `+
					`starting at ${triggerTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
				triggerTime,
				repeatFrequency: 0
			}).then(_ => setTestReminder(true));
		} else {
			notifee.cancelNotification('reminderTest').then(_ => setTestReminder(false));
		}
	};
*/

	const toggleTestReminder = value => {
		setTestReminder(value);
		if(value) {
			console.log('Trying to create reminder...');
			const triggerTime = new Date(Date.now());
			triggerTime.setSeconds(triggerTime.getSeconds() + 10);

			const testHour = triggerTime.getHours();
			const testMinute = triggerTime.getMinutes();

			Reminder.onCreateReminder({
				id: 'reminderTest',
				title: 'PrayPal Test',
				body: `This is a test of PrayPal notifications.  It should trigger hourly, `+
					`starting at ${testHour}:${testMinute}.`,
				triggerTime,
				repeatFrequency: 0,
			});
		} else {
			notifee.cancelNotification('reminderTest');
		}
	}

	// if the testReminder value is updated, update the corresponding alert
	// This is proof-of-concept, I don't probably need to use useEffect for this
/*
	useEffect(_ => {
		if(testReminder) {
			console.log('Trying to create reminder...');
			const triggerTime = new Date(Date.now());
			triggerTime.setSeconds(triggerTime.getSeconds() + 10);

			const testHour = triggerTime.getHours();
			const testMinute = triggerTime.getMinutes();

			Reminder.onCreateReminder({
				id: 'reminderTest',
				title: 'PrayPal Test',
				body: `This is a test of PrayPal notifications.  It should trigger hourly, `+
					`starting at ${testHour}:${testMinute}.`,
				triggerTime,
				repeatFrequency: 0,
			});
		} else {
			notifee.cancelNotification('reminderTest');
		}
	}, [ testReminder ]);
*/

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Card style={styles.card}>
				<Text>Display All Notifications</Text>
				<Button
					title='Show'
					buttonStyle={styles.button}
					onPress={showAllNotifications}
				/>
			</Card>
			<Card style={styles.card}>
				<Text>Clear All Notifications</Text>
				<Button
					title='Clear'
					buttonStyle={styles.button}
					onPress={cancelAllNotifications}
				/>
			</Card>
			<Card style={styles.card}>
				<Text>Purge Redux State</Text>
				<Button
					title='Purge'
					buttonStyle={styles.button}
					onPress={purgeReduxState}
				/>
			</Card>
			<Card style={styles.card}>
				<Text>Dump Redux State</Text>
				<Button
					title='Dump'
					buttonStyle={styles.button}
					onPress={_ => console.log('Dump redux state...\n', _Store.getState())}
				/>
			</Card>
			<Card style={styles.card}>
				<Text>Dump Prayer Book</Text>
				<Button
					title='Dump'
					buttonStyle={styles.button}
					onPress={_ => console.log('Dump prayer book...\n', _Store.getState().prayer._Book)}
				/>
			</Card>
			<Card style={styles.card}>
				<Text>Hourly Test Notification</Text>
				<Switch
					value={testReminder}
					onValueChange={value => toggleTestReminder(value)}
				/>
			</Card>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		borderRadius: 5,
	},
	button: {
		borderRadius: 3,
	}
});
