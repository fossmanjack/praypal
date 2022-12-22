import { createSlice } from '@reduxjs/toolkit';
import { REMINDERS } from '../data/REMINDERS';
import uuid from 'react-native-uuid';

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
			const [ rid, props ] = action.payload;
			let oldr = rState._Reminders.find(ob => ob.id === rid);
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
		days: {
			'sunday': false,
			'monday': false,
			'tuesday': false,
			'wednesday': false,
			'thursday': false,
			'friday': false,
			'saturday': false
		},
		active: false,
		created: date,
		modified: date,
	};
};

export const reminderReducer = reminderSlice.reducer;

export const {
	addReminder,
	modifyReminder,
	deleteReminder
} = reminderSlice.actions;

