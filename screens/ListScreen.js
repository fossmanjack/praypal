import {
	FlatList,
	ImageBackground,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@rneui/themed';
import PrayerEditDialog from '../dialogs/PrayerEditDialog';
import { _Styles } from '../assets/_Styles';

export default function ListScreen() {
	const { _Prayers } = useSelector(S => S.prayer);
	const { theme } = useSelector(S => S.options);
	const [ editPrayer, setEditPrayer ] = useState(
		{
			id: 'blank',
			title: 'Blank prayer',
			body: '',
			expires: false,
			expireDate: 0
		}
	);
	const [ loadEdit, setLoadEdit ] = useState(false);
	const [ editVisible, toggleEditVisible ] = useState(false);
	const [ loaded, setLoaded ] = useState(false);

	const renderItem = (data, rowMap) => {
		const { item: { title, body, expires, expireDate }} = data;
		const expDate = new Date(expireDate);
		const expText = expires ? `Until ${expDate.toLocaleDateString()}` : '';
		const expired = expires && expireDate < Date.now();

		return (
			<Pressable
				onLongPress={_ => {
					setEditPrayer({ ...data.item });
					toggleEditVisible(true);
				}}
			>
				<Card containerStyle={[ expired ? _Styles[theme].cardInactive : _Styles[theme].cardActive ]}>
					<View style={_Styles[theme].cardTitle}>
						<Card.Title style={[ expired ? _Styles[theme].cardInactiveTitleText : _Styles[theme].cardActiveTitleText, { flex: 4 } ]}>
							{title}
						</Card.Title>
						<Card.Title style={[ expired ? _Styles[theme].cardInactiveSubtitleText : _Styles[theme].cardActiveSubtitleText, { flex: 4 } ]}>
							{expText}
						</Card.Title>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={[ expired ? _Styles[theme].cardInactiveBodyText : _Styles[theme].cardActiveBodyText ]}>{body}</Text>
					</View>
				</Card>
			</Pressable>
		);
	}

	return (
		<>
			<SafeAreaView>
				<FlatList
					data={[ ..._Prayers ].sort((a, b) => {
						if(a.expires && a.expireDate < Date.now()) return 1;
						if(b.expires && b.expireDate < Date.now()) return -1;

						return 0;
					})}
					keyExtractor={data => {
						console.log('Extracting key...');
						console.log(data);
						return data.id;
					}}
					renderItem={renderItem}
				/>
			</SafeAreaView>
			<PrayerEditDialog
				visible={editVisible}
				toggleVisible={toggleEditVisible}
				item={editPrayer}
				key={editVisible}
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
	cardActive: {
		borderRadius: 15,
	},
});
