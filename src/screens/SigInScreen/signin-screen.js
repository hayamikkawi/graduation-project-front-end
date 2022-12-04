import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import Transport from '../../../assets/transport.png'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import * as SecureStore from 'expo-secure-store'
import ErrorMessage from '../../components/ErrorMessage/error-message'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import axios from 'axios'

const API_URL = require('../../App_URL')

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [expoPushToken, setExpoPushToken] = useState()
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')
    const [valid, setValid] = useState(true)
    let isValidated = true
    const { height } = useWindowDimensions()

    registerForPushNotificationsAsync = async () => {
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
          console.log(token);
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
    };
    const validate = () => {
        if (username.trim() == '' || password.trim() == '') {
            console.log('Invalid')
            isValidated = false
            setValid(false)
        } else {
            isValidated = true
            setValid(true)
        }
    }
    const onLoggedIn = async (token) => {
        await SecureStore.setItemAsync('secureToken', token);
    }
    const onLoginPressed = async() => {
        validate()
        if (!isValidated) {
            setError('Please Fill all Fields!')
            return
        }
        await registerForPushNotificationsAsync()
        const payload = {
            username,
            password,
            pushToken: expoPushToken
        };
        fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(async res => {
                try {
                    if (res.status != 200) {
                        setIsError(true);
                        setError("Incorrect username or password");
                    } else {
                        
                        const jsonRes = await res.json();
                        onLoggedIn(jsonRes.token);
                        setIsError(false);
                        setError(jsonRes.message);
                        const user = jsonRes.user
                        await SecureStore.setItemAsync('user', JSON.stringify(user))
                        navigation.navigate('Home')
                    }

                } catch (err) {
                    console.log('err')
                    console.log(err);
                };
            })
            .catch(err => {
                console.log('err')
                console.log(JSON.stringify(err));
            });
    }
    const onForgotPasswordPressed = () => {
        console.warn('forget')
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.root}>
                    <Image source={Transport} style={[styles.image, { height: height * 0.6 }]} resizeMode="contain" />
                    <View style={styles.loginContainer}>
                        <View style={styles.inputContainer}>
                            <Ionicon name={"person-outline"} size={25} color={"gray"} />
                            <CustomInput
                                placeholder={'Username'}
                                value={username}
                                setValue={setUsername}
                                onChangeText={setUsername}
                                secureTextEntry={false}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicon name={"lock-closed-outline"} size={25} color={"gray"} />
                            <CustomInput
                                placeholder={'Password'}
                                value={password}
                                setValue={setPassword}
                                secureTextEntry={true}
                                onChangeText={setPassword}
                            />
                        </View>
                        <CustomButton
                            text="Log in"
                            onPress={onLoginPressed}
                        />
                        <CustomButton
                            text="I Forgot my password"
                            onPress={onForgotPasswordPressed}
                            type='TERTIARY'
                        />
                        {!valid ? <ErrorMessage message={"Please Fill All Fields."} /> : null}
                        {isError ? <ErrorMessage message={error} /> : null}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: '#262a2d',
            width: '100%',
            height: '100%',
            fontFamily: 'kanyon-normal'
        },
        root: {
            alignItems: 'center',
            marginTop: '5%'
        },
        inputContainer: {
            flexDirection: 'row'
        },
        logo: {
            width: '70%',
            maxWidth: 300,
            maxHeight: 100,
        },
        image: {
            width: '110%',
            maxHeight: 700,
        },
        loginContainer: {
            width: '80%',
            marginTop: -100,
            borderRadius: '20%',
            backgroundColor: 'rgba(26,29,29, 0.8)',
            padding: '5%',
            alignContent: 'center'
        }
    }
)
export default SignInScreen