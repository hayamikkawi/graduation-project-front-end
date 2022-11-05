import { ScrollView, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/Header/header'
import CustomButton from '../../components/CustomButton'
import Unauthorized from '../../../assets/myIcons/401.png'

const UnauthorizedDriver = ({ navigation }) => {
    const onBecomeDriverPressed = () => {
        navigation.navigate('Profile-ChangeRole', {
            roleChange: true
        })
    }
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
                    onPress={onBecomeDriverPressed}
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
    },
    container: {
        width: '90%',
        marginHorizontal: '5%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    image: {
        width: '100%',
        height: '200%',
        marginTop: '-50%',
    },
    upcontainer: {
        width: '90%',
        height: '200%',
        marginVertical: '15%',
        marginHorizontal: '5%'
    }
})
export default UnauthorizedDriver