import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import Ionicon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

const FailedModal = ({ modalVisible, setModalVisible, onPress, message }) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.succeedModalView}>
                        <View style={styles.flex}>
                            <Ionicon name='close-circle' color={'#FF7276'} size={50}/>
                            <Text style={styles.modalTextError}>{message}</Text>
                        </View>
                        <View style={styles.modalButtons}>
                            <CustomButton
                                style={styles.button}
                                text={'OK'}
                                width={'30%'}
                                onPress={onPress}
                                bgcolor={'#FF7276'}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default FailedModal