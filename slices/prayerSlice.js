import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	_Prayers: [ ],
}

const prayerSlice = createSlice({
	name: 'prayer',
	initialState,
	reducers: {
		addPrayer: (pState, action) => {
			if(!action.payload) return pState;

			return {
				...pState,
				_Prayers: [ ...pState._Prayers, action.payload ]
			}
		},
		deletePrayer: (pState, action) => {
			if(!action.payload) return pState;

			let pdel = pState._Prayers.find(({ id }) => id === action.payload.id);
			if(!pdel) return pState;

			return {
				...pState,
				_Prayers: [ ...pState._Prayers.filter(ob => ob !== pdel) ]
			}
		},
		modifyPrayer: (pState, action) => {
			if(!action.payload) return pState;

			let idx = pState._Prayers.indexOf(pstate._Prayers.find(({ id }) => id === action.payload.id));
			if(!idx) return pState;

			return {
				...pState,
				_Prayers: [
					...pState._Prayers.slice(0, idx),
					action.payload,
					...pState._prayers.slice(idx + 1)
				]
			}
		}
	}
});

export const prayerReducer = prayerSlice.reducer;

export const {
	addPrayer,
	deletePrayer,
	modifyPrayer
} = prayerSlice.actions;


