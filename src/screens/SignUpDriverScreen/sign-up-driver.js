import { View, Text, ScrollView, Button, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomText from '../../components/CustomText/custom-text'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage/error-message';
import CustomButtonForm from '../../components/CustomButtonForm/custom-button-form';
import CustomButton from '../../components/CustomButton/custom-button';
import * as SecureStore from 'expo-secure-store'
import SucceedModal from '../../components/Modals/succeed-modal';
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

const API_URL = require('../../App_URL')
const SignUpDriver = ({ route, navigation }) => {
  const [driverLicense, setDriverLicense] = useState(null)
  const [carLicense, setCarLicense] = useState(null)
  const [carInsurance, setCarInsurance] = useState(null)
  const [hasPermession, setHasPermession] = useState(null)
  const [valid, setValid] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [expoPushToken, setExpoPushToken] = useState()
  const { roleChange } = route.params

  let isValid = false
  var flag = true

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasPermession(galleryStatus.status === 'granted')
    })();
  }, [])
  const validate = () => {
    if (driverLicense == null || carLicense == null || carInsurance == null) {
      setValid(false)
    } else {
      isValid = true
      setValid(true)
    }
  }
  const uploadImage = async (file, token) => {
    let fileToUpload
    let url
    if (file == 'driverLicense') {
      console.log('driverLicense')
      url = 'uploadDrivingLicense'
      fileToUpload = driverLicense
    } else if (file == 'carLicense') {
      url = 'uploadCarLicense'
      fileToUpload = carLicense
    } else if (file == 'carInsurance') {
      url = 'uploadCarInsurance'
      fileToUpload = carInsurance
    }
    const data = new FormData()
    data.append('filename', file)
    console.log(fileToUpload.uri)
    data.append('file', {
      uri: fileToUpload.uri,
      type: fileToUpload.type,
      name: fileToUpload.fileName
    })
    axios.post(`${API_URL}/users/${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
      }

    }).then((res) => {
      flag = true
      console.log(res.status)
    }).catch((err) => {
      flag = false
      console.log(err)
    })

  }
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
  }
  const onLoggedIn = async (token) => {
    await SecureStore.setItemAsync('secureToken', token);
  }
  const onSignupPressed = async() => {
    validate()
    if (!isValid) return
    await registerForPushNotificationsAsync()
    const expoToken = await SecureStore.getItemAsync('expoToken')
    axios.post(`${API_URL}/users/signup`, {
      username: route.params.username,
      password: route.params.password,
      email: route.params.email,
      mobileNumber: route.params.mobileNumber,
      role: "driver",
      gender: route.params.gender,
      dateOfBirth: route.params.dateOfBirth, 
      pushToken: expoToken
    }).then(async (res) => {
      if (res.status !== 201) {
        console.log(res.data)
        console.log(res.status)
      } else {
        onLoggedIn(res.data.token);
        const token = res.data.token
        uploadImage('driverLicense', token)
        uploadImage('carLicense', token)
        uploadImage('carInsurance', token)
        if (flag == true) {
          const user = res.data.user
          await SecureStore.setItemAsync('user', JSON.stringify(user))
          navigation.navigate('Home')
        }
      }
    }).catch((err) => {
      if (err.response.status == 400) {
        setErrorMessage('You already signed up')
        setError(true)
      }
      console.log(err)
    })
  }
  const onBecomeDriverPressed = async () => {
    validate()
    if (!isValid) return
    const token = await SecureStore.getItemAsync('secureToken')
    axios.patch(`${API_URL}/me/becomeDriver`, {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(async (res) => {
      console.log(res)
      if (res.status == 200) {
        uploadImage('driverLicense', token)
        uploadImage('carLicense', token)
        uploadImage('carInsurance', token)
        const user = await SecureStore.getItemAsync('user')
        const newUser = JSON.parse(user)
        newUser.role = 'driver'
        await SecureStore.setItemAsync('user', JSON.stringify(newUser))
        setSuccess(true)
      }
    }).catch((err) => {
      console.log(err)
      setSuccess(false)
    })
  }
  const selectFile = async (file) => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      });
      if (file == 'driverLicense') {
        setDriverLicense(res);
      } else if (file == 'carLicense') {
        setCarLicense(res);
      } else if (file == 'carInsurance') {
        setCarInsurance(res);
      }

    } catch (err) {
      if (file == 'driverLicense') {
        setDriverLicense(null);
      } else if (file == carLicense) {
        setCarLicense(null);
      } else if (file == carInsurance) {
        setCarInsurance(null);
      }
      if (res.cancelled) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  const goBack = () => {
    navigation.goBack()
  }
  if (hasPermession === false) {
    return <ErrorMessage>Permession Denied</ErrorMessage>
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <ScrollView style={styles.root}>
        <View style={styles.outerContainer}>
          <SucceedModal
            modalVisible={success}
            setModalVisible={setSuccess}
            message='You became a driver'
            onPress={() => {
              setSuccess(false)
              navigation.navigate('Publish-Source')
            }}
          />
          <View style={styles.customContainer}>
            {roleChange ?
              <Text style={[styles.title, { fontSize: 22 }]}>Become A Driver</Text> :
              <Text style={styles.title}>Sign Up</Text>}
          </View>
          <View style={styles.container}>
            <CustomText text={"Driving \n License"} borderRight={true} style={styles.text} />
            {driverLicense != null ? (
              <Text style={styles.textStyle}>
                {driverLicense.fileName ? driverLicense.fileName : ''}
                {'\n'}
                {driverLicense.fileSize ? driverLicense.fileSize + ' Bytes' : ''}
              </Text>
            ) : null}
            <CustomButtonForm onPress={() => { selectFile('driverLicense') }} text={'Pick a File'} />
          </View>
          <View style={styles.container}>
            <CustomText text={"Car \n License"} borderRight={true} style={styles.text} />
            {carLicense != null ? (
              <Text style={styles.textStyle}>
                {carLicense.fileName ? carLicense.fileName : ''}
              </Text>
            ) : null}
            <CustomButtonForm onPress={() => { selectFile('carLicense') }} text={'Pick a File'} />
          </View>
          <View style={styles.container}>
            <CustomText text={"Car \n Insurance"} borderRight={true} style={styles.text} />
            {carInsurance != null ? (
              <Text style={styles.textStyle}>
                {carInsurance.fileName ? carInsurance.fileName : ''}
              </Text>
            ) : null}
            <CustomButtonForm onPress={() => { selectFile('carInsurance') }} text={'Pick a File'} />
          </View>
          {valid ? '' : <ErrorMessage message={'Please Fill All Fields.'} />}
          <View style={styles.buttonContainer}>
            <CustomButton type='TERTIARY' icon='arrow-back' width='30%' onPress={goBack} />
            {roleChange ?
              <CustomButton text={'Become A Driver'} onPress={onBecomeDriverPressed} width='70%' /> :
              <CustomButton text={'Sign Up'} onPress={onSignupPressed} width='70%' />}
          </View>
          {error && <ErrorMessage message={errorMessage} />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#262a2d',
    width: '100%',
    height: '100%',
    fontFamily: 'kanyon-normal',
    padding: '10%',
    alignContent: 'center',
  },
  outerContainer: {
    marginVertical: '10%'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
    width: '90%',
    borderColor: '#1093c9',
    borderWidth: 1,
    borderRadius: '10%'
  },
  customContainer: {
    marginTop: 0,
    marginBottom: '0%',
    marginLeft: '5%',
    width: '90%',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontFamily: 'kanyon-bold',
    fontSize: 30,

  },
  text: {
    width: '50%'
  },
  textStyle: {
    marginTop: 10,
    color: 'white'
  }

})
export default SignUpDriver