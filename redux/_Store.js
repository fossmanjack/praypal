import { configureStore } from '@reduxjs/toolkit';
import { prayerReducer } from '../slices/prayerSlice';

export const _Store = configureStore({
	reducer: {
		prayer: prayerReducer,
	}
});
