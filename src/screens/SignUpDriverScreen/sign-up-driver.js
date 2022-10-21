import { View, Text, ScrollView, Button, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomText from '../../components/CustomText/custom-text'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage/error-message';
import CustomButtonForm from '../../components/CustomButtonForm/custom-button-form';
import CustomButton from '../../components/CustomButton/custom-button';
import * as SecureStore from 'expo-secure-store'

const API_URL = require('../../App_URL')
const SignUpDriver = ({ route, navigation }) => {
  const [driverLicense, setDriverLicense] = useState(null)
  const [carLicense, setCarLicense] = useState(null)
  const [carInsurance, setCarInsurance] = useState(null)
  const [hasPermession, setHasPermession] = useState(null)
  const [valid, setValid] = useState(true)
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
  const uploadImage = (file, token) => {
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
    //const token = await SecureStore.getItemAsync('secureToken')
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
  const onLoggedIn = async (token) => {
    await SecureStore.setItemAsync('secureToken', token);
    const storedToken = await SecureStore.getItemAsync('secureToken')
  }
  const onSignupPressed = () => {
    //1- validate (the second page (nth is empty))
    //2- Send Sign Up data 
    //3- Upload the files (3)
    validate()
    if (!isValid) return
    axios.post(`${API_URL}/users/signup`, {
      username: route.params.username,
      password: route.params.password,
      email: route.params.email,
      mobileNumber: route.params.mobileNumber,
      role:"driver"
    }).then(async (res) => {
      if (res.status !== 201) {
        console.log(res.data)
        console.log(res.status)
      } else {
        console.log(res.data)
        console.log('user added')
        onLoggedIn(res.data.token);
        const token = res.data.token
        console.log("token:" + token)
        //setIsError(false);
        //setError(jsonRes.message);
        //navigation.navigate('Home')
        uploadImage('driverLicense', token)
        uploadImage('carLicense', token)
        uploadImage('carInsurance', token)
        if(flag == true) {
          await SecureStore.setItemAsync('role', 'driver')
          navigation.navigate('Home')
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const selectFile = async (file) => {
    try {
      console.log('hey')
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //aspect: [4, 3], 
        quality: 1
      });
      //console.log('res : ' + res.file);
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
  };
  if (hasPermession === false) {
    return <ErrorMessage>Permession Denied</ErrorMessage>
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <ScrollView style={styles.root}>
        <View style={styles.customContainer}>
          <Text style={styles.title}>Sign Up</Text>
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
        <CustomButton text={'Sign Up'} onPress={onSignupPressed} />
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
    //paddingTop:'5%', 
    alignContent: 'center',
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