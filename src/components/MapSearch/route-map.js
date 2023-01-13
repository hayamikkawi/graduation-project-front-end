import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Polyline as Poly } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

const RouteMap = ({ navigation, route }) => {
  const points = route.params.selectedRoute
  const decodedPoints = Polyline.decode(points);
  let coords = decodedPoints.map((point, index) => {
    return {
      latitude: point[0],
      longitude: point[1]
    }
  })
  const source = route.params.origin
  return (
    <View style={styles.root}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: source.latitude,
          longitude: source.longitude,
          latitudeDelta: .5,
          longitudeDelta: .5,
        }}
      >
        <Poly
          coordinates={coords}
          strokeWidth={4}
          strokeColor={'#1F618D'}
        />
        {/* <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} /> */}
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: '#262a2d'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
export default RouteMap