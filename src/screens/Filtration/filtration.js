import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import Checkbox from 'expo-checkbox'
import CustomButton from '../../components/CustomButton'

const Filtration = ({ navigation, route }) => {
    const properties = ['onlyTwo', 'noSmoke', 'girlsOnly', 'disabled', 'noPets', 'noChildren', 'ac']
    const [propertiesVal, setPropertiesVal] = useState(properties.map((pro) => {
        return {
            key: pro,
            value: false
        }
    }))
    const [closestToOrigin, setClosestToOrigin] = useState(false)
    const [closestToDest, setClosestToDest] = useState(false)
    const [onlyTwo, setOnlyTwo] = useState(false)
    const [noSmoke, setNoSmoke] = useState(false)
    const [girlsOnly, setGirlsOnly] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [noPets, setNoPets] = useState(false)
    const [noChildren, setNoChildren] = useState(false)
    const [ac, setAc] = useState(false)
    const [before8, setBefore8] = useState(false)
    const [between, setBetween] = useState(false)
    const [after4, setAfter4] = useState(false)
    const [guysOnly, setGuysOnly] = useState(false)

    const setClosestToOriginTrue = (val) => {
        setClosestToOrigin(val)
        if (val == true)
            setClosestToDest(!val)
    }
    const setClosestToDestTrue = (val) => {
        setClosestToDest(val)
        if (val == true)
            setClosestToOrigin(!val)
    }
    const setBefore8True = (val) => {
        setBefore8(val)
        if (val == true) {
            setBetween(!val)
            setAfter4(!val)
        }
    }
    const setBetweenTrue = (val) => {
        setBetween(val)
        if (val == true) {
            setBefore8(!val)
            setAfter4(!val)
        }
    }
    const setAfter4True = (val) => {
        if (val == true) {
            setBefore8(!val)
            setBetween(!val)
        }
        setAfter4(val)
    }
    const onFilterPressed = () => {
        const { rides } = route.params
        console.log(rides)
        var newRides = rides.filter((ride) => {
            if (ride.rideProperty) {
                const properties = Object.keys(ride.rideProperty).filter((property)=>{
                    return ride.rideProperty[property]
                })
                return (
                    (
                        (!onlyTwo || (onlyTwo && properties.includes('middleSeatEmpty'))) &&
                        (!noSmoke || (noSmoke && properties.includes('noSmoking'))) &&
                        (!girlsOnly || (girlsOnly && properties.includes('girlsOnly'))) &&
                        (!disabled || (disabled && properties.includes('seatForDisabled'))) &&
                        (!noPets || (noPets && properties.includes('noPets'))) &&
                        (!noChildren || (noChildren && properties.includes('noChildren'))) &&
                        (!ac || (ac && properties.includes('AC'))) &&
                        (!guysOnly || (guysOnly && properties.includes('guysOnly')))
                    )
                )
            }
        })

        if (before8) {
            newRides = newRides.filter((ride) => {
                return (ride.time <= "08:00:00")
            })
        } else if (between) {
            newRides = newRides = newRides.filter((ride) => {
                const t = ride.time

                return (t > "08:00:00" && t <= "17:00:00")
            })
        } else if (after4) {
            newRides = newRides.filter((ride) => {
                return (ride.time > "17:00:00")
            })
        }

        if (closestToOrigin) {
            newRides.sort((ride1, ride2) => { return (ride1.sourcesDistance - ride2.sourcesDistance) })
        } else if (closestToDest) {
            newRides.sort((ride1, ride2) => { return (ride1.destinationsDistance - ride2.destinationsDistance) })
        }

        route.params.setRides(newRides)
        navigation.goBack()
    }
    return (
        <ScrollView style={styles.root} >
            <CustomHeader text={'Filter'} />
            <View>
                <View>
                    <CustomHeader text={'Sort by'} size={20} />
                    <View style={styles.propContainer}>
                        <View style={styles.flex}>
                            <Ionicon name='location' color={'white'} size={25} />
                            <Text style={styles.text}>Closest to origin</Text>
                        </View>
                        <Checkbox
                            value={closestToOrigin}
                            onValueChange={setClosestToOriginTrue}
                            color={'#1093c9'}
                            style={styles.checkbox}
                        />
                    </View>
                    <View style={styles.propContainer}>
                        <View style={styles.flex}>
                            <Ionicon name='location' color={'white'} size={25} />
                            <Text style={styles.text}>Closest to destination</Text>
                        </View>
                        <Checkbox
                            value={closestToDest}
                            onValueChange={setClosestToDestTrue}
                            color={'#1093c9'}
                            style={styles.checkbox}
                        />
                    </View>
                </View>
                <View>
                    <CustomHeader text={'Properties'} size={20} />
                    <View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Only two passengers in the back seat.</Text>
                            <Checkbox
                                value={onlyTwo}
                                onValueChange={setOnlyTwo}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Smoking not allowed</Text>
                            <Checkbox
                                value={noSmoke}
                                onValueChange={setNoSmoke}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Girls only</Text>
                            <Checkbox
                                value={girlsOnly}
                                onValueChange={setGirlsOnly}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Guys Only </Text>
                            <Checkbox
                                value={guysOnly}
                                onValueChange={setGuysOnly}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Disabled seat available</Text>
                            <Checkbox
                                value={disabled}
                                onValueChange={setDisabled}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Pets not allowed</Text>
                            <Checkbox
                                value={noPets}
                                onValueChange={setNoPets}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Children not allowed</Text>
                            <Checkbox
                                value={noChildren}
                                onValueChange={setNoChildren}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}> Air Conditioner</Text>
                            <Checkbox
                                value={ac}
                                onValueChange={setAc}
                                style={styles.checkbox}
                                color={'#1093c9'}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <CustomHeader text={'Time'} size={20} />
                    <View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}>8:00 AM or before</Text>
                            <Checkbox
                                value={before8}
                                color={'#1093c9'}
                                onValueChange={setBefore8True}
                                style={styles.checkbox}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}>8:00 to 5:00 PM</Text>
                            <Checkbox
                                value={between}
                                color={'#1093c9'}
                                onValueChange={setBetweenTrue}
                                style={styles.checkbox}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text style={styles.text}>After 5:00 PM</Text>
                            <Checkbox
                                value={after4}
                                color={'#1093c9'}
                                onValueChange={setAfter4True}
                                style={styles.checkbox}
                            />
                        </View>
                    </View>
                </View>
                <CustomButton text={'Filter'} onPress={onFilterPressed} />
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
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: '3%',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'kanyon-medium',
        marginLeft: '3%'
    },
    radioButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: '50%',
        width: 35,
        height: 35
    },
    propContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //borderWidth: 1, 
        marginBottom: '5%',
        width: '100%'

    },
    checkbox: {
        marginLeft: 8,
        margin: 8,
        width: 20,
        height: 20
    }
})
export default Filtration