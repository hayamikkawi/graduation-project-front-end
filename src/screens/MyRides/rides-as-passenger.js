import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './rides-styles'
import { useFocusEffect } from '@react-navigation/native'
import SearchResultCard from '../../components/Cards/search-result-card'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import API_URL from '../../App_URL'
import CustomHeader from '../../components/Header/header.js'

const RidesAsPassenger = ({navigation, route}) => {
    const [rides, setRides] = useState([])
    const dummyData = [
        {
            "id": 1,
            "source": "An-Najah National University - Old Campus, Nablus",
            "destination": "Ramallah",
            "time": "08:00:00",
            "sourceLatitude": 32.2204,
            "sourceLongitude": 35.2446,
            "destinationLatitude": 31.905,
            "destinationLongitude": 35.2043,
            "rideProperty": {
                "id": 1,
                "middleSeatEmpty": false,
                "numberOfPassengers": 3,
                "bookingInstantly": true,
                "AC": true,
                "noSmoking": false,
                "noPets": false,
                "seatForDisabled": false,
                "noChildren": false,
                "girlsOnly": true,
                "numberOfAvailableSeats": 1,
                "rideId": 1
            },
            "user": {
                "id": 8,
                "username": "Dana",
                "profilePicture": {
                    "type": "Buffer",
                    "data": []
                }
            },
            "passengers": [
                {
                    "userId": 9,
                    "name": "Haya"
                }
            ],
            "sourcesDistance": 0,
            "destinationsDistance": 0
        }
    ]
    useFocusEffect(React.useCallback(() => {
        async function fetchRides() {
          const token = await SecureStore.getItemAsync('secureToken')
          axios.get(`${API_URL}/myRides`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then((res)=>{
             setRides(res.data.asPassenger)
          }).catch((err)=>{
            if(err.response.status == 404){
    
            }
          })
        }
        fetchRides()
       // setRides(dummyData)
      }, [])
      )
    return (
        <ScrollView style={styles.root}>

            {   rides.length == 0 ? <CustomHeader text={'No Rides Found.'} size={17}/>:
                rides.map((ride) => {
                    return (
                    <SearchResultCard
                        ride={ride}
                        key={ride.id}
                        navigation={navigation}
                        asPassenger = {true}
                        asDriver = {false}
                       // numberOfPassengers={numberOfPassengersToReserve}
                    />
                    )
                })
            }
        </ScrollView>
    )
}
export default RidesAsPassenger

