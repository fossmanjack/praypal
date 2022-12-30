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
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export default function DevScreen(props) {
	const [ testReminder, setTestReminder ] = useState(false);
	const [ change, setChange ] = useState(false);

	const showAllNotifications = _ => {
		notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications and IDs:', ids));
	}

	const cancelAllNotifications = _ => {
		notifee.cancelAllNotifications().then(_ => console.log('Notifications should be cancelled.'));
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
