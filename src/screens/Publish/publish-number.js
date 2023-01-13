import { View, Text, ScrollView, StyleSheet, Image, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../components/Header/header'
import Minus from '../../../assets/myIcons/minus.png'
import Plus from '../../../assets/myIcons/plus.png'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import CustomButton from '../../components/CustomButton'
import axios from 'axios'
import API_URL from '../../App_URL'
import * as SecureStore from 'expo-secure-store'
import SucceedModal from '../../components/Modals/succeed-modal'
import FailedModal from '../../components/Modals/failed-modal'

const PublishNumber = ({ navigation, route }) => {
    const [number, setNumber] = useState(3)
    const [instant, setInstant] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [errorModal, setErrorModal] = useState(false)

    const onPress = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        let data = {
            source: route.params.sourceDescription,
            sourceId: route.params.sourceId,
            destination: route.params.destDescription,
            destinationId: route.params.destId,
            date: route.params.date,
            time: route.params.time,
            middleSeatEmpty: route.params.onlyTwo,
            numberOfPassengers: number,
            bookingInstantly: instant,
            AC: route.params.ac,
            noSmoking: route.params.noSmoke,
            noPets: route.params.noPets,
            seatForDisabled: route.params.disabled,
            noChildren: route.params.noChildren,
            girlsOnly: route.params.girlsOnly,
            guysOnly: route.params.guysOnly,
            route: route.params.selectedRoute
        }
        axios.post(`${API_URL}/ride/publish`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            if (res.status === 201) {
                setModalVisible(true)
                navigation.navigate('Publish')
            }

        }).catch((err) => {
            if (err.response.status == 403) {
                console.log('oops')
                setErrorModal(true)
            }

        })
    }
    const increase = () => {
        if (number == 6) return
        setNumber(number + 1)
    }
    const decrease = () => {
        if (number == 1) return
        setNumber(number - 1)
    }
    return (
        <ScrollView style={styles.root}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Your Ride Was Published Successfully</Text>
                        <View style={styles.modalButtons}>
                            <CustomButton
                                style={styles.button}
                                text={'OK'}
                                width={'30%'}
                                onPress={
                                    () => {
                                        setModalVisible(false)
                                        navigation.navigate('Publish-Source')
                                    }
                                }
                            />
                        </View>

                    </View>
                </View>
            </Modal>
            <FailedModal
                modalVisible={errorModal}
                setModalVisible={setErrorModal}
                onPress={() => {
                    setErrorModal(false);
                }}
                message={'You have a ride at this time.'}
            />
            <CustomHeader text={'Ride Properties'} />
            <View>
                <CustomHeader
                    text={'How many passengers can you take?'}
                    textColor={'#1093c9'}
                    size={22}
                />
                <View style={styles.container}>
                    <Pressable onPress={decrease}>
                        <Image source={Minus} style={styles.icon} resizeMode="contain" />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> {number} </Text>
                    </View>
                    <Pressable onPress={increase}>
                        <Image source={Plus} style={styles.icon} resizeMode="contain" />
                    </Pressable>
                </View>
                <View style={styles.anotherContainer}>
                    <CustomHeader
                        text={'Reservation'}
                        textColor={'#1093c9'}
                        size={22}
                    />
                    <View style={styles.container}>
                        <Text style={styles.text2}>Allow instant reservation</Text>
                        <Checkbox
                            color={'#1093c9'}
                            style={styles.checkbox}
                            value={instant}
                            onValueChange={setInstant}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text={'Publish'}
                        onPress={onPress}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#262a2d'
    },
    text: {
        color: 'white',
        fontSize: 60,
        // fontFamily: 'kanyon-medium'
    },
    text2: {
        fontFamily: 'kanyon-medium',
        color: 'white',
        fontSize: 18
    },
    textContainer: {
        width: '50%',
        //borderWidth: 2,
        //borderColor: '#1093c9',
        //  marginLeft: '25%',
        //marginTop: '5%',
        // padding: '5%',
        alignItems: 'center',
        borderRadius: '50%',
    },
    container: {
        flexDirection: 'row',
        //borderWidth: 1,
        //borderColor: 'red',
        width: '90%',
        marginLeft: '5%',
        marginTop: '3%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        width: 40,
        height: 40,
        //borderWidth: 1,
        //borderColor: 'yellow'
    },
    anotherContainer: {
        //  width: '90%',
        marginTop: '20%',
    },
    checkbox: {
        width: 25,
        height: 25
    },
    buttonContainer: {
        width: '60%',
        margin: '20%',
        marginTop: '30%'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '80%',
        height: '30%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#1093c9',
        fontSize: 22,
        fontFamily: 'kanyon-bold'
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    button: {
        width: '20%'
    }

})
export default PublishNumber