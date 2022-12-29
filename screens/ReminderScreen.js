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

export default function ListScreen() {
	const { _Reminders } = useSelector(S => S.reminder);
	const dispatch = useDispatch();
	//const [ listData, setListData ] = useState(_Reminders);

	//useEffect(_ => { setListData(_Reminders); console.log('updating:', _Reminders); }, [ _Reminders ]);

	const renderItem = (data, rowMap) => {
		const { item } = data;
		const { hour, minute } = item;
		const displayDate = new Date();
		displayDate.setHours(hour, minute, 0);

		const activeDaysString = ({ days }) => {
			let ret = '';
			ret += item.days['sunday'] ? 'S ' : '';
			ret += item.days['monday'] ? 'M ' : '';
			ret += item.days['tuesday'] ? 'T ' : '';
			ret += item.days['wednesday'] ? 'W ': '';
			ret += item.days['thursday'] ? 'T ' : '';
			ret += item.days['friday'] ? 'F ' : '';
			ret += item.days['saturday'] ? 'S' : '';

			return ret;
		}

		console.log(`Reminder ${item.name}: ${displayDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`);

// Debug code
		if (global.__fbBatchedBridge) {
			const origMessageQueue = global.__fbBatchedBridge;
			const modules = origMessageQueue._remoteModuleTable;
			const methods = origMessageQueue._remoteMethodTable;
			global.findModuleByModuleAndMethodIds = (moduleId, methodId) => {
				console.log(`The problematic line code is in: ${modules[moduleId]}.${methods[moduleId][methodId]}`)
			}
		}

		global.findModuleByModuleAndMethodIds(28, 5);
		global.findModuleByModuleAndMethodIds(3, 9);
		global.findModuleByModuleAndMethodIds(21, 0);

/*
		return (
			<ListItem style={{ flex: 1 }}>
				<ListItem.Content>
					<ListItem.Title>
						{item.name}
					</ListItem.Title>
					<ListItem.Subtitle>
						{displayDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		);
*/
		return (
			<Card>
				<View style={{ flexDirection: 'row' }}>
					<Card.Title style={{ flex: 4 }}>
						{item.name}
					</Card.Title>
					<Card.Title style={{ flex: 2 }}>
						{displayDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</Card.Title>
					<Switch
						value={item.active}
						onValueChange={value => handleUpdateReminder({ rid: item.id, data: { active: value }})}
						style={{ flex: 1 }}
					/>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Text>{activeDaysString(item)}</Text>
				</View>
			</Card>
		);
	}

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

	const hardcodeRecurringReminder = async _ => {
		const date = new Date(Date.now());
		date.setSeconds(date.getSeconds + 10);

		console.log('hardcodeRecurringReminder called...');
		console.log(RepeatFrequency);

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
			sound: 'church_bell',
		});
		console.log('Done.');

		console.log('Creating trigger notification...');
		await notifee.createTriggerNotification(
			{
				id: 'testRecurring',
				title: 'Recurring Trigger',
				body: 'This should recur every 30 seconds',
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
	};

	const deleteRecurringReminder = _ => {
		notifee.cancelNotification('testRecurring');
	}

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
