import { ScrollView } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import CustomHeader from '../../components/Header/header'
import RequestCard from '../../components/Cards/request-card'
import { useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import styles from './rides-styles'
import axios from 'axios'
import API_URL from '../../App_URL'

const RidesRequest = ({ navigation }) => {

    const [requests, setRequests] = useState([])
    // const dummyData = [{
    //     id: 12,
    //     username: "Aya",
    //     rideId: 1,
    //     from: 'Nablus',
    //     to: 'Ramallah',
    //     reservedSeats: 2
    // }, {
    //     id: 1,
    //     username: "Haya",
    //     rideId: 1,
    //     from: 'Nablus',
    //     to: 'Ramallah',
    //     numOfSeats: 1
    // }]

    useFocusEffect(React.useCallback(() => {
        async function fetchRequests() {
            const token = await SecureStore.getItemAsync('secureToken')
            axios.get(`${API_URL}/rides/requests`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                setRequests(res.data)
            }).catch((err) => {
                if (err.response.status == 404) {

                }
                console.log(err)
            })
        }
        fetchRequests()
       
    }, [])
    )

    const removeRequest = (rideId, passenderId) => {
        const newElements = requests.filter((request) => {
            return request.id != rideId || request.passenger.userId != passenderId
        })
        setRequests(newElements)
    }
    return (
        <ScrollView style={styles.root}>
            {
                requests.length == 0 ? <CustomHeader text={'No Requests Found.'} size={17} /> :
                    requests.map((request, index) => {
                        console.log(request)
                        return request.passengers.map((passenger) => {
                            return <RequestCard request={request} passenger={passenger} key={index} navigation={navigation} removeRequest={removeRequest} />
                        })
                    })
                // requests.map((request, index) => {
                //     return <RequestCard request={request} key={index} index={index} navigation={navigation} removeRequest={removeRequest} />
                // })
            }
        </ScrollView>
    )
}

export default RidesRequest