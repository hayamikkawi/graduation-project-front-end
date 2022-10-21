import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/Header/header'
import DriverPic from '../../../assets/user/F38.jpg'
import ProfilePic from '../../components/ProfilePicture/profile-pic'
//icons 
import CarSeat from '../../../assets/myIcons/car-chair.png'
import NoSmoke from '../../../assets/myIcons/no-smoke.png'
import Female from '../../../assets/myIcons/female.png'
import Disabled from '../../../assets/myIcons/disabled.png'
import NoAnimal from '../../../assets/myIcons/no-pets.png'
import NoChildren from '../../../assets/myIcons/children.png'
import AC from '../../../assets/myIcons/air-conditioner.png'
import SearchResultCardInner from '../../components/SearchResultCard/search-result-card-inner';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText/custom-text';
import CustomButtonForm from '../../components/CustomButtonForm/custom-button-form';
import axios from 'axios';
import API_URL from '../../App_URL';
import * as SecureStore from 'expo-secure-store'

const SearchResultExpanded = ({route, navigation }) => {
    const [ride, setRide] = useState(route.params.ride)
    const [numberOfSeats, setNumberOfSeats] = useState(route.params.ride.availableSeats)
    const passengers = ride.passengers
    const onReservePressed = async () =>{
        const token = await SecureStore.getItemAsync('secureToken')
        console.log('reserve')
        axios.post(`${API_URL}/rides/reserve`, {
            id: ride.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
          }).then((res)=>{
            if(res.status == 200){

            } else if (res.status == 400){

            }
          }).catch((err)=>{
            console.log(err)
          })
    }
    console.log(ride.availableSeats)
    return (
        <ScrollView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.view}>
                    <CustomHeader text={'Ride info'} size={25} />
                    <SearchResultCardInner ride={ride} nextIcon={false} withDriver={false} navigation={navigation}/>
                </View>
                <View style={styles.view}>
                    <CustomHeader text={'Driver info'} size={25} />
                    <View style={styles.driverContainer}>
                        <ProfilePic source={DriverPic} radius={60} />
                        <Text style={styles.text}>{ride.driver.name}</Text>
                        <CustomButton text={'Visit'} width={'30%'} />
                    </View>
                </View>
                <View style={styles.view}>
                    <CustomHeader text={'Passengers'} size={25} />
                    {passengers.map((pass) => {
                        return (
                            <Pressable style={styles.driverContainer} key={pass.name}>
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
                        ride.properties.map((property) => {
                            return (<View style={styles.propContainer} key={property}>
                                <Text style={styles.text}>{property}</Text>
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
                    <View style={[styles.driverContainer, {margin: '5%'}]}>
                        <Text style={styles.text}>Allows instance reservation</Text>
                        {
                            ride.allowInstanceReservation ? <Ionicons name= 'checkmark-circle' color={'#80B362'} size={25} /> :
                             <Ionicons  name= 'close-circle' color={'#FF7276'} size={25}/>
                        }
                    </View>

                </View>
                <View>
                    <CustomButton text={'Reserve Now'}  onPress={onReservePressed}/>
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