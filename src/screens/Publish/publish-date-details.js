import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import DateTimePicker, { RNDateTimePicker } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton/custom-button';
import Ionicon from 'react-native-vector-icons/Ionicons'

const PublishDateDetails = ({navigation, route}) => {
    const [date, setDate] = useState(new Date())
    const setDateVal = (event, dateVal) => {
        setDate(dateVal)
    }
    const onPress= () => {
        console.log(date.toDateString())
        navigation.navigate('Publish-Time-Details', {
            sourceDescription: route.params.sourceDescription, 
            sourceId: route.params.sourceId, 
            destDescription: route.params.destDescription, 
            destId: route.params.destId, 
            date: date.toDateString(), 
            selectedRoute: route.params.selectedRoute
        })
    }
    return (
        <ScrollView style={styles.root}>
            <CustomHeader text={"Time Details"} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Ionicon
                        name='calendar-outline'
                        color={'#1093c9'}
                        size={25}
                        style={styles.icon}
                    />
                    <CustomHeader
                        text={"When are you leaving?"}
                        size={22}
                        textColor={"#1093c9"}
                    />
                </View>
                <DateTimePicker
                    value={date}
                    accentColor='#1093c9'
                    minimumDate={new Date()}
                    display='spinner'
                    textColor='white'
                    onChange={setDateVal}
                    mode = 'date'
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
        marginTop: 10
    }, 
    buttonContainer: {
        width: '60%',
        marginLeft: '20%',
        marginTop: '30%'
    }
})
export default PublishDateDetails