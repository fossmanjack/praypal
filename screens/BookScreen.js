import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PRAYERS } from '../data/PRAYERS';
import PBO from '../dialogs/PrayerButtonOverlay';

export default function BookScreen() {

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
