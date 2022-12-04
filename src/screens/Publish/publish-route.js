import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { Polyline as Poly } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import Google_Key from '../../Google-Key';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from '../../components/Header/header';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CustomText from '../../components/CustomText/custom-text';
import Checkbox from 'expo-checkbox'
import CustomButton from '../../components/CustomButton';

const PublishRoute = ({ navigation, route }) => {
  const myCoordinates = [route.params.sourceLatLong, route.params.destLatLong]
  console.log(myCoordinates)
  const [coordinates] = useState(myCoordinates);
  const [routes, setRoutes] = useState([])
  const [coords, setCoords] = useState([])
  const [ways, setWays] = useState([])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getDirections = async() => {
  //       axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=32.2211, 35.2607&destination=32.0114, 35.1902&mode=driving&alternatives=true&key=AIzaSyAieM8IXCWExPZ6-GgqxcGtwq4zW_dfFd4`).then(
  //         (res) => {
  //           res.data.routes.forEach(route => {
  //             setRoutes(current => [...current, route.summary])
  //             let points = Polyline.decode(route.overview_polyline.points);
  //             let newCoords = points.map((point, index) => {
  //               return {
  //                 latitude: point[0],
  //                 longitude: point[1]
  //               }
  //             })

  //             setCoords(current => [...current, newCoords])
  //             console.log(routes)
  //           })
  //         } 
  //       )
  //     }
  //     getDirections()
  //   }, [])
  // )
  useEffect(() => {
    const getDirections = async () => {
      console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${coordinates[0].latitude},${coordinates[0].longitude}&`+
      `destination=${coordinates[1].latitude},${coordinates[1].longitude}&mode=driving&alternatives=true&key=AIzaSyAieM8IXCWExPZ6-GgqxcGtwq4zW_dfFd4`)
      axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${coordinates[0].latitude},${coordinates[0].longitude}&`+
      `destination=${coordinates[1].latitude},${coordinates[1].longitude}&mode=driving&alternatives=true&key=AIzaSyAieM8IXCWExPZ6-GgqxcGtwq4zW_dfFd4`).then(
        (res) => {
          res.data.routes.forEach(route => {
            //setRoutes(current => [...current, route.summary])
            let points = Polyline.decode(route.overview_polyline.points);
            let newCoords = points.map((point, index) => {
              return {
                latitude: point[0],
                longitude: point[1]
              }
            })
            const way = {
              coords: newCoords,
              name: route.summary,
              isSelected: false
            }
            setWays(current => [...current, way])
            //setCoords(current => [...current, newCoords])
          })
        }
      )
    }
    if (ways.length == 0)
      getDirections()
  }, [])
  const selectRoute = (route) => {
    console.log(route.name)
    setWays(current =>
      current.map(obj => {
        if (obj.name == route.name) {
          return { ...obj, isSelected: true }
        } else {
          return { ...obj, isSelected: false }
        }
      })
    )
  }
  const getSelectedRoute = () => {
    ways.forEach(way => {
      if(way.isSelected) return {coords: way.coords, name: way.name}
    });
  }
  const onNextPressed = () => {
    const selectedRoute = getSelectedRoute()
    navigation.navigate('Publish-Date-Details', {
      sourceDescription: route.params.sourceDescription,
      sourceId: route.params.sourceId,
      destDescription: route.params.destDescription,
      destId: route.params.destId,
      selectedRoute: selectedRoute
    })
  }
  return (
    <ScrollView style={styles.root}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.1622,
          longitudeDelta: 0.1121,
        }}
      >
        {
          ways.map((route, index) => {
            return (
              // <Text>{route}</Text>
              <Poly
                key={index}
                coordinates={route.coords}
                strokeWidth={4}
                strokeColor={route.isSelected ? '#1F618D' : 'transparent'}
              />
            )
          })

        }
        {/* <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          strokeColor={'gray'}
          apikey={Google_Key}
        /> */}
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView>
      <View>
        <CustomHeader
          text={'Choose Your Route:'}
        />
        <View style={styles.inner}>
          {
            ways.map((route, index) => {
              return <Pressable onPress={() => selectRoute(route)} key={index}>
                <View style={styles.flex}>
                  <CustomText text={route.name} size={15} color='white' />
                  <Checkbox
                    value={route.isSelected}
                    color={'#1093c9'}
                  />
                </View>
              </Pressable>
            })
          }
        </View>
        <View style= {styles.button}>
          <CustomButton
            text={'Next'}
            width={'30%'}
            onPress={onNextPressed}
          />
        </View>
      </View>
    </ScrollView>
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
    height: Dimensions.get('window').height * .5,
  },
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: '#262a2d'
  },
  inner: {
    width: '80%',
    marginLeft: '10%'
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    width: '100%'
  }, 
  button: {
    alignContent: 'center', 
    alignItems: 'center', 
    width: '100%'
  }
});
export default PublishRoute