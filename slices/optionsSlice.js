import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	denomination: 'orthodox',
	language: 'en',
	devMode: false,
	theme: 'dark'
}

const optionsSlice = createSlice({
	name: 'options',
	initialState,
	reducers: {
		setDenomination: (oState, action) => {
			return {
				...oState,
				denomination: action.payload
			};
		},
		setLanguage: (oState, action) => oState.language = action.payload,
		toggleDevMode: (oState, action) => {
			return {
				...oState,
				devMode: !oState.devMode,
			}
		},
		setTheme: (oState, action) => oState.theme = action.payload
	},
});

export const optionsReducer = optionsSlice.reducer;

export const {
	setDenomination,
	setLanguage,
	setTheme,
	toggleDevMode
} = optionsSlice.actions;
