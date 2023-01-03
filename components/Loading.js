import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View
} from 'react-native';

export default function Loading() {
	return (
		<View style={styles.loadingView}>
			<ActivityIndicator
				size='large'
				color='tomato'
			/>
			<Text style={styles.loadingText}>
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	loadingView: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	loadingText: {
		color: 'tomato',
		fontSize: 14,
		fontWeight: 'bold',
	},
});
