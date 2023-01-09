import { View } from 'react-native'
import React from 'react'
import styles from './rides-styles.js'
import CustomHeader from '../../components/Header/header.js'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RidesAsPassenger from './rides-as-passenger.js';
import RidesAsDriver from './rides-as-driver.js';
import { useWindowDimensions } from 'react-native';
import RidesRequest from './rides-requests.js';

const MyRidesScreen = ({navigation}) => {
  const RideTabs = createMaterialTopTabNavigator()
  const { height } = useWindowDimensions()

  return (
    <View style={styles.root}>
      <View>
        <CustomHeader text={'My Rides'} size={25} />
      </View>
      <View style={{ flex: 1, height: height }}>
        <RideTabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color = '1093c9', size = 22 }) => {
              if (route.name === 'As Passenger') {
                return (
                  <Ionicons
                    name={'man'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'As Driver') {
                return (
                  <Ionicons
                    name={'speedometer'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name == 'Requests') {
                return (
                  <Ionicons
                    name={'paper-plane'}
                    size={size}
                    color={color}
                  />
                )
              }

            },
            tabBarActiveTintColor: '#1093ce',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#262a2d' },
            tabBarIndicatorStyle: { backgroundColor: '#1093ce' }

          })}

        >
          <RideTabs.Screen
            name={'As Passenger'}
            component={RidesAsPassenger}
          />
          <RideTabs.Screen
            name={'As Driver'}
            component={RidesAsDriver}
          />
          <RideTabs.Screen
            name={'Requests'}
            component={RidesRequest}
            navigation = {navigation}
          />
        </RideTabs.Navigator>
      </View>
    </View>
  )
}

export default MyRidesScreen