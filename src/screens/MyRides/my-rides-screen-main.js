import React from 'react'
import MyRidesScreen from './my-rides-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchResultExpanded from '../SearchResults/search-result-expanded'
import Profile from '../ProfileScreen/profile'
import MapViewScreen from '../MapViewScreen/map-view-screen'
import RouteMap from '../../components/MapSearch/route-map'
import ChatScreen from '../Chatting/chat-screen'

const MyRidesScreenMain = () => {
    const RidesStack = createNativeStackNavigator()
    return (
        <RidesStack.Navigator
            screenOptions={{
                title: '',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#262a2d'
                }
            }}
        >
            <RidesStack.Screen
                name='Rides Screen'
                component={MyRidesScreen}
            />
            <RidesStack.Screen
                name='SearchResultExpanded'
                component={SearchResultExpanded}
            />
            <RidesStack.Screen
                name='Profile-Main'
                component={Profile}
            />
            <RidesStack.Screen
                name='Profile-Other'
                component={Profile}
            />
            <RidesStack.Screen
                name='SearchMap'
                component={MapViewScreen}
            />
            <RidesStack.Screen
                name='RouteMap'
                component={RouteMap}
            />
            <RidesStack.Screen
                name='Chat-Screen'
                component={ChatScreen}
            />
        </RidesStack.Navigator>
    )
}
export default MyRidesScreenMain