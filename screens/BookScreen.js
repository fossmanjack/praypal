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
import { PRAYERS } from '../data/PRAYERS';
import PBO from '../dialogs/PrayerButtonOverlay';

//function renderMain(data, rowMap) {
const AccordionListItem = ({ item }) => {
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
				Object.keys(PRAYERS)
					.filter(p => PRAYERS[p].tags.includes(item))
					.map((p, i) => {
						return (
							<AccordionPrayerItem item={p} />
							/*
							<ListItem key={i} bottomDivider>
								<ListItem.Content>
									<Pressable>
										<Text>{PRAYERS[p].name.en}</Text>
									</Pressable>
								</ListItem.Content>
							</ListItem>
							*/
						)
					})
			}
		</ListItem.Accordion>

	);
}

const AccordionPrayerItem = ({ item }) => {
	const [ expanded, setExpanded ] = useState(false);

	return (
		<ListItem.Accordion
			style={styles.subHeading}
			content={
				<ListItem.Content bottomDivider>
					<ListItem.Title>{PRAYERS[item].name.en}</ListItem.Title>
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
						{PRAYERS[item].text.en}
					</Text>
				</Card>
			</ListItem.Content>
		</ListItem.Accordion>
	);
}

export default function BookScreen() {
	const categories = Object.keys(PRAYERS).reduce((acc, p) => {
		PRAYERS[p].tags.forEach(t => {
			if(!acc.find(tag => tag === t)) acc.push(t);
		});
		return acc;
	}, []);

	// An accordion menu for each category containing titles.  Touch the title
	// for the full prayer.

/*
	const renderMain = (data, rowMap) => {
		const [ expanded, setExpanded ] = useState(false);
		console.log(data);
		const { item }  = data;

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
				<View>
					<Text>Test</Text>
				</View>
			</ListItem.Accordion>

		);
	}
*/
	const renderMain = (data, rowMap) => {
		const { item } = data;
		console.log(`Item: ${item}`);

		return <AccordionListItem item={item} />;
	}

	return (
		<>
			<FlatList
				data={categories}
				renderItem={renderMain}
				keyGenerator={item => item}
			/>
			<PBO />
		</>
	);


/*
	return (
		<View style={styles.container}>
			<Text style={{
				fontWeight: 'bold'
			}}>
				{PRAYERS.niceneCreed.name.en}
			</Text>
			<Text style={styles.textDisplay}>
				{PRAYERS.niceneCreed.text.en}
			</Text>
			<StatusBar style="auto" />
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
	textDisplay: {
		marginHorizontal: 6,
		marginVertical: 3,
	},
	subHeading: {
		marginHorizontal: 15,
	},
});
