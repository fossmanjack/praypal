import { useState } from 'react';
import {
	FlatList,
	Pressable,
	StyleSheet,
	View,
	Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
	Card,
	Icon,
	ListItem
} from '@rneui/themed';
import { useSelector } from 'react-redux';

const AccordionListItem = ({ item, _Book }) => {
	const [ expanded, setExpanded ] = useState(false);

	return (
		<ListItem.Accordion
			content={
				<ListItem.Content>
					<ListItem.Title>{item}</ListItem.Title>
				</ListItem.Content>
			}
			isExpanded={expanded}
			onPress={_ => setExpanded(!expanded)}
		>
			{
				Object.keys(_Book)
					.filter(p => _Book[p].tags.includes(item))
					.map((p, i) => {
						return (
							<AccordionPrayerItem item={p} _Book={_Book} key={item.id} />
						)
					})
			}
		</ListItem.Accordion>

	);
}

const AccordionPrayerItem = ({ item, _Book }) => {
	const [ expanded, setExpanded ] = useState(false);

	return (
		<ListItem.Accordion
			style={styles.subHeading}
			content={
				<ListItem.Content bottomDivider>
					<ListItem.Title>{_Book[item].name.en}</ListItem.Title>
				</ListItem.Content>
			}
			isExpanded={expanded}
			onPress={_ => setExpanded(!expanded)}
			icon={
				<Icon
					name='plus'
					type='material-community'
				/>
			}
			expandIcon={
				<Icon
					name='minus'
					type='material-community'
				/>
			}
			noRotation
		>
			<ListItem.Content>
				<Card containerStyle={{ marginTop: 0}}>
					<Text>
						{_Book[item].text.en}
					</Text>
				</Card>
			</ListItem.Content>
		</ListItem.Accordion>
	);
}

export default function BookScreen() {
	const _Book = useSelector(S => S.prayer._Book) || {};

	const categories = Object.keys(_Book).reduce((acc, p) => {
		_Book[p].tags.forEach(t => {
			if(!acc.find(tag => tag === t)) acc.push(t);
		});
		return acc;
	}, []);

	const renderMain = (data, rowMap) => {
		const { item } = data;
		console.log(`Item: ${item}`);

		return <AccordionListItem item={item} _Book={_Book} key={item.id} />;
	}

	return (
		<>
			<FlatList
				data={categories}
				renderItem={renderMain}
				keyGenerator={item => item.id}
			/>
		</>
	);


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textDisplay: {
		marginHorizontal: 6,
		marginVertical: 3,
	},
	subHeading: {
		marginHorizontal: 15,
	},
});
