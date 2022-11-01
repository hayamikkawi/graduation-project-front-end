import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/Header/header'
import ProfilePic from '../../components/ProfilePicture/profile-pic'
import SearchResultCardInner from '../../components/Cards/search-result-card-inner';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import API_URL from '../../App_URL';
import * as SecureStore from 'expo-secure-store'
import SucceedModal from '../../components/Modals/succeed-modal';
import { Buffer } from "buffer";

const SearchResultExpanded = ({ route, navigation }) => {
    const [ride, setRide] = useState(route.params.ride)
    const [numberOfSeats, setNumberOfSeats] = useState(ride.rideProperty.numberOfAvailableSeats)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFailVisible, setModalFailVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const passengers = ride.passengers
    var imageURL = ''
    const b = new Buffer.from(ride.user.profilePicture, 'binary').toString('base64')
    imageURL = 'data:image/jpeg;base64,' + b
    const properties_names = {
        'middleSeatEmpty': 'Only two passengers in the back seat',
        'noSmoking': 'Smoking not allowed', 'girlsOnly': 'Girls only', 'disabled': 'Disabled seat available',
        'noPets': 'Pets not allowed', 'noChildren': 'Children not allowed', 'AC': 'Air Conditioner'
    }
    console.log(ride)

    const onReservePressed = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        console.log('reserve')
        axios.post(`${API_URL}/ride/reserve`, {
            rideId: ride.rideProperty.rideId
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            console.log('result' + res.data)
            if (res.status == 200) {
                setNumberOfSeats(numberOfSeats - 1)
                setModalVisible(true)

            } else if (res.status == 400) {

            } else if (res.status == 403) {
                
            }
        }).catch((err) => {
            setModalFailVisible(true)
        })
    }
    return (
        <ScrollView style={styles.root}>
            <SucceedModal modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onPress={() => {
                    setModalVisible(false)
                    setButtonDisabled(true)
                }}
                message={!ride.rideProperty.bookingInstantly ? 'Your Reservation Request Has Been Sent' : 'Reserved Successfully'}
            />
            <SucceedModal modalVisible={modalFailVisible}
                setModalVisible={setModalFailVisible}
                onPress={() => {
                    setModalFailVisible(false)
                    setButtonDisabled(true)
                }}
                message={'Your already reserved in this ride'}
            />
            <View style={styles.container}>
                <View style={styles.view}>
                    <CustomHeader text={'Ride info'} size={25} />
                    <SearchResultCardInner ride={ride} nextIcon={false} withDriver={false} navigation={navigation} />
                </View>
                <View style={styles.view}>
                    <CustomHeader text={'Driver info'} size={25} />
                    <View style={styles.driverContainer}>
                        <ProfilePic source={{ uri: imageURL }} radius={60} />
                        <Text style={styles.text}>{ride.user && ride.user.username}</Text>
                        <CustomButton text={'Visit'} width={'30%'} />
                    </View>
                </View>
                <View style={styles.view}>
                    <CustomHeader text={'Passengers'} size={25} />
                    {passengers.map((pass) => {
                        return (
                            <Pressable style={styles.driverContainer} key={pass.userId}>
                                {/* <ProfilePic source={DriverPic} radius={60} /> */}
                                <Text style={styles.text}>{pass.name}</Text>
                                <Ionicons name='caret-forward' color={'#1093c9'} size={25} />
                            </Pressable>
                        )
                    })}
                </View>
                <View style={styles.view}>
                    <CustomHeader text={'Properties'} size={25} />
                    {
                        Object.keys(ride.rideProperty).map((property) => {
                            if (ride.rideProperty && ride.rideProperty[property] === true && property != 'bookingInstantly')
                                return (<View style={styles.propContainer} key={property}>
                                    <Text style={styles.text}>{properties_names[property]}</Text>
                                </View>)
                        })
                    }
                </View>
                <View style={styles.view} >
                    <CustomHeader text={'Available Seats'} size={25} />
                    <View style={styles.centerContainer}>
                        <Text style={[styles.text, { fontSize: 40 }]}>{numberOfSeats}</Text>
                    </View>

                </View>
                <View >
                    <View style={[styles.driverContainer, { margin: '5%' }]}>
                        <Text style={styles.text}>Allows instance reservation</Text>
                        {
                            ride.rideProperty.bookingInstantly ? <Ionicons name='checkmark-circle' color={'#80B362'} size={25} /> :
                                <Ionicons name='close-circle' color={'#FF7276'} size={25} />
                        }
                    </View>

                </View>
                <View>
                    <CustomButton text={'Reserve Now'} onPress={onReservePressed} disabled={buttonDisabled} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#262a2d',
        padding: '3%'
    },
    container: {
        width: '100%',
        borderWidth: 2,
        padding: '3%',
        borderRadius: '10%',
        backgroundColor: '#303438',
        borderColor: '#1093c9',
        marginVertical: '4%'
    },
    driverContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3%'
    },
    propContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        // borderColor: 'yellow', 
        // borderWidth: 2, 
        padding: '3%'
    },
    centerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',
        marginVertical: '2%'

    },
    text: {
        fontFamily: 'kanyon-medium',
        fontSize: 17,
        color: 'white'
    },
    view: {
        borderBottomColor: '#1093c9',
        borderBottomWidth: 1
    }
})
export default SearchResultExpanded