import React, { useState } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Switch, TextInput } from 'react-native'
import CustomText from '../../components/CustomText/custom-text'
import CustomButton from '../../components/CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles'
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import API_URL from '../../App_URL';
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import * as SecureStore from 'expo-secure-store'

const SignUpScreen2 = ({ navigation, route }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [gender, setGender] = useState('male')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [expoPushToken, setExpoPushToken] = useState()

    const registerForPushNotificationsAsync = async () => {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            ///console.log(token);
            setExpoPushToken(token)
            await SecureStore.setItemAsync('expoToken', token)
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const setDateVal = (event, newDate) => {
        setDateOfBirth(newDate)
    }
    const goBack = () => {
        navigation.goBack()
    }
    const onNextPressed = () => {
        navigation.navigate('Sign Up Driver', {
            username: route.params.username,
            password: route.params.password,
            email: route.params.email,
            mobileNumber: route.params.mobileNumber,
            gender: gender,
            dateOfBirth: dateOfBirth, 
            pushToken: expoPushToken
        })
    }
    const onSignupPressed = async () => {
        await registerForPushNotificationsAsync()
        const expoToken = await SecureStore.getItemAsync('expoToken')
        axios.post(`${API_URL}/users/signup`, {
            username: route.params.username,
            password: route.params.password,
            email: route.params.email,
            mobileNumber: route.params.mobileNumber,
            role: "user",
            gender: gender,
            dateOfBirth: dateOfBirth, 
            pushToken: expoToken
        }).then(async (res) => {
            if (res.status !== 201) {
                console.log(res.data.message)
            }
            const jsonRes = res.data.token
            const user = res.data.user

            let token = jsonRes
            await SecureStore.setItemAsync('secureToken', token);
            await SecureStore.setItemAsync('user', JSON.stringify(user))
            await registerForPushNotificationsAsync()
            //await registerExpoToken()
            navigation.navigate("Home")
        }).catch((err) => {
            console.error(err)
        })
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <ScrollView style={styles.root}>
                <View style={styles.outerContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>
                <View style={styles.dateContainer}>
                    <CustomText text={"Gender"} style={styles.text} />
                    <View style={styles.flex}>
                        <View>
                            <RadioButton
                                value="male"
                                status={gender == 'male' ? 'checked' : 'unchecked'}
                                onPress={() => { setGender('male') }}
                                color='#1093c9'
                            />
                        </View>
                        <Text style={styles.whiteText}>Male</Text>
                    </View>
                    <View style={styles.flex}>
                        <View>
                            <RadioButton
                                value="female"
                                label="Female"
                                status={gender == 'female' ? 'checked' : 'unchecked'}
                                onPress={() => { setGender('female') }}
                                color='#1093c9'
                            />
                        </View>
                        <Text style={styles.whiteText}>Female</Text>
                    </View>

                </View>

                <View style={styles.dateContainer}>
                    <CustomText text={"Date of Birth"} style={styles.text} />
                    <DateTimePicker
                        value={dateOfBirth}
                        accentColor='#1093c9'
                        textColor='white'
                        maximumDate={new Date()}
                        onChange={setDateVal}
                        display='spinner'
                    />
                </View>

                <View style={styles.toggleContainer}>
                    <CustomText text={"Do you want to be a driver?"} />
                    <Switch
                        trackColor={{ false: "#767577", true: "#1093c9" }}
                        thumbColor={isEnabled ? "#f3f4f3" : "#f3f4f3"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={styles.toggle}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton type='TERTIARY' icon='arrow-back' width='30%' onPress={goBack} />
                    {
                        isEnabled ?
                            <CustomButton
                                text={"Next"}
                                onPress={onNextPressed}
                                width='70%'
                            />
                            :
                            <CustomButton
                                text={"Sign Up"}
                                onPress={onSignupPressed}
                                width='70%'
                            />
                    }
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default SignUpScreen2