import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem, Card, Switch } from '@rneui/themed';
import * as Rem from '../slices/reminderSlice';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import * as Utils from '../utils/Utils';

export default function ReminderScreen() {
	const { _Reminders } = useSelector(S => S.reminder);
	const dispatch = useDispatch();

	const renderItem = (data, rowMap) => {
		const { item } = data;
		const { hour, minute } = item;
		const displayDate = new Date();
		displayDate.setHours(hour, minute, 0);

		return (
			<Card style={{ borderRadius: 20 }}>
				<View style={{ flexDirection: 'row' }}>
					<Card.Title style={{ flex: 4 }}>
						{item.title}
					</Card.Title>
					<Card.Title style={{ flex: 2 }}>
						{Utils.niceTime(displayDate)}
					</Card.Title>
					<Switch
						value={item.active}
						onValueChange={value => handleUpdateReminder(item, value)}
						style={{ flex: 1 }}
					/>
				</View>
				<View style={{ flexDirection: 'row' }}>
					{item.body}
				</View>
			</Card>
		);
	}

	const handleUpdateReminder = (item, value) => {
		const {
			id,
			title,
			body,
			hour,
			minute,
			active
		} = item;

		if(value) {
			const triggerTime = new Date(Date.now());
			triggerTime.setHours(hour, minute, 0);
			if(triggerTime.getTime() < Date.now())
				triggerTime.setDate(triggerTime.getDate() + 1);
			dispatch(Rem.modifyReminder([ id, { active: true } ]));
			Rem.createAndroidReminder({
				id,
				title,
				body,
				triggerTime,
				repeatFrequency: RepeatFrequency.DAILY,
			});
		} else {
			dispatch(Rem.modifyReminder([ id, { active: false } ]));
			notifee.cancelNotification(id);
		}
	};


/*
	const handleUpdateReminder = ({ rid, data }) => {
		console.log('handleUpdateReminder', rid, data);
		dispatch(Rem.modifyReminder([ rid, data ]));
		if(data.active) {
			hardcodeRecurringReminder();
		} else {
			deleteRecurringReminder();
		};
		console.log('Showing all reminders...');
		notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications and IDs:', ids));
		console.log('Done.');
	}
*/

	return (
		<>
			<SafeAreaView>
				<FlatList
					data={_Reminders}
					keyExtractor={item => item.id}
					renderItem={renderItem}
					bottomDivider
				/>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

/*

REMINDER NAME --- REMINDER TIME | Enabled slider
REMINDER DAYS                   | Edit - Trash
------------------------------------------------
Accordion text

*/
