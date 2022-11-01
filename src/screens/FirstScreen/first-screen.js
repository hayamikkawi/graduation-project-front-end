import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Transport from '../../../assets/transport.png'
import CustomButton from '../../components/CustomButton'
const FirstScreen = ({ navigation }) => {
  const { height } = useWindowDimensions()
  const loginPressed = () => {
    navigation.navigate('Log in')
  }
  const signupPressed = () => {
    navigation.navigate('Sign Up')
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.root}>
        <Image source={Transport} style={[styles.image, { height: 0.6 * height }]} resizeMode="contain" />
        <Text style={styles.text}>Your pick of rides at {'\n'}low prices</Text>
        <CustomButton
          text="Sign up"
          onPress={signupPressed}
        />
        <CustomButton
          type='TERTIARY'
          text="Log in"
          fgcolor={"#1093c9"}
          onPress={loginPressed}
        />
      </View>
    </ScrollView>

  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262a2d',
    width: '100%',
    height: '100%',
    fontFamily: 'kanyon-normal'
  },
  root: {
    marginTop: '10%'
  },
  image: {
    width: '110%',
    //maxWidth: 2000,
    maxHeight: 700,
    marginLeft: -20
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: '5%',
    fontFamily: 'kanyon-bold',
    textAlign: 'center'
  }
})
export default FirstScreen