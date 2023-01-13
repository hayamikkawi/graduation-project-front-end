import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import MapSearch from '../../components/MapSearch/map-search'
import Google_Key from '../../Google-Key'
import axios from 'axios'

const PublishDestination = ({ navigation, route }) => {
  const getLatLong = async (id) => {
    let result = {}
    await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${Google_Key}`).
    then((res) => {
      result = (res.data?.result?.geometry?.location)
    }).catch((err)=>{
      console.log(err)
    })
    return result
  }
  const onChooseDestination= async (data) => {
    const latLong = await getLatLong(data.place_id)
    const latitudeLongitude = {
      latitude: latLong.lat, 
      longitude: latLong.lng
    }
    navigation.navigate("Publish-Route", {
      destDescription: data.description,
      destId: data.place_id, 
      destLatLong: latitudeLongitude,
      sourceDescription: route.params.sourceDescription,
      sourceId: route.params.sourceId, 
      sourceLatLong: route.params.sourceLatLong
    })
  }
  return (
    <View style={styles.root} >
      <CustomHeader text={"Where are you heading?"} />
      <MapSearch
        navigation={navigation}
        route={route}
        onPress={onChooseDestination}
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
export default PublishDestination