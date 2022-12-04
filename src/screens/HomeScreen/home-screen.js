import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreenMain from '../SearchScreenMain/search-screen-main';
import PublishScreenMain from '../Publish/publish-screen-main';
import ProfileScreenMain from '../ProfileScreen/profile-screen-main';
import MyRidesScreenMain from '../MyRides/my-rides-screen-main';
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import ChatScreenMain from '../Chatting/chatting-screen-main';
// import registerForPushNotificationsAsync from '../../functions/register-for-push-notifications';

const Tab = createBottomTabNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const HomeScreen = ({ navigation, route }) => {
  const [notification, setNotification] = useState()
  const _handleNotification = receivedNotification => {

    //let { toScreen } = notification.data;
    //navigation.navigation(toScreen)
    console.log('receivedNotification:')
    console.log(receivedNotification)
    setNotification(receivedNotification)
  };

  const _handleNotificationResponse = response => {
    console.log(response);
  };
  useEffect(() => {
    Notifications.addNotificationReceivedListener(_handleNotification);
    Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);

  }, [])

  return (
    //<NavigationContainer>
    <Tab.Navigator
      style={styles.tabNav}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Search') {
            iconName = "search-outline"
          } else if (route.name === 'Publish') {
            iconName = "add-circle-outline"
          } else if (route.name === 'Profile') {
            iconName = "person"
          } else if (route.name === 'My Rides') {
            iconName = "car-sport"
          } else if (route.name === 'Chat') {
            iconName = "chatbubble-ellipses"
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1093ce',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#262a2d',
        tabBarInactiveBackgroundColor: '#262a2d',
        headerShown: false
      })}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreenMain}
      />
      <Tab.Screen
        name="Publish"
        component={PublishScreenMain}
      />
      <Tab.Screen
        name="My Rides"
        component={MyRidesScreenMain}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenMain}
        initialParams={{ setIsSigned: route.params.setIsSigned }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreenMain}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  tabNav: {
    backgroundColor: "black"
  }
})
export default HomeScreen