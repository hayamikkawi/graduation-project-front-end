import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './rides-styles'
import { useFocusEffect } from '@react-navigation/native'
import SearchResultCard from '../../components/Cards/search-result-card'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import API_URL from '../../App_URL'
import CustomHeader from '../../components/Header/header'

const RidesAsDriver = ({ navigation, route }) => {
    const [rides, setRides] = useState([])

    useFocusEffect(React.useCallback(() => {
        async function fetchRides() {
            const token = await SecureStore.getItemAsync('secureToken')
            axios.get(`${API_URL}/myRides`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                setRides(res.data.asDriver)
            }).catch((err) => {
                if (err.response.status == 404) {

                }
            })
        }
        fetchRides()
    }, [])
    )
    return (
        <ScrollView style={styles.root}>

            {rides.length == 0 ? <CustomHeader text={'No Rides Found.'} size={17} /> :
                rides.map((ride) => {
                    return (
                        <SearchResultCard
                            ride={ride}
                            key={ride.id}
                            navigation={navigation}
                            asPassenger={false}
                            asDriver={true}
                        // numberOfPassengers={numberOfPassengersToReserve}
                        />
                    )
                })
            }
        </ScrollView>
    )
}

export default RidesAsDriver
