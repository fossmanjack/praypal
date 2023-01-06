import { useState } from 'react';
import {
	FlatList,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
	Button,
	Card,
	Icon,
	ListItem
} from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import * as Prayer from '../slices/prayerSlice';
import { _Styles, _Colors } from '../assets/_Styles';

// AccordionListItem is the first tier of accordions.  There is one for each
// category/tag, plus the top "Favorites" item.  Props are as follows:
const AccordionListItem = (props) => {
	const {
		item = '', 						// String -- one of the tags extracted in main
		prayers, 						// relevantPrayers from main
		_Favorites, 					// _Favorites from Redux state
		toggleFavorite, 				// function handed down from main
		theme 							// string from Redux state
	} = props;
	const [ expanded, setExpanded ] = useState(false);

	//console.log('AccordionListItem\n\t', item, '\n\t', _Favorites);

	return (
		<ListItem.Accordion
			content={
				<ListItem.Content>
					<ListItem.Title
						style={{
							color: _Colors[theme].bubbleTitle,
							fontSize: 18
						}}
					>
						{item}
					</ListItem.Title>
				</ListItem.Content>
			}
			containerStyle={{ backgroundColor: _Colors[theme].bubbleTop }}
			isExpanded={expanded}
			onPress={_ => {
				setExpanded(!expanded)
				//console.log('AccordionListItem expanding', item, '...');
				//console.log(prayers);
			}}
			icon={
				<Icon
					name='chevron-down-outline'
					type='ionicon'
					color={_Colors[theme].buttonActiveText}
				/>
			}
		>
			{
				Object.keys(prayers)
					// p is a prayerID
					// filter out prayers that do not have this specific tag
					.filter(p => item === 'Favorites' || prayers[p].tags.includes(item))
					// p is, again, a prayerID
					.map((p, i) => {
						console.log('AccordionPrayerItem', item, 'rendering', p, '...');

						return (
							<AccordionPrayerItem
								item={p}
								prayers={prayers}
								_Favorites={_Favorites}
								key={`${item}-${p}`}
								toggleFavorite={toggleFavorite}
								theme={theme}
							/>
						)
					})
			}
		</ListItem.Accordion>

	);
}

// AccordionPrayerItem is the second tier of accordions, where the individual
// prayers are displayed.  There is one for each prayer in each category.
const AccordionPrayerItem = (props) => {
	const [ expanded, setExpanded ] = useState(false);
	const {
		item, 										// String: prayerID
		prayers, 									// relevantPrayers
		_Favorites, 								// _Favorites from Redux state
		theme,
		toggleFavorite
	} = props;

	console.log('AccordionPrayerItem:', props);

	return (
		<ListItem.Accordion
			style={styles.subHeading}
			containerStyle={{ backgroundColor: _Colors[theme].bubbleTop }}
			content={
				<ListItem.Content
					bottomDivider
					style={{
						flexDirection: 'row'
					}}
				>
					<View style={{ textAlign: 'left', flex: 1 }}>
						<Icon
							name={Object.keys(_Favorites).includes(item) ? 'heart' : 'heart-o'}
							type='font-awesome'
							color={_Colors[theme].buttonActiveText}
							onPress={_ => toggleFavorite(item, prayers[item])}
						/>
					</View>
					<View style={{ textAlign: 'center', flex: 6 }}>
						<ListItem.Title
							style={{
								textAlign: 'center',
								color: _Colors[theme].bubbleTitle,
								fontSize: 16
							}}
						>
							{prayers[item].title}
						</ListItem.Title>
					</View>
				</ListItem.Content>
			}
			isExpanded={expanded}
			onPress={_ => {
				setExpanded(!expanded);
				console.log('AccordionPrayerItem expanding with text', prayers[item].body);
			}}
			icon={
				<Icon
					name='plus'
					type='material-community'
					color={_Colors[theme].buttonActiveText}
				/>
			}
			expandIcon={
				<Icon
					name='minus'
					type='material-community'
					color={_Colors[theme].buttonActiveText}
				/>
			}
			noRotation
		>
			<ListItem.Content>
				<Card containerStyle={{
					marginTop: 0,
					backgroundColor: _Colors[theme].prayerBackground,
					borderWidth: 0
				}}>
					<Text style={_Styles[theme].prayerText}>
						{prayers[item].body}
					</Text>
				</Card>
			</ListItem.Content>
		</ListItem.Accordion>
	);
}

