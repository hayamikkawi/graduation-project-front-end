import { ScrollView, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import CustomButton from '../../components/CustomButton'
import Unauthorized from '../../../assets/myIcons/401.png'

const UnauthorizedDriver = () => {
    return (
        <ScrollView style={styles.root}>
            <CustomHeader
                    text={'You are not currently a valid driver'}
                />
            <Image 
                source={Unauthorized}
                style={styles.image} 
                resizeMode="contain"
            />
            
            <View style={styles.container}>
                
            <CustomButton
                    text={'Become a driver'}
                    width={'60%'}
                    style={styles.btn}
                />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#262a2d',
        width: '100%',
        height: '100%'
    },
    container: {
        width: '90%',
        //height: '50%',
        marginHorizontal: '5%',
        //marginVertical: '5%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // borderWidth: 1, 
        // borderColor: 'yellow'

    }, 
    image: {
        width: '100%', 
        height: '250%', 
        // borderWidth: 1, 
        // borderColor: 'yellow'
    }, 
    // btn: {
    //     marginHorizontal: '20%'
    // }
})
export default UnauthorizedDriver