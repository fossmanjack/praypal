import { configureStore } from '@reduxjs/toolkit';
import { prayerReducer } from '../slices/prayerSlice';
import { reminderReducer } from '../slices/reminderSlice';

export const _Store = configureStore({
	reducer: {
		prayer: prayerReducer,
		reminder: reminderReducer,
	}
});
