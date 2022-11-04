import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PRAYERS } from './data/PRAYERS';

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