export default function BookScreen() {
	const { language = 'en', denomination = 'universal', theme = 'dark' } = useSelector(S => S.options);
	const { _Book, _Favorites } = useSelector(S => S.prayer);
	const dispatch = useDispatch();
	const fvTitle = 'Favorites';

	// We want both the denom-specific and the universal prayers to be a part of the prayer set
	// relevantPrayers = { prayerID: { ...prayerOb }, prayerID: { ...prayerOb } }
	const relevantPrayers = { ..._Book[language][denomination], ..._Book[language].universal };

	// Here we're getting all the tags in the relevantPrayers and making sure they're unique
	// Could have done this other ways, e.g. using a Set, but this works well enough
	const categories = Object.keys(relevantPrayers).reduce((acc, p) => {
		relevantPrayers[p].tags.forEach(t => {
			if(!acc.find(tag => tag === t)) acc.push(t);
		});
		return acc;
	}, []).sort((a, b) => a - b);

	// For toggling favorites.  Should probably move to <AccordionPrayerItem>, eh, but
	// then we'd have to hand dispatch down instead of this function so w/e
	const toggleFavorite = (id, ob) => {
		dispatch(Prayer.toggleFavorite([ id, ob ]));
	}

	// Renders the FlatList elemenets.  Each <data> is a string, one of the prayer tags
	// extracted in categories, above.
	const renderMain = (data, rowMap) => {
		const { item } = data;
		//console.log(`BookScreen renderMain item: ${item}`);

		return <AccordionListItem
			item={item}
			prayers={relevantPrayers}
			_Favorites={_Favorites}
			toggleFavorite={toggleFavorite}
			key={item}
			theme={theme}
		/>;
	}

	const Favorites = _ => {
		console.log('Rendering Favorites with', _Favorites);

		return (
			<AccordionListItem
				item='Favorites'
				prayers={_Favorites}
				_Favorites={_Favorites}
				toggleFavorite={toggleFavorite}
				key='Favorites'
				theme={theme}
			/>
		);
	}

	// Needed for debugging, won't be needed in production code
	const dumpFavorites = _ => {
		console.log('Dumping favorites...\n', _Favorites);
	}

	// Consider stripping out the SafeAreaView, not sure it's needed
	// FlatList calls renderMain above and should have a "Favorites"
	// AccordionListItem at its top
	return (
		<FlatList
			data={categories}
			renderItem={renderMain}
			keyGenerator={item => item}
			ListHeaderComponent={<Favorites />}
		/>
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


/*
const Favorites = props => {
	const [ expanded, toggleExpanded ] = useState(true);
	const {
		item,
		_Book,
		_Favorites,
		theme,
		toggleFavorite
	} = props;

	return (
		<ListItem.Accordion
			content={
				<ListItem.Content>
					<ListItem.Title
						style={{
							color: _Colors[theme].bubbleTitle,
							fontSize: 18
						}}
					>
						Favorites
					</ListItem.Title>
				</ListItem.Content>
			}
			isExpanded={fvExpanded}
			onPress={_ => toggleExpanded(!expanded)}
			onLongPress={dumpFavorites}
			containerStyle={{ backgroundColor: _Colors[theme].bubbleTop }}
			icon={
				<Icon
					name='chevron-down-outline'
					type='ionicon'
					color={_Colors[theme].buttonActiveText}
				/>
			}
		>
			{
				Object.keys(_Favorites)
					.map((p, i) => {
						console.log('Mapping favorite', p, _Favorites[p]);
						return (
							<AccordionPrayerItem
								item={p}
								_Book={_Favorites}
								_Favorites={_Favorites}
								key={`FV-${p}`}
								toggleFavorite={toggleFavorite}
								theme={theme}
							/>
						)
					})
			}
		</ListItem.Accordion>
	);
}
*/
