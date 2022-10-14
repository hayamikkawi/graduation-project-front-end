import { View, Text } from 'react-native'
import React from 'react'
import SearchPage from '../SearchScreen/search-page';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreenMap from '../SearchScreen2/search-screen2';
import SearchResult from '../SearchResults/search-result-screen';
const SearchScreenMain = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen
        name="Search1"
        component={SearchPage}
        />
        <Stack.Screen
        name="Search2"
        component={SearchScreenMap}
        />
        <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        />

    </Stack.Navigator>
    
     
  )
}

export default SearchScreenMain