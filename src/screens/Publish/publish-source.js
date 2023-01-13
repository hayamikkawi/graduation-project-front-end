import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete/GooglePlacesAutocomplete'
import MapSearch from '../../components/MapSearch/map-search'
import Google_Key from '../../Google-Key'
import axios from 'axios'

const PublishSource = ({ navigation, route }) => {
    const getLatLong = async(id) => {
        let result = {}
        await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${Google_Key}`).
            then((res) => {
                result =  (res.data?.result?.geometry?.location)
            }).catch((err) => {
                console.log(err)
            })
        return result
    }
    const onChooseSource = async (data) => {
        const latLong = await getLatLong(data.place_id)
       
        const latitudeLongitude = {
            latitude: latLong.lat, 
            longitude: latLong.lng
        }
        navigation.navigate("Publish-Destination", {
            sourceDescription: data.description,
            sourceId: data.place_id,
            sourceLatLong: latitudeLongitude
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