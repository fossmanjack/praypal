import { useEffect, useState } from 'react';
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
	//console.log('AccordionListItem for', item);

	return (
		<ListItem.Accordion
			content={
				<ListItem.Content>
					<ListItem.Title
						style={{
							color: _Colors[theme].cardActiveTitleText,
							fontSize: 18
						}}
					>
						{item}
					</ListItem.Title>
				</ListItem.Content>
			}
			containerStyle={_Styles[theme].bookHeading}
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
						//console.log('AccordionPrayerItem', item, 'rendering', p, '...');

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

	//console.log('AccordionPrayerItem:', props);

	return (
		<ListItem.Accordion
			style={styles.subHeading}
			containerStyle={_Styles[theme].bookSubheading}
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
								color: _Colors[theme].bookSubheadingText,
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
				//console.log('AccordionPrayerItem expanding with text', prayers[item].body);
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
					backgroundColor: _Colors[theme].bookBodyBackground,
					borderWidth: 0,
				}}>
					<Text style={_Styles[theme].bookBodyText}>
						{prayers[item].body}
					</Text>
				</Card>
			</ListItem.Content>
		</ListItem.Accordion>
	);
}

export default function BookScreen() {
	const { language = [ 'en' ], denomination = [ 'universal' ], theme = 'dark' } = useSelector(S => S.options);
	const { _Book, _Favorites } = useSelector(S => S.prayer);
	const dispatch = useDispatch();
	const fvTitle = 'Favorites';

	// We want both the denom-specific and the universal prayers to be a part of the prayer set
	// relevantPrayers = { prayerID: { ...prayerOb }, prayerID: { ...prayerOb } }
	//const relevantPrayers = { ..._Book[language][denomination], ..._Book[language].universal };
	//
	// prayers is a flat object derived from the _Book based on language and denomination selections
	// It should be a series of { prayerID: { title, body, tags }, prayerID: { title, body, tags }}
	const [ prayers, setPrayers ] = useState({});

	// categories is an array of unique tags derived from the prayers object
	const [ categories, setCategories ] = useState([]);

/*
	const appendPrayers = addPrayers => {
		console.log('appendPrayers called\n\tadding:', Object.keys(addPrayers), '\n\tto:', Object.keys(prayers));
		let out = { ...prayers, ...addPrayers };
		console.log('out:', Object.keys(out));
		setPrayers(out);
	}
*/

	const getPrayers = (l, d) => _Book[l][d] || {};
	/*
	const getPrayers = (l, d) => {
		const out = _Book[l][d] || {};

		console.log(`Found the following for ${l}:${d}: ${Object.keys(out)}`);
		return out;
	}
	*/

	//useEffect(_ => { console.log('>>> prayers changed, now', Object.keys(prayers)); }, [ prayers ]);

	useEffect(_ => {
		//setPrayers({});
		let outPrayers = {};
		//console.log('Generating prayers object...');
		//language.forEach(l => denomination.forEach(d => appendPrayers(getPrayers(l, d))));
		language.forEach(l => {
			denomination.forEach(d => {
				outPrayers = { ...outPrayers, ...getPrayers(l, d) };
			})
		});

		//console.log('Got outPrayers:', Object.keys(outPrayers));

/*
		console.log('BookScreen useEffect working with _Book', _Book);
		language.forEach(l => {
			console.log('BookScreen useEffect checking', l, '\n\t', _Book[l], '...');
			denomination.forEach(d => {
				console.log('BookScreen useEffect checking', d, '\n\t', _Book[l][d], '...');
				appendPrayers(_Book[l][d]);
				console.log('prayers is', prayers);
			});
		});
		console.log('Done checking, found', prayers);
*/
		setPrayers(outPrayers);
		//console.log('Done, found', Object.keys(prayers));
	}, [ language, denomination, _Book ]);

	// Here we're getting all the tags in the relevantPrayers and making sure they're unique
	// Could have done this other ways, e.g. using a Set, but this works well enough
	useEffect(_ => {
		setCategories(Object.keys(prayers).reduce((acc, p) => {
		//const cats = Object.keys(prayers).reduce((acc, p) => {
			prayers[p].tags.forEach(t => {
				if(!acc.includes(t)) acc.push(t);
			});
			return acc;
		}, []).sort((a, b) => a > b ? 1 : a < b ? -1 : 0));
		//}, []).sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
		//console.log('useEffect categories updated with', cats);
		//setCategories(cats);
	}, [ prayers ]);

/*
	// Here we're getting all the tags in the relevantPrayers and making sure they're unique
	// Could have done this other ways, e.g. using a Set, but this works well enough
	const categories = Object.keys(prayers).reduce((acc, p) => {
		prayers[p].tags.forEach(t => {
			if(!acc.find(tag => tag === t)) acc.push(t);
		});
		return acc;
	}, []).sort((a, b) => a - b);
*/

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
			prayers={prayers}
			_Favorites={_Favorites}
			toggleFavorite={toggleFavorite}
			key={item}
			theme={theme}
		/>;
	}

	const Favorites = _ => {
		//console.log('Rendering Favorites with', _Favorites);

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
