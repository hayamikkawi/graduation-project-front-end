import { ScrollView, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import CustomButton from '../../components/CustomButton'
import Unauthorized from '../../../assets/myIcons/401.png'

const UnauthorizedDriver = () => {
    return (
        <ScrollView style={styles.root}>
            <View style={styles.upcontainer}>
                <CustomHeader
                    text={'You are not currently a valid driver'}
                />
                <Image
                    source={Unauthorized}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
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
        height: '100%',
        // padding:'25%'
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
        // borderColor: 'blue', 

    },
    image: {
        width: '100%',
        height: '200%', 
        marginTop:'-50%', 
        // borderWidth: 2, 
        // borderColor: 'red'
       // height: '250%',

    },
    upcontainer:{
        width: '90%', 
        height: '200%',
        // borderColor:'yellow', 
        // borderWidth: 1, 
        marginVertical: '15%', 
        marginHorizontal: '5%'
    }
})
export default UnauthorizedDriver