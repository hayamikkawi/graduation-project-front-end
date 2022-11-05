import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from '../FirstScreen/first-screen';
import SignInScreen from '../SigInScreen/signin-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchPage from '../SearchScreen/search-page';
import SearchScreenMain from '../SearchScreenMain/search-screen-main';
import PublishScreenMain from '../Publish/publish-screen-main';
import ProfileScreenMain from '../ProfileScreen/profile-screen-main';

const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation, route }) => {
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
          } else if(route.name === 'Profile'){
            iconName = "person"
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
        name="Profile"
        component={ProfileScreenMain}
        initialParams={{ setIsSigned: route.params.setIsSigned }}
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