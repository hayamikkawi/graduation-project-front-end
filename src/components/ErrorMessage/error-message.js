import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <View>
      <Text style = {styles.errorText}>{message}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    errorText: {
        color: 'red', 
        fontFamily: 'kanyon-bold', 
        fontSize: 15, 
        marginLeft:'10%'
    }
})
export default ErrorMessage