import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	reminders: {}
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

		},
		deleteReminder: (rState, action) => {
			// expects rid as action.payload

		},
	},
});

export const reminderReducer = reminderSlice.reducer;

export const {
	addReminder,
	modifyReminder,
	deleteReminder
} = reminderSlice.actions;

/*

Reminder structure:

rid: {
	name: String,
	time: Date or String(sunrise, sunset),
	recurring: Boolean Array [ false, false, false, false, false, false, false ],
	title: String,
	body: String,


*/
