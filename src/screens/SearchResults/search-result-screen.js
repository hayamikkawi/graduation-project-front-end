import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SearchResultCard from '../../components/SearchResultCard/search-result-card'
import CustomHeader from '../../components/Header/header'
import CustomButton from '../../components/CustomButton'
import NoResults from '../../components/NoResultsFound/no-results'

const SearchResult = ({ navigation, route }) => {
  const [searchResult, setSearchResult] = useState(route.params)
  const [allSearchResult, setAllSearchResult] = useState(route.params)
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
      {searchResult.length == 0 && <NoResults text={'No results found'}/>}
      {
        searchResult.map((ride) => {
          return <SearchResultCard ride={ride} key={ride.id} navigation={navigation} />
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
  }
})
export default SearchResult