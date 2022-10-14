import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomText = ({text, borderRight}) => {
  return (
    <View style= {[borderRight?{borderRightWidth: 1}:{}, styles.container]}>
      <Text style = {styles.text}>{text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        borderColor: '#1093c9'
    },
    text: {
        color:'#1093c9', 
        fontFamily :'kanyon-bold', 
        fontSize: 15, 
        paddingBottom: '5%', 
        paddingTop: '5%', 
        paddingRight: '2%', 
        paddingLeft: '2%'
    }
})
export default CustomText