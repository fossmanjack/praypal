import { createSlice } from '@reduxjs/toolkit';
import { PRAYERS } from '../data/PRAYERS';

const initialState = {
	_Prayers: [ ],
	_Book: PRAYERS,
	_BookVersion: 1,
	_Favorites: { },
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
			console.log('*** updatePrayer called with', action);
			if(!action.payload) {
				console.log('##### ERROR ##### No action.payload!');
				return pState;
			}
			console.log('*** action.payload found!');

			let idx = pState._Prayers.indexOf(pState._Prayers.find(({ id }) => id === action.payload.id));
			console.log('*** Found index:', idx);
			if(idx === -1) return pState;

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
			if(typeof action.payload !== 'object') return pState;
			console.log('replacePrayerBook with', action.payload);
			return {
				...pState,
				_Book: { ...action.payload }
			}
		},
		updatePrayerBookVersion: (pState, action) => {
			// expects an integer containing the new version as payload
			console.log('updatePrayerBookVersion to', action.payload);
			return {
				...pState,
				_BookVersion: action.payload
			}
		},
		toggleFavorite: (pState, action) => {
			// expects [ id, { prayer object }]
			console.log('prayerSlice toggleFavorite ------');
			console.log(action);
			const [ id, prayerOb ] = action.payload;
			console.log(id, prayerOb);

			if(Object.keys(pState._Favorites).includes(id)) {
				console.log('prayerSlice deleting favorite with id', id);
				let hold = { ...pState._Favorites };
				delete hold[id];
				return {
					...pState,
					_Favorites: { ...hold }
				};
			} else {
				return {
					...pState,
					_Favorites: {
						...pState._Favorites,
						[id]: { ...prayerOb },
					}
				};
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
	updatePrayerBookVersion,
	toggleFavorite
} = prayerSlice.actions;


