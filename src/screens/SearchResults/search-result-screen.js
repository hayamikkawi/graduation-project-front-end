import { View, StyleSheet, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import SearchResultCard from '../../components/Cards/search-result-card'
import CustomHeader from '../../components/Header/header'
import CustomButton from '../../components/CustomButton'
import NoResults from '../../components/NoResultsFound/no-results'

const SearchResult = ({ navigation, route }) => {
  const [searchResult, setSearchResult] = useState(route.params.data)
  const [allSearchResult, setAllSearchResult] = useState(route.params.data)
  const numberOfPassengersToReserve = route.params.numberOfPassengers
  const expectedData = route.params.expectedData

  const onFilterPressed = () => {
    //console.log(searchResult)
    navigation.navigate('SearchFilter',
      {
        rides: allSearchResult,
        setRides: setSearchResult
      })
  }
  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <CustomHeader text={'Results'} textColor={'white'} width={'30%'} />
        <CustomButton text={'filter'} width={'20%'} onPress={onFilterPressed} />
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.flex}>
          <Text style={styles.text}>Expected Distance: </Text>
          <Text style={styles.text1}>{expectedData.distance} Meters</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.text}>Expected Time: </Text>
          <Text style={styles.text1}>{expectedData.time}</Text>
        </View>
      </View>
      {(searchResult.length == 0) && <NoResults text={'No results found'} />}
      {
        searchResult.map((ride) => {
          return <SearchResultCard
            ride={ride}
            key={ride.rideProperty.rideId}
            navigation={navigation}
            numberOfPassengers={numberOfPassengersToReserve}
          />
        })
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#262a2d'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2%',
  }, 
  secondContainer:{
    alignItems: 'center', 
  },
  flex: {
    flexDirection: 'row', 
  }, 
  text:{
    fontFamily: 'kanyon-medium', 
    color: 'gray', 
    fontSize: 15
  }, 
  text1:{
    color: 'gray', 
    fontSize: 15, 
    fontFamily: 'Arial'
  }
})
export default SearchResult