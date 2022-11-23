import { StatusBar } from 'expo-status-bar';
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { PRAYERS } from './data/PRAYERS';
//import { FAB } from 'react-native-elements';
//import { Modal, Dialog } from 'react-native';
import { FAB, Dialog } from '@rneui/themed';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PBO from './dialogs/PrayerButtonOverlay';

export default function App() {

	return (
		<View style={styles.container}>
			<Text style={{
				fontWeight: 'bold'
			}}>
				{PRAYERS.niceneCreed.name.en}
			</Text>
			<Text>
				{PRAYERS.niceneCreed.text.en}
			</Text>
			<StatusBar style="auto" />
			<PBO />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
