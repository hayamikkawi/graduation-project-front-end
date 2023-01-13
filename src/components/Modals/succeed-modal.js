import { View, Text, Modal } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import Ionicon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

const SucceedModal = ({ modalVisible, setModalVisible, onPress, message }) => {
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
                            <Ionicon name='checkmark-circle' color={'#1093c9'} size={50} />
                            <Text style={styles.modalText}>{message}</Text>
                        </View>
                        <View style={styles.modalButtons}>
                            <CustomButton
                                style={styles.button}
                                text={'OK'}
                                width={'30%'}
                                onPress={onPress}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default SucceedModal