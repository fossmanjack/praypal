import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	denomination: 'Orthodox',
	language: 'en-US',
	devMode: false,
	theme: 'dark'
}

const optionsSlice = createSlice({
	name: 'options',
	initialState,
	reducers: {
		setDenomination: (oState, action) => oState.denomination = action.payload,
		setLanguage: (oState, action) => oState.language = action.payload,
		toggleDevMode: (oState, action) => oState.devMode = !oState.devMode,
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
