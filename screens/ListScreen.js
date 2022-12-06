import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import PBO from '../dialogs/PrayerButtonOverlay';

export default function ListScreen() {

	return (
		<View style={styles.container}>
			<Text style={{
				fontWeight: 'bold'
			}}>
				Your prayers go here!
			</Text>
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
