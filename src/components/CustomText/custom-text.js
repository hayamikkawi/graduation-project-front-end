import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomText = ({ text, borderRight, size = 15, color = '#1093c9', borderBottom = false }) => {
  return (
    <View style={[
      borderRight ? { borderRightWidth: 1 } : {},
      borderBottom ? { borderBottomWidth: 1 } : {},
      styles.container
      ]}>
      <Text style={[styles.text, {fontSize : size}, {color: color}]}>{text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderColor: '#1093c9'
  },
  text: {
    color: '#1093c9',
    fontFamily: 'kanyon-bold',
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingRight: '2%',
    paddingLeft: '2%'
  }
})
export default CustomText