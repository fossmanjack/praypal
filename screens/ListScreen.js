import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { useSelector } from 'react-redux';
//import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem } from '@rneui/themed';
import PBO from '../dialogs/PrayerButtonOverlay';

export default function ListScreen() {
	const { _Prayers } = useSelector(S => S.prayer);

	const renderItem = (data, rowMap) => {
		const { item } = data;
		return (
			<ListItem style={{ flex: 1 }}>
				<ListItem.Content>
					<ListItem.Title>
						{item.title}
					</ListItem.Title>
					<ListItem.Subtitle>
						{item.text}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		);
	}

	return (
		<>
			<SafeAreaView>
				<FlatList
					data={_Prayers}
					keyExtractor={item => item.id}
					renderItem={renderItem}
				/>
			</SafeAreaView>
			<PBO />
		</>
	);
/*
	return (
		<>
			<SwipeListView
				data={_Prayers}
				key={_Prayers}
				renderItem={renderItem}
				leftActivationValue={75}
				leftActionValue={200}
				onLeftAction={handleDelete}
				rightActivationValue={75}
				rightActionValue={200}
				onRightAction={handleEdit}
				bottomDivider
				closeOnRowPress
				closeOnRowBeginSwipe
				closeOnRowOpen
				closeOnScroll
			/>
			<PBO />
		</>
	);
*/

/*
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
*/
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
