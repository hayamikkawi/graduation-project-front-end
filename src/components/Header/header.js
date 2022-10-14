import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomHeader = ({text, size = 30, textColor = "white"}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, {fontSize: size, color: textColor}]}>{text}</Text>
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
        width: '90%', 
        margin: '5%'
    }
})
export default CustomHeader