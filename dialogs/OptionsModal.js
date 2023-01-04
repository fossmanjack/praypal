import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	Button,
	Card,
} from '@rneui/themed';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Opts from '../slices/optionsSlice';
import * as CONSTANTS from '../data/CONSTANTS';

export default function OptionsModal(props) {
	const { visible, toggleVisible } = props;
	const _Options = useSelector(S => S.options);
	const [ devPress, setDevPress ] = useState(0);

	const onTap = _ => setDevPress(devPress++);

	return (
		<Modal visible={visible}>
			<View style={styles.header}>
				<Text>PrayPal: Options</Text>
				<Button
					onPress={_ => toggleVisible(!visible)}
					type='outline'
					icon={{
						name: 'options-outline',
						type: 'ionicon'
					}}
				/>
			</View>
			<Pressable>
				<Card>
					<Card.Title>Version: {CONSTANTS.VERSION}</Card.Title>
				</Card>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',

	}
});
