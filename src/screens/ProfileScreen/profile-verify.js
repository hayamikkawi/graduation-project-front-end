import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import styles from './styles'
import CustomHeader from '../../components/Header/header'

const ProfileVerify = ({ navigation, route }) => {
    const user = route.params.user
    const onVerifyPhonePressed = () => {

    }
    const onVerifyEmailPressed = () => {

    }
    return (
        <ScrollView style={styles.root}>
            <CustomHeader text={'Verify Your Email or Mobile'} size={22} />
            <View>
                <View style={[styles.flex, {marginBottom: '30%'}]}>
                    <Text style={styles.text}>Mobile Number:</Text>
                    <Text style={styles.text}>{user.mobileNumber}</Text>
                    {user.phoneVerified ?
                        <CustomButton  width={'25%'} bgcolor='#80B362' icon={'checkmark'}/> :
                        <CustomButton text={'Verify'} width={'25%'} onPress={onVerifyPhonePressed}/>
                    }
                </View>
                <View style={styles.flex}>
                    <Text style={styles.text}>Email:</Text>
                    <Text style={styles.text}>{user.email}</Text>
                    {user.emailVerified ?
                        <CustomButton icon={'checkmark'} width={'25%'} bgcolor='#80B362' /> :
                        <CustomButton text={'Verify'} width={'25%'} onPress={onVerifyEmailPressed} />
                    }
                </View>
            </View>
        </ScrollView>
    )
}
export default ProfileVerify