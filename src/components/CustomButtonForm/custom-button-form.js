import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import Upload from '../../../assets/upload3.png'

const CustomButtonForm = ({ text, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={Upload} style={styles.icon} resizeMode="contain" />
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1093c9',
    color: 'white',
    padding: '3%',
    paddingTop: '5%',
    borderTopRightRadius: '9%',
    borderBottomRightRadius: '9%',

  },
  text: {
    color: 'white',
    fontFamily: 'kanyon-bold',
    fontSize: 15
  },
  icon: {
    width: 40,
    height: 20,
  }
})
export default CustomButtonForm