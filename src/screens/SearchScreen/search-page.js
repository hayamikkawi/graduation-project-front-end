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
import ErrorMessage from '../../components/ErrorMessage/error-message'

const SearchPage = ({ navigation }) => {
    const { height } = useWindowDimensions()
    const [source, setSource] = useState('')
    const [sourceId, setSourceId] = useState('')
    const [destination, setDestination] = useState('')
    const [destinationId, setDestinationId] = useState('')
    const [numberOfPassengers, setNumberOfPassengers] = useState(0)
    const [date, setDate] = useState(new Date())
    const [isError, setIsError] = useState(false)
    const [range, setRange] = useState(5)
    var error = false

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
    const onChangeRange = (newVal) => {
        setRange(newVal)
    }
    const setDateVal = (event, newDate) => {
        setDate(newDate)
    }
    const validate = () => {
        if (source.trim() == '' || destination.trim() == '' || numberOfPassengers == 0) {
            setIsError(true)
            console.log('error')
            error = true
        } else {
            setIsError(false)
        }
    }
    const onSearchClicked = async () => {
        validate()
        if (error) return
        else {
            const token = await SecureStore.getItemAsync('secureToken')
            console.log('number of passengers')
            console.log(parseInt(numberOfPassengers))
            axios.post(`${API_URL}/ride/search`, {
                sourceId,
                destinationId,
                numberOfPassengers,
                date: date, 
                range: range*1000
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                console.log(res.status)
                if (res.status == 400) {

                } else if (res.status == 200) {
                    
                    const data = res.data
                    var expectedData = {'distance': 0, 'time': 0}
                    if(data.length > 0){
                         expectedData = res.data.slice(-1)[0]
                        // console.log(expectedData)
                        data.pop()
                    } 
                    console.log(data)
                    navigation.navigate('SearchResult', {data: data, numberOfPassengers: numberOfPassengers, expectedData: expectedData})
                }

            }).catch((err) => {
                if(err.response && err.response.status == 404){
                    const data = []
                    const expectedData = {'dictance': '', 'time': ''}
                    navigation.navigate('SearchResult', {data: data, numberOfPassengers: numberOfPassengers, expectedData: expectedData })
                } 
            })
        }
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
                        <View style={styles.inputContainer}>
                            <Ionicons name="search" size={25} color={"gray"} />
                            <CustomInput
                                placeholder={'Searching Range - Default 5 km'}
                                numeric
                                onChangeText={onChangeRange}
                                value={range}
                            />
                        </View>
                        <View style={styles.customInputContainer}>
                            <Ionicons name="calendar-outline" size={25} color={"gray"} />
                            <View style={styles.datePicker}>
                                <DateTimePicker
                                    value={date}
                                    accentColor='#1093c9'
                                    minimumDate={new Date()}
                                    onChange={setDateVal}
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
                {isError ? <ErrorMessage message={'Please fill all fields.'} /> : null}
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
        marginTop: '-15%',
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
        marginTop: '-10%',
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
        //marginBottom: '10%',
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