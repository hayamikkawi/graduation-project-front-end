import { View, Text, Image, useWindowDimensions, StyleSheet, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import Transport from '../../../assets/transport4.png'
import CustomInput from '../../components/CustomInput'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react'
import axios from 'axios';
import API_URL from '../../App_URL';
import * as SecureStore from 'expo-secure-store'

const SearchPage = ({ navigation }) => {
    const { height } = useWindowDimensions()
    const [source, setSource] = useState('')
    const [sourceId, setSourceId] = useState('')
    const [destination, setDestination] = useState('')
    const [destinationId, setDestinationId] = useState('')
    const [numberOfPassengers, setNumberOfPassengers] = useState(0)
    const [date, setDate] = useState(new Date())
    const changeDest = (dest, destId) => {
        setDestination(dest)
        setDestinationId(destId)
    }
    const changeSource = (source, sourceId) => {
        setSource(source)
        setSourceId(sourceId)
    }
    const onChangeText = (newVal) => {
        if (newVal < 0 || newVal > 5) {
            return
        } else {
            setNumberOfPassengers(newVal)
        }
    }
    const setDateVal = (newDate) => {
        setDate(newDate)
    }
    const onSearchClicked = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/rides/search`, {
            sourceId,
            destinationId,
            numberOfPassengers,
            date
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            const dummyData = [{
                id: 1,
                source: 'Nablus - 5',
                sourceLatitude: 32.2227, 
                sourceLongitude: 35.2621, 
                distancefromSource: 5.0,
                destination: 'Ramallah -1',
                destinationLatitude: 31.9038, 
                destinationLongitude: 35.2034, 
                distanceFromDestination: 1.0,
                time: '08:00',
                driver: {
                    id: 1,
                    name: 'jana mikkawi', 
                   // profilePicture: driverPP
                },
                passengers: [{ name: 'Haya Mikkawi' }, { name: 'Aya Mikkawi' }]
                ,
                properties: ['girlsOnly', 'noSmoking', 'seatForDisabled'],
                availableSeats: 5,
                allowInstanceReservation: true
            }, {
                id: 2,
                source: 'Nablus - 3',
                sourceLatitude: 32.2227, 
                sourceLongitude: 35.2621,
                distancefromSource: 3.0,  
                destination: 'Ramallah - 4',
                destinationLatitude: 31.9038, 
                destinationLongitude: 35.2034,
                distanceFromDestination: 4.0, 
                time: '13:00',
                driver: {
                    name: 'jana'
                },
                passengers: [],
                properties: ['noPets', 'noChildren', 'AC'],
                availableSeats: 5,
                allowInstanceReservation: false
            }, 
            {
                id: 3,
                source: ' جامعة النجاح الوطنية الحرم القديم في نابلس',
                sourceLatitude: 32.2227, 
                sourceLongitude: 35.2621,
                distancefromSource: 0.5,  
                destination: 'Ramallah-far - 11',
                destinationLatitude: 31.9038, 
                destinationLongitude: 35.2034,
                distanceFromDestination: 11.2, 
                time: '17:30',
                driver: {
                    name: 'jana'
                },
                passengers: [],
                properties: ['girlsOnly', 'noPets', 'middleSeatEmpty'],
                availableSeats: 5,
                allowInstanceReservation: false
            }, {
                id: 4,
                source: 'Nablus - 14',
                sourceLatitude: 32.2227, 
                sourceLongitude: 35.2621,
                distancefromSource: 14.0,  
                destination: 'Ramallah - 0',
                destinationLatitude: 31.9038, 
                destinationLongitude: 35.2034,
                distanceFromDestination: 0.7, 
                time: '10:00',
                driver: {
                    name: 'jana'
                },
                passengers: [],
                properties: ['noPets', 'noChildren', 'AC'],
                availableSeats: 5,
                allowInstanceReservation: false
            }, {
                id: 5,
                source: 'Nablus - 3.5',
                sourceLatitude: 32.2227, 
                sourceLongitude: 35.2621,
                distancefromSource: 3.5,  
                destination: 'Ramallah - 19',
                destinationLatitude: 31.9038, 
                destinationLongitude: 35.2034,
                distanceFromDestination : 19.1, 
                time: '07:30',
                driver: {
                    name: 'jana'
                },
                passengers: [],
                properties: ['girlsOnly', 'noPets', 'noChildren', 'AC'],
                availableSeats: 5,
                allowInstanceReservation: false
            }
            ]
            navigation.navigate('SearchResult', dummyData)
            if (res.status == 400) {

            } else if (res.status == 404) {

            } else if (res.status == 200) {
                //const realResults = res.data
            }

        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <ScrollView style={styles.outContainer}>
                <View style={styles.root}>
                    <Image source={Transport} resizeMode="contain" style={[styles.image, { height: .5 * height }]} />
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="location-outline" size={25} color={"gray"} />
                            <Pressable
                                style={styles.customButton}
                                onPress={() => {
                                    navigation.navigate('Search2', {
                                        data: "source",
                                        changeSource: changeSource
                                    })
                                }}
                            >
                                <Text style={[{ fontSize: 17, color: 'gray', fontFamily: 'kanyon-medium' }, { color: source ? 'white' : 'gray' }]}>
                                    {source ? source : "Leaving from"}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="location-outline" size={25} color={"gray"} />
                            <Pressable
                                style={styles.customButton}
                                onPress={() => {
                                    navigation.navigate("Search2", {
                                        data: "destination",
                                        changeDest: changeDest
                                    })
                                }}>
                                <Text style={[{ fontSize: 17, color: 'gray', fontFamily: 'kanyon-medium' }, , { color: destination ? 'white' : 'gray' }]}>
                                    {destination ? destination : "Going to"}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={25} color={"gray"} />
                            <CustomInput
                                placeholder={'Number of passengers'}
                                numeric
                                onChangeText={onChangeText}
                                value={numberOfPassengers}
                            />
                        </View>
                        <View style={styles.customInputContainer}>
                            <Ionicons name="calendar-outline" size={25} color={"gray"} />
                            <View style={styles.datePicker}>
                                <DateTimePicker
                                    value={date}
                                    accentColor='#1093c9'
                                    minimumDate={new Date()}
                                    onChange={() => { setDateVal }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <Pressable
                    style={styles.button}
                    onPress={onSearchClicked}
                >
                    <Text style={{ color: 'white', fontFamily: 'kanyon-bold', fontSize: 17 }}>Search</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#262a2d',
        flex: 1,
        alignContent: 'center'

    },
    container: {
        width: '80%',
        marginTop: '-5%',
        borderTopLeftRadius: '20%',
        borderTopRightRadius: '20%',
        backgroundColor: 'rgba(26,29,29, 0.8)',
        padding: '5%',
        alignContent: 'center',
        marginHorizontal: '10%',
    },
    outContainer: {
        backgroundColor: '#262a2d',
        width: '100%',
        height: '100%',
        fontFamily: 'kanyon-normal'
    },
    inputContainer: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },
    customInputContainer: {
        marginBottom: '5%'
    },
    datePicker: {
        // backgroundColor:'red', 
        marginTop: '-10%',
        // marginRight: '30%'
    },
    image: {
        width: '110%',
        marginLeft: '-5%',
        marginTop: '-10%'

    },
    button: {
        backgroundColor: '#1093c9',
        padding: '5%',
        width: '80%',
        marginLeft: '10%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomLeftRadius: '20%',
        borderBottomRightRadius: '20%'
    },
    customButton: {
        //backgroundColor: "#262a2d",
        width: '90%',
        marginVertical: 5,
        marginBottom: 20,
        marginLeft: 5,
        border: '#a8a8a8',
        paddingBottom: '4%',
        borderBottomWidth: 1,
    }
})
export default SearchPage