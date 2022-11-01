import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import Ionicon from 'react-native-vector-icons/Ionicons'

const SucceedModal = ({ modalVisible, setModalVisible, onPress, message }) => {
    // const [modalVisible, setModalVisible] = useState(modalVisible);
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            // onRequestClose={() => {
            //     // Alert.alert('Modal has been closed.');
            //     setModalVisible(!modalVisible);
            // }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.flex}>
                            <Ionicon name='checkmark-circle' color={'#1093c9'} size={50}/>
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
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '80%',
        height: '30%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 35,
        alignItems: 'center',
        shadowColor: '#ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#1093c9',
        fontSize: 22,
        fontFamily: 'kanyon-bold'
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    button: {
        width: '20%'
    }, 
    flex: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignContent: 'center', 
        padding: '5%', 
        width: '100%'
    }

})
export default SucceedModal