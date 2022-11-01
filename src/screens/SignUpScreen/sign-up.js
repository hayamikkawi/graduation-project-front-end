import { View, Text, ScrollView, Switch, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import CustomText from '../../components/CustomText/custom-text';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage/error-message';
import * as SecureStore from 'expo-secure-store' 

const API_URL = require('../../App_URL')
const SignUpScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [valid, setValid] = useState(true)
  const [error, setError] = useState('')

  let isValid = false
  const validateEmail = (email) =>{
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)){
      return true
    } 
    return false
  }
  const validate = ()=>{
      if(username.trim() == '' || password.trim() == '' || confirm.trim() == ''
         || email.trim() == ''|| mobileNumber.trim() == ''){
            setValid(false)
            console.log('Please Fill All Fields.')
            setError('Please Fill All Fields.')
            setValid(false)
         } else if(password != confirm){
            setValid(false)
            console.log('Passwords Do Not Match.')
            setError('Passwords Do Not Match.')
         } else if (! validateEmail(email)){
            setValid(false)
            console.log('Invalid Email Address.')
            setError('Invalid Email Address.')
         } else{
            setValid(true)
            isValid = true
         }
  }
  const onSignupPressed = async() => {
      validate()
      if(! isValid) return
      axios.post(`${API_URL}/users/signup`, {
          username,
          password, 
          email, 
          mobileNumber,
          role:"user"
      }).then(async(res) =>{
        if(res.status !== 201){
          console.log(res.data.message)
        }
        console.log(res.data)
        console.log(res.status)
        //save token and move to home page 
        //add saving token 
        const jsonRes = res.data.token
        const user = res.data.user

        let token = jsonRes
        await SecureStore.setItemAsync('secureToken', token);
        console.log(user)
        await SecureStore.setItemAsync('user',  JSON.stringify(user))
        navigation.navigate("Home")
      }).catch((err) =>{
        console.error(err)
      })
  }
  const onNextPressed = () =>{
    //validate()
    //if(! valid) return 
    navigation.navigate('Sign Up Driver', {
      username: username, 
      password: password, 
      email: email,
      mobileNumber: mobileNumber
    })
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex: 1}}>
        <ScrollView style = {styles.root}>
        <View style= {styles.customContainer}>
          <Text style = {styles.title}>Sign Up</Text>
        </View>
        <View style = {styles.container}>
          <CustomText text={"Username"} borderRight={true} style={styles.text}/>
          <TextInput 
            style= {styles.temp} 
            onChangeText={setUsername}
            setValue= {setUsername}
          />
        </View>
        <View style = {styles.container}>
          <CustomText text={"Password"} borderRight={true}/>
          <TextInput 
            style= {styles.temp} 
            secureTextEntry = {true}
            onChangeText={setPassword}
            setValue= {setPassword}
          />
        </View>
        <View style = {styles.container}>
          <CustomText text={"Confirm \nPassword"} borderRight={true}/>
          <TextInput 
            style= {styles.temp} 
            secureTextEntry = {true}
            onChangeText={setConfirm}
            setValue= {setConfirm}  
          />
        </View>
        <View style = {styles.container}>
          <CustomText text={"   Email \n   Address"} borderRight={true}/>
          <TextInput 
            style= {styles.temp}
            onChangeText={setEmail}
            setValue= {setEmail} 
          />
        </View>
        <View style = {styles.container}>
          <CustomText text={"Mobile \nNumber"} borderRight={true}/>
          <TextInput 
            style= {styles.temp}  
            keyboardType="numeric"
            onChangeText={setMobileNumber}
            setValue= {setMobileNumber} 
          />
        </View>
        <View style = {styles.toggleContainer}>
          <CustomText text={"Do you want to be a driver?"}/>
          <Switch
            trackColor={{ false: "#767577", true: "#1093c9" }}
            thumbColor={isEnabled ? "#f3f4f3" : "#f3f4f3"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style = {styles.toggle}
          />
        </View>
        {
          valid? null: <ErrorMessage message={error} style={styles.container}/>
        }
        {
          isEnabled? 
          <View>
            <CustomButton
              text={"Next"}
              onPress = {onNextPressed}
            />
          </View>: 
          <View>
          <CustomButton
            text={"Sign Up"}
            onPress= {onSignupPressed}
          />
        </View>
      }
      
    </ScrollView>
  
    </KeyboardAvoidingView>
  )  
}
const styles = StyleSheet.create({
  root:{
    backgroundColor: '#262a2d', 
    width: '100%',
    height: '100%', 
    fontFamily:'kanyon-normal', 
    padding : '10%',
    //paddingTop:'5%', 
    alignContent: 'center', 
  }, 
  container:{
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: '5%', 
    width: '90%', 
    borderColor: '#1093c9', 
    borderWidth: 1, 
    borderRadius: '10%'
    //paddingTop: '5%',
    //paddingBottom: '5%'
  }, 
  customContainer:{
    marginTop: 0, 
    marginBottom: '0%', 
    marginLeft: '5%', 
    width: '90%',
  },
  toggleContainer:{
    width: '90%',
    margin: '5%',
    marginBottom:'3%', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  temp: {
    width: '65%', 
    height: '100%', 
    fontSize: 17, 
    color: 'white'
  }, 
  title:{
    color: 'white', 
    fontFamily: 'kanyon-bold', 
    fontSize: 30, 
    
  }, 
  text:{
    width: '50%'
  }, 
  toggle:{
    marginTop: '3%'
  }
})
export default SignUpScreen