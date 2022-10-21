import React from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';

const MapViewScreen = ({navigation, route}) => {
  const latlng = {
    latitude: route.params.latitude, 
    longitude: route.params.longitude
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Marker
          coordinate={latlng}
          title={'test'}
          //description={marker.description}
        />
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapViewScreen