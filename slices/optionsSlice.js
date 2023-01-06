import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	denomination: [ 'universal' ],
	language: [ 'en' ],
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
		toggleDenomination: (oState, action) => {
			// expects IETF language code as argument
			// remove if present
			if(oState.denomination.includes(action.payload)) {
				return {
					...oState,
					denomination: [ ...oState.denomination.filter(l => l !== action.payload) ]
				};
			// otherwise add
			} else {
				return {
					...oState,
					denomination: [ ...oState.denomination, action.payload ]
				};
			}
		},
		setLanguage: (oState, action) => oState.language = action.payload,
		toggleLanguage: (oState, action) => {
			// expects IETF language code as argument
			// remove if present
			if(oState.language.includes(action.payload)) {
				return {
					...oState,
					language: [ ...oState.language.filter(l => l !== action.payload) ]
				};
			// otherwise add
			} else {
				return {
					...oState,
					language: [ ...oState.language, action.payload ]
				};
			}
		},
		toggleDevMode: (oState, action) => {
			return {
				...oState,
				devMode: !oState.devMode,
			}
		},
		setTheme: (oState, action) => {
			return {
				...oState,
				theme: action.payload
			}
		},
	},
});

export const optionsReducer = optionsSlice.reducer;

export const {
	setDenomination,
	setLanguage,
	setTheme,
	toggleDenomination,
	toggleDevMode,
	toggleLanguage,
} = optionsSlice.actions;
