// ReminderScreen.js
// Displays notifications and allows user interaction
// p3soft/JSP
// 2022-12-08

// React Native
import { useState, useEffect } from 'react';
import {
	FlatList,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Card, Switch } from '@rneui/themed';

// Community
import notifee, { RepeatFrequency } from '@notifee/react-native';

// Local
import { _Styles, _Colors } from '../assets/_Styles';
import * as Rem from '../slices/reminderSlice';
import * as Utils from '../utils/Utils';
import ReminderEditDialog from '../dialogs/ReminderEditDialog';

export default function ReminderScreen() {
	const { _Reminders } = useSelector(S => S.reminder);
	const { theme } = useSelector(S => S.options);
	const dispatch = useDispatch();
	const [ editVisible, toggleEditVisible ] = useState(false);
	const [ editReminder, setEditReminder ] = useState(Rem.createNewReminder());

	const renderItem = (data, rowMap) => {
		const { item } = data;
		const { hour, minute } = item;
		const displayDate = new Date();
		displayDate.setHours(hour, minute, 0);

		return (
			<Pressable
				onLongPress={_ => {
					setEditReminder({ ...data.item });
					toggleEditVisible(true);
				}}
			>
				<Card containerStyle={_Styles[theme].cardActive}>
					<View style={_Styles[theme].cardTitle}>
						<Card.Title style={[ _Styles[theme].cardActiveTitleText, { flex: 4 } ]}>
							{item.title}
						</Card.Title>
						<Card.Title style={[ _Styles[theme].cardActiveSubtitleText, { flex: 2 } ]}>
							{Utils.niceTime(displayDate)}
						</Card.Title>
						<Switch
							value={item.active}
							onValueChange={value => handleUpdateReminder({ ...item, active: value })}
							style={[ _Styles[theme].switchStyle, { flex: 1 } ]}
							color={_Colors[theme].cardActiveBodyText}
						/>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={_Styles[theme].cardActiveBodyText}>{item.body}</Text>
					</View>
				</Card>
			</Pressable>
		);
	}

	const handleUpdateReminder = (item) => {
		// Expects a _Reminders object { id, title, body, hour, minute, active, created, modified }
		const {
			id,
			title,
			body,
			hour,
			minute,
			active
		} = item;
		const triggerTime = new Date(Date.now());
		triggerTime.setHours(hour, minute, 0);

		while(triggerTime.getTime() < Date.now())
			triggerTime.setDate(triggerTime.getDate() + 1);

		dispatch(Rem.updateReminder({ ...item }));

		if(active)
			Rem.createAndroidReminder({
				id,
				title,
				body,
				triggerTime,
				repeatFrequency: RepeatFrequency.DAILY,
			});
		else
			notifee.cancelNotification(id);
	};

	return (
		<>
			<SafeAreaView>
				<FlatList
					data={_Reminders}
					keyExtractor={item => item.id}
					renderItem={renderItem}
					bottomDivider
				/>
				<ReminderEditDialog
					visible={editVisible}
					toggleVisible={toggleEditVisible}
					handleUpdateReminder={handleUpdateReminder}
					item={editReminder}
					key={editVisible}
				/>
			</SafeAreaView>
		</>
	);
}
