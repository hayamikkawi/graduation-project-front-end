import { View, Text, ScrollView, Switch, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../../components/CustomText/custom-text';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage/error-message';
import * as SecureStore from 'expo-secure-store'
import styles from './styles.js'

const API_URL = require('../../App_URL')

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [valid, setValid] = useState(true)
  const [error, setError] = useState('')

  let isValid = false
  const validateEmail = (email) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true
    }
    return false
  }
  const validate = () => {
    if (username.trim() == '' || password.trim() == '' || confirm.trim() == ''
      || email.trim() == '' || mobileNumber.trim() == '') {
      setValid(false)
      setError('Please Fill All Fields.')
    } else if (password != confirm) {
      setValid(false)
      setError('Passwords Do Not Match.')
    } else if (!validateEmail(email)) {
      setValid(false)
      setError('Invalid Email Address.')
    } else {
      setValid(true)
      isValid = true
    }
  }
  const onNextPressed = () => {
    validate()
    if (! isValid) return
    else {
      navigation.navigate('Sign Up2', {
        username: username,
        password: password,
        email: email,
        mobileNumber: mobileNumber
      })
    }

  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <ScrollView style={styles.root}>
        <View style={styles.outerContainer}>
          <View style={styles.customContainer}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.container}>
            <CustomText text={"Username"} borderRight={true} style={styles.text} />
            <TextInput
              style={styles.temp}
              onChangeText={setUsername}
              setValue={setUsername}
            />
          </View>
          <View style={styles.container}>
            <CustomText text={"Password"} borderRight={true} />
            <TextInput
              style={styles.temp}
              secureTextEntry={true}
              onChangeText={setPassword}
              setValue={setPassword}
            />
          </View>
          <View style={styles.container}>
            <CustomText text={"Confirm \nPassword"} borderRight={true} />
            <TextInput
              style={styles.temp}
              secureTextEntry={true}
              onChangeText={setConfirm}
              setValue={setConfirm}
            />
          </View>
          <View style={styles.container}>
            <CustomText text={"   Email \n   Address"} borderRight={true} />
            <TextInput
              style={styles.temp}
              onChangeText={setEmail}
              setValue={setEmail}
            />
          </View>
          <View style={styles.container}>
            <CustomText text={"Mobile \nNumber"} borderRight={true} />
            <TextInput
              style={styles.temp}
              keyboardType="numeric"
              onChangeText={setMobileNumber}
              setValue={setMobileNumber}
            />
          </View>

          {
            valid ? null : <ErrorMessage message={error} style={styles.container} />
          }
          <View>
            <CustomButton
              text={"Next"}
              onPress={onNextPressed}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default SignUpScreen