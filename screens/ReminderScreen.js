import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	useState
} from 'react';
import PBO from '../dialogs/PrayerButtonOverlay';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export default function ReminderScreen() {
	const [ loaded, setLoaded ] = useState(false);

	const onCreateTrigger = async t => {
		const date = new Date(t);
		date.setSeconds(date.getSeconds() + 60);

		const trigger: TimestampTrigger = {
			type: TriggerType.TIMESTAMP,
			timestamp: date.getTime(),
		};

		await notifee.createTriggerNotification(
			{
				title: 'Test notification',
				body: 'This is a test',
				android: {
					channelId: 'default',
				},
			},
			trigger,
		);
	}

	useEffect(_ => {
		if(!loaded) {
			onCreateTrigger(Date.now());
			loaded = true;
		}
	}, []);

	return (
		<View style={styles.container}>
			<Text style={{
				fontWeight: 'bold'
			}}>
				Alarms go here!
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
