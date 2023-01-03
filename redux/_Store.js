import { configureStore } from '@reduxjs/toolkit';
import { prayerReducer } from '../slices/prayerSlice';
import { reminderReducer } from '../slices/reminderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	persistStore,
	persistCombineReducers,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';

const config = {
	key: 'root',
	storage: AsyncStorage,
	debug: true
}

/*
export const _Store = configureStore({
	reducer: {
		prayer: prayerReducer,
		reminder: reminderReducer,
	}
});
*/

export const _Store = configureStore({
	reducer: persistCombineReducers(config, {
		prayer: prayerReducer,
		reminder: reminderReducer
	}),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
});

export const _Persist = persistStore(_Store);
