import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete/GooglePlacesAutocomplete'
import MapSearch from '../../components/MapSearch/map-search'

const PublishSource = ({ navigation, route }) => {
    const onChooseSource = (data) => {
        console.log(data)
        navigation.navigate("Publish-Destination", {
            sourceDescription: data.description,
            sourceId: data.place_id
        })
    }
    return (
        <View style={styles.root}>
            <CustomHeader text={"Where are you leaving from?"} />
            <MapSearch
                navigation={navigation}
                route={route}
                onPress={onChooseSource}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        backgroundColor: '#262a2d',
        width: '100%',
        height: '100%'
    }
})

export default PublishSource