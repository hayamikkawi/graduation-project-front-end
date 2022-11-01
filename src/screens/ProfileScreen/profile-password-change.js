import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './styles.js'
import CustomHeader from '../../components/Header/header.js'
import CustomInput from '../../components/CustomInput/custom-input.js'
import CustomButton from '../../components/CustomButton/custom-button.js'
import axios from 'axios'
import API_URL from '../../App_URL.js'
import * as SecureStore from 'expo-secure-store'
import ErrorMessage from '../../components/ErrorMessage/error-message.js'
import SucceedModal from '../../components/Modals/succeed-modal.js'

const PasswordChange = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const validate = () => {
        if (oldPassword.trim() == '' || newPassword.trim() == '' || newPassword2.trim() == '') {
            setError(true)
            setErrorMessage('Please Fill All Fields.')
            return false
        }
        if (newPassword !== newPassword2) {
            setError(true)
            setErrorMessage('Passwords Do Not Match.')
            return false
        }
        setError(flase)
        return true
    }

    const onChangePasswordPressed = async () => {
        if (!validate()) return
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/user/update`, {
            oldPassword,
            newPassword
        }, {
            headers: {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        }).then((res) => {
            if (res.status == 200) {
                setModalVisible(true)
            }
        }).catch((err) => {

        })
    }
    return (
        <ScrollView style={styles.root}>
            <SucceedModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                message={'Password was successfully updated.'}
                onPress={() => {
                    setModalVisible(false)
                }}
            />
            <CustomHeader text={'Change Password'} size={22} />
            <View style={styles.customCenter}>
                <Text style={[styles.text, { marginBottom: '3%' }]}>Enter the current password:</Text>
                <CustomInput
                    value={oldPassword}
                    setValue={setOldPassword}
                    onChangeText={setOldPassword}
                    secureTextEntry
                    color='white'
                />
            </View>
            <View style={styles.customCenter}>
                <Text style={[styles.text, { marginBottom: '3%' }]}>Enter the new password:</Text>
                <CustomInput
                    value={newPassword}
                    setValue={setNewPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    color='white'
                />
            </View>
            <View style={styles.customCenter}>
                <Text style={[styles.text, { marginBottom: '3%' }]}>Confirm the new password password:</Text>
                <CustomInput
                    value={newPassword2}
                    setValue={setNewPassword2}
                    onChangeText={setNewPassword2}
                    secureTextEntry
                    color='white'
                />
            </View>
            <View style={styles.customCenter}>
                <CustomButton text={'Change Password'} onPress={onChangePasswordPressed} />
            </View>
            {error &&
                <View style={styles.customCenter}>
                    <ErrorMessage message={errorMessage} />
                </View>
            }
        </ScrollView>
    )
}

export default PasswordChange