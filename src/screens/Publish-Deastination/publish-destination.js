import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import MapSearch from '../../components/MapSearch/map-search'

const PublishDestination = ({ navigation, route }) => {
  const onChooseDestination= (data) => {
    console.warn(data.place_id)
    navigation.navigate("Publish-Date-Details", {
      destDescription: data.description,
      destId: data.place_id, 
      sourceDescription: route.params.sourceDescription,
      sourceId: route.params.sourceId
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