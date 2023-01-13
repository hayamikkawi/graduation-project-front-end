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
    const dummyData = [
        {
            "destination": "دوار المنارة، رام الله",
            "id": 17,
            "passengers": [
                { "id": 20, "name": "a", "pending": true, "profilePicture": 'none', "reservedSeats": 1, "rideId": 17, "userId": 31 },
                { "id": 21, "name": "b", "pending": true, "profilePicture": 'none', "reservedSeats": 1, "rideId": 17, "userId": 32 }
            ],
            "source": "نابلس، دوار الشهداء، ،نابلس"
        },
        {
            "destination": "دوار المنارة، رام الله",
            "id": 18,
            "passengers": [{ "id": 22, "name": "c", "pending": true, "profilePicture": 'none', "reservedSeats": 1, "rideId": 18, "userId": 31 }],
            "source": "نابلس، دوار الشهداء، ،نابلس"
        }

    ]

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
        // setRequests(dummyData)

    }, [])
    )

    const removeRequest = (id) => {
        const updatedRequests = requests.map(request => {
            return {
                ...request,
                passengers: request.passengers.filter(passenger => passenger.id !== id)
            }
        });
        setRequests(updatedRequests);
    }
    return (
        <ScrollView style={styles.root}>
            {
                requests.length == 0 ? <CustomHeader text={'No Requests Found.'} size={17} /> :
                    requests.map((request, index) => {
                        return request && request.passengers && request.passengers.map((passenger, index) => {
                            return <RequestCard request={request} passenger={passenger} key={passenger.id} navigation={navigation} removeRequest={removeRequest} />
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