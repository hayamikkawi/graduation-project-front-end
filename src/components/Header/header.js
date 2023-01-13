import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomHeader = ({ text, size = 30, textColor = "white", width = '90%' }) => {
  return (
    <View style={[styles.headerContainer, { width: width }]}>
      <Text style={[styles.headerText, { fontSize: size, color: textColor }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'kanyon-bold',
    //fontSize: 30, 
    color: 'white'
  },
  headerContainer: {
    margin: '5%'
  }
})
export default CustomHeader