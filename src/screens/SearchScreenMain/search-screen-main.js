import React from 'react'
import SearchPage from '../SearchScreen/search-page';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreenMap from '../SearchScreen2/search-screen2';
import SearchResult from '../SearchResults/search-result-screen';
import SearchResultExpanded from '../SearchResults/search-result-expanded';
import Filtration from '../Filtration/filtration';
import MapViewScreen from '../MapViewScreen/map-view-screen';
import Profile from '../ProfileScreen/profile';
import RouteMap from '../../components/MapSearch/route-map';
import ChatScreen from '../Chatting/chat-screen';

const SearchScreenMain = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={
        {
          title: '',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#262a2d'
          }
        }
      }
    >
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
      <Stack.Screen
        name='SearchResultExpanded'
        component={SearchResultExpanded}
      />
      <Stack.Screen
        name='SearchFilter'
        component={Filtration}
      />
      <Stack.Screen
        name='SearchMap'
        component={MapViewScreen}
      />
      <Stack.Screen
        name='Profile-Main'
        component={Profile}
      />
      <Stack.Screen
        name='RouteMap'
        component={RouteMap}
      />
      <Stack.Screen
        name='Chat-Screen'
        component={ChatScreen}
      />
    </Stack.Navigator>


  )
}

export default SearchScreenMain