import { View, Text, Modal } from 'react-native'
import { TextInput } from 'react-native-paper'
import React from 'react'
import CustomButton from '../CustomButton/custom-button.js'
import styles from './styles.js'
import { useState } from 'react'
import axios from 'axios'
import API_URL from '../../App_URL.js'
import * as SecureStore from 'expo-secure-store'

const ReportModal = ({ modalVisible, onPress, userId, token }) => {
    const [report, setReport] = useState('')
    const onOkPress = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/users/report/${userId}`, {
            reportMessage: report
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            if (res.status == 200) {
                onPress()
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { height: '50%' }]}>
                        <View style={styles.flex}>
                            <Text style={styles.modalText}>Report this user to the admin</Text>
                        </View>
                        <View style={[styles.flex, { width: '100%', margin: 0 }]}>
                            <TextInput
                                placeholder='Add your complaint here'
                                selectionColor='#1093c9'
                                style={styles.textInput}
                                activeUnderlineColor='#1093c9'
                                underlineColor='transparent'
                                onChangeText={setReport}
                            />
                        </View>
                        <View style={styles.modalButtons}>
                            <CustomButton
                                style={styles.button}
                                text={'Cancel'}
                                width={'30%'}
                                onPress={onPress}
                                bgcolor='#FF7276'
                            />
                            <CustomButton
                                style={styles.button}
                                text={'OK'}
                                width={'30%'}
                                onPress={onOkPress}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        // <View>
        // <Modal
        //     animationType="slide"
        //     transparent={true}
        //     visible={modalVisible}
        // >
        //     <View style={styles.centeredView}>
        //         <View style={[styles.modalView, { height: '60%' }]}>
        //             <View style={styles.flex}>
        //                 <Text style={styles.modalText}>Rate This User</Text>
        //             </View>
        //             <View style={styles.flex}>

        //             </View>
        //             <View style={[styles.flex, { width: '100%', margin: 0 }]}>
        //                 <TextInput
        //                     placeholder='Add your comment here'
        //                     selectionColor='#1093c9'
        //                     style={styles.textInput}
        //                     activeUnderlineColor='#1093c9'
        //                     underlineColor='transparent'
        //                     onChangeText={setReport}
        //                 />
        //             </View>
        //             <View style={styles.modalButtons}>
        //                 <CustomButton
        //                     style={styles.button}
        //                     text={'Cancel'}
        //                     width={'30%'}
        //                     onPress={onPress}
        //                     bgcolor='#FF7276'
        //                 />
        //                 <CustomButton
        //                     style={styles.button}
        //                     text={'OK'}
        //                     width={'30%'}
        //                     onPress={onOkPress}
        //                 />
        //             </View>

        //         </View>
        //     </View>
        // </Modal>
        // </View>
    )
}

export default ReportModal