import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import NoResult from '../../../assets/myIcons/no-result.png'
import { useWindowDimensions } from 'react-native'

const NoResults = ({ text }) => {
    const {height} = useWindowDimensions()
    return (
        <View style={styles.root}>
            <Image source={NoResult} resizeMode={'contain'} style={[styles.img, {height: .5*height}]}/>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        marginHorizontal: '3%'
    }, 
    text: {
        fontSize: 24, 
        fontFamily: 'kanyon-medium', 
        color: 'white', 
    }, 
    root: {
        alignItems: 'center'
    }
})
export default NoResults