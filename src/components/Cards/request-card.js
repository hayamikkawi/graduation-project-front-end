import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ProfilePic from '../ProfilePicture/profile-pic';
import Avatar from '../../../assets/user/F38.jpg'
import axios from 'axios';
import API_URL from '../../App_URL';
import * as SecureStore from 'expo-secure-store'
import { Buffer } from "buffer";

const RequestCard = ({ navigation, request, removeRequest, passenger }) => {
    var imageURL = ''
    const b = new Buffer.from(passenger.profilePicture, 'binary').toString('base64')
    imageURL = 'data:image/jpeg;base64,' + b

    const onAcceptPressed = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/ride/requests/accept`, {
            passengerId: passenger.userId,
            rideId: request.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            if (res.status == 200) {
                removeRequest(passenger.id)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const onDenyPressed = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/ride/requests/deny`, {
            passengerId: passenger.userId,
            rideId: request.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            if (res.status == 200) {
                removeRequest(passenger.id)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const onProfilePressed = () => {
        navigation.navigate('Profile-Other', {
            other: true,
            id: passenger.userId,
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.picTextContainer}>
                <Pressable onPress={onProfilePressed}>
                    <ProfilePic radius={60} source={{ uri: imageURL }} style={styles.customPP} />
                </Pressable>
                <Text style={styles.text}><Text style={[{ fontWeight: 'bold' }, { color: 'white' }]}>{passenger.name} requests to reserve {passenger.reservedSeats} seat(s) in your ride </Text>  from {request.source} to {request.destination} on {request.date}
                </Text>
            </View>
            <View style={styles.iconsContainer}>
                <Pressable onPress={onAcceptPressed}>
                    <Ionicons name='checkmark-circle' size={30} color={"#80B362"} />
                </Pressable>
                <Pressable onPress={onDenyPressed}>
                    <Ionicons name='close-circle' size={30} color={"#d11a2a"} />
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: '5%',
        paddingHorizontal: '2%',
        borderBottomWidth: '.5px',
        borderBottomColor: 'gray',
        flexWrap: 'wrap',
        // justifyContent: 'row-start'
    },
    iconsContainer: {
        width: '20%',
        // borderColor: 'red',
        // borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    picTextContainer: {
        flexDirection: 'row',
        justifyContent: 'row-start',
        width: '80%',
        alignItems: 'center',
        // borderColor: 'yellow',
        // borderWidth: 2, 

    },
    text: {
        fontSize: 17,
        color: 'gray',
        fontFamily: 'Arial',
        fontWeight: 'bolder',
        width: '70%',
        lineHeight: 23

    },
    customPP: {
        borderWidth: 1,
        borderColor: 'green',
    }
})
export default RequestCard