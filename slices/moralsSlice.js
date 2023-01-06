import { createSlice } from '@reduxjs/toolkit';
import { _Colors } from '../assets/_Styles';

const initialState = {
	_Virtues: {},
	_Vices: {},
	_History: {}
}

const moralsSlice = createSlice({
	name: 'morals',
	initialState,
	reducers: {
		createVirtue: (mState, action) => {
			// action.payload is [ name, color ]
			// sanitize name and use as id
			// insert into _Virtues
		},
		createVice: (mState, action) => {

		},
		incrementVirtue: (mState, action) => {

		},
		incrementVice: (mState, action) => {

		},

	},
});

export const moralsReducer = moralsSlice.reducer;


