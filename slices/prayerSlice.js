import { createSlice } from '@reduxjs/toolkit';
import { PRAYERS } from '../data/PRAYERS';

const initialState = {
	_Prayers: [ ],
	_Book: PRAYERS,
	_BookVersion: 1,
}

const prayerSlice = createSlice({
	name: 'prayer',
	initialState,
	reducers: {
		addPrayer: (pState, action) => {
			console.log('addPrayer called with', action);
			if(!action.payload) return pState;

			return {
				...pState,
				_Prayers: [ ...pState._Prayers, action.payload ]
			}
		},
		deletePrayer: (pState, action) => {
			console.log('deletePrayer', action);
			if(!action.payload) return pState;

			let pdel = pState._Prayers.find(({ id }) => id === action.payload);
			console.log('Found pdel:', pdel);
			if(!pdel) return pState;

			return {
				...pState,
				_Prayers: [ ...pState._Prayers.filter(ob => ob.id !== pdel.id) ]
			}
		},
		updatePrayer: (pState, action) => {
			console.log('updatePrayer called with', action);
			if(!action.payload) return pState;

			let idx = pState._Prayers.indexOf(pState._Prayers.find(({ id }) => id === action.payload.id));
			if(!idx) return pState;

			return {
				...pState,
				_Prayers: [
					...pState._Prayers.slice(0, idx),
					action.payload,
					...pState._Prayers.slice(idx + 1)
				]
			}
		},
		replacePrayerBook: (pState, action) => {
			// Expects a new _Prayers object as action payload
			return {
				...pState,
				_Book: [ ...action.payload ]
			}
		},
		updatePrayerBookVersion: (pState, action) => {
			// expects an integer containing the new version as payload
			return {
				...pState,
				_BookVersion: action.payload
			}
		},
	}
});

export const prayerReducer = prayerSlice.reducer;

export const {
	addPrayer,
	deletePrayer,
	updatePrayer,
	replacePrayerBook,
	updatePrayerBookVersion
} = prayerSlice.actions;


