import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePic from '../ProfilePicture/profile-pic';
import CarSeat from '../../../assets/myIcons/car-chair.png'
import NoSmoke from '../../../assets/myIcons/no-smoke.png'
import Female from '../../../assets/myIcons/female.png'
import Disabled from '../../../assets/myIcons/disabled.png'
import NoAnimal from '../../../assets/myIcons/no-pets.png'
import NoChildren from '../../../assets/myIcons/children.png'
import AC from '../../../assets/myIcons/air-conditioner.png'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Buffer } from "buffer";
import CustomText from '../CustomText/custom-text';

const SearchResultCardInner = ({ ride, nextIcon = true, withDriver = true, navigation, asPassenger = false, asDriver = false }) => {
    var imageURL = ''
    if (!asDriver) {
        // try {
        const b = new Buffer.from(ride.user.profilePicture, 'binary').toString('base64')
        imageURL = 'data:image/jpeg;base64,' + b
        // } catch (err) {
        //     console.log(err)
        // }
    }
    const icons = {
        'noSmoking': NoSmoke, 'girlsOnly': Female,
        'seatForDisabled': Disabled, 'noPets': NoAnimal, 'noChildren': NoChildren,
        'AC': AC, 'middleSeatEmpty': CarSeat
    }
    const onViewRoutePress =() =>{
        //console.log(ride?.rideProperty?.route)
        navigation.navigate('RouteMap', {
            selectedRoute : ride?.rideProperty?.route, 
            origin: {
                latitude: ride.sourceLatitude, 
                longitude: ride.sourceLongitude
            }
        })
    }
    return (
        <View>
            {nextIcon &&
                <View>
                    <View style={styles.container}>
                        <CustomText text={'From:'} size={18} />
                        <Text style={styles.text}>{ride.source}</Text>
                    </View>
                    <View style={styles.container}>
                        <CustomText text={'To:'} size={18} />
                        <Text style={styles.text}>{ride.destination}</Text>
                    </View>
                </View>
            }
            {(asPassenger || asDriver) &&
                <View style={styles.container}>
                    <CustomText text={'On:'} size={18} />
                    <Text style={styles.text}>{ride.date}</Text>
                </View>
            }
            {!nextIcon &&
                <View>
                    <Pressable style={styles.container} onPress={() => {
                        navigation.navigate('SearchMap',
                            {
                                latitude: ride.sourceLatitude,
                                longitude: ride.sourceLongitude,
                                name: ride.source
                            })
                    }}>
                        <CustomText text={'From:'} size={18} />
                        <View style={styles.flex}>
                            <Text style={styles.text}>{ride.source}</Text>
                            <Ionicons name='caret-forward' size={25} color={'#1093c9'} />
                        </View>
                    </Pressable>
                    <Pressable style={styles.container} onPress={() => {
                        navigation.navigate('SearchMap',
                            {
                                latitude: ride.destinationLatitude,
                                longitude: ride.destinationLongitude,
                                name: ride.destination
                            })
                    }}>
                        <CustomText text={'To:'} size={18} />
                        <View style={styles.flex}>
                            <Text style={styles.text}>{ride.destination}</Text>
                            <Ionicons name='caret-forward' size={25} color={'#1093c9'} />
                        </View>
                    </Pressable>
                    <Pressable style={styles.flex} onPress={onViewRoutePress}>
                        <Text style={[styles.text, {textDecorationLine: 'underline'}]}>View Route</Text>
                    </Pressable>
                </View>
            }
            <View style={styles.container}>
                <CustomText text={'At:'} size={18} />
                <Text style={styles.text}>{ride.time}</Text>
            </View>
            {(withDriver && !asDriver) &&
                <View style={styles.container}>
                    {
                        ride.user && <ProfilePic source={{ uri: imageURL }} radius={60} />
                    }
                    <Text style={styles.text}>{ride.user && ride.user.username}</Text>
                </View>
            }
            {nextIcon &&
                <View style={styles.bottomContainer}>
                    <View style={styles.iconsContainer}>
                        {Object.keys(icons).map((property) => {
                            if (ride.rideProperty && ride.rideProperty[property])
                                return <Image source={icons[property]} style={styles.icon} resizeMode="contain" key={icons[property]} />
                        })}
                    </View>
                    <View>
                        <Ionicons name='caret-forward' size={30} color={'#1093c9'} />
                    </View>

                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        paddingVertical: '1%', 
        flexWrap: 'wrap'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        padding: '3%'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'kanyon-medium',
        fontSize: 17,
        color: 'white'
    },
    icon: {
        width: 25,
        height: 25,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})
export default SearchResultCardInner