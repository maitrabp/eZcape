import React, {useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import EzTripCard from '../Components/EzTripCard'

export default function Home({navigation}) {
    // const [trips, setTrip] = useState(
        
    // );

    const DATA = [
        {
            id: '1',
            tripName: 'Trip 2020',
            numMembers: '7'
        },
        {
            id: '2',
            tripName: 'Trip 2019',
            numMembers: '5'
        }
    ]

    const Item = ({ tripName }) => {
        <View>
            <Text>{tripName}</Text>
        </View>
    };

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.tripName}</Text>
        </View>
      );

    return (
        <View>
            <FlatList 
                data={DATA}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
