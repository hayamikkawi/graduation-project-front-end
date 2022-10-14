import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type= "PRIMARY", bgcolor, fgcolor, disabled = false, width = '90%'}) => {
  return (
    <Pressable 
        disabled = {disabled}
        onPress = {onPress} 
        style = {[
            styles.container,
            styles[`container_${type}`], 
            bgcolor? {backgroundColor: bgcolor}:{}, 
            width? {width: width}: '90%'
            ]
        }
    >
      <Text style = {[
            styles.text,
            styles[`text_${type}`], 
            fgcolor? {color: fgcolor}: {}
            ]}
        >{text}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create(
    {
        container: {
            width: '90%', 
            padding: 15,
            marginVertical: 10,
            marginLeft: '5%',  
            alignItems: 'center', 
            borderRadius: '50%'
        }, 
        container_PRIMARY: {
            backgroundColor: '#1093c9'
        },
        container_TERTIARY:{
            
        },
        text_TERTIARY:{
            color: 'white', 
            fontFamily:'kanyon-medium'
        },
        text: {
            fontFamily:'kanyon-bold',
            color: 'white', 
            fontSize: '17'
        }   
    }
)

export default CustomButton