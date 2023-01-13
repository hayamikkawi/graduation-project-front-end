import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, numeric = false, onChangeText = null, color = 'black' }) => {
  return (
    <View style={[styles.container, { borderColor: color }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText ? onChangeText : setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'gray'}
        keyboardType={numeric ? 'numeric' : ''}
        selectionColor='#1093c9'
      />

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'rgba(52, 52, 52, 0.8)', 
    width: '90%',
    // height: 35, 
    border: '#a8a8a8',
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 20

  },
  input: {
    color: 'white',
    marginBottom: 10,
    fontSize: 17,
    // fontFamily: 'kanyon-medium', 
    fontFamily: 'Arial',
    lineHeight: 17
  }
})
export default CustomInput