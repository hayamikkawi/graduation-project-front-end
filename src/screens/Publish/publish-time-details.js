import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import DateTimePicker, { RNDateTimePicker } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton/custom-button';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TimePicker } from 'react-native-simple-time-picker';

const PublishTimeDetails = ({ navigation, route }) => {
    //const [time, setTime] = useState(new Date("8:00"))
    const [selectedHours, setSelectedHours] = useState(8);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [amPm, setAmPm] = useState('am')
    const [timeVal, setTimeVal] = useState('')
    const onPress = () => {
       // console.log(`${selectedHours}:${selectedMinutes} ${amPm}`)
        navigation.navigate('Publish-Properties', {
            sourceDescription: route.params.sourceDescription,
            sourceId: route.params.sourceId,
            destDescription: route.params.destDescription,
            destId: route.params.destId,
            date: route.params.date,
            selectedRoute: route.params.selectedRoute, 
            time: amPm.toLowerCase() == 'pm'? `${(selectedHours + 12).toLocaleString('en-GB', {
                minimumIntegerDigits: 2,
                })}:${selectedMinutes.toLocaleString('en-GB', {
                minimumIntegerDigits: 2
            })}` : `${selectedHours.toLocaleString('en-GB',{ minimumIntegerDigits : 2})}:${selectedMinutes.toLocaleString('en-GB', {minimumIntegerDigits: 2})}`
            // ${amPm}`
        })
    }
    return (
        <ScrollView style={styles.root}>
            <CustomHeader text={"Time Details"} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Ionicon
                        name='time-outline'
                        color={'#1093c9'}
                        size={25}
                        style={styles.icon}
                    />
                    <CustomHeader
                        text={"What time are you picking passengers?"}
                        size={22}
                        textColor={"#1093c9"}
                    />
                </View>
                <TimePicker
                    defaultValue={
                        {
                            hours: 8,
                            minutes: 0,
                            ampm: 'am'
                        }
                    }
                    selectedHours={selectedHours}
                    //initial Hourse value
                    selectedMinutes={selectedMinutes}
                    //initial Minutes value
                    textColor='white'
                    isAmpm={true}
                    onChange={(newValue) => {
                        setSelectedHours(newValue.hours);
                        console.log(newValue.hours)
                        setSelectedMinutes(newValue.minutes);
                        setAmPm(newValue.ampm)
                    }}
                    zeroPadding={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    text={"Next"}
                    onPress={onPress}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#262a2d',
        width: '100%',
        height: '100%'
    },
    container: {
        width: '80%',
        marginLeft: '10%',
        height: '50%',
        marginTop: '10%'
    },
    headerContainer: {
        flexDirection: 'row',
        alignContent: 'flex-start'
    },
    icon: {
        height: '50%',
        marginTop: 15
    },
    buttonContainer: {
        width: '60%',
        marginLeft: '20%',
        marginTop: '30%'
    }
})
export default PublishTimeDetails