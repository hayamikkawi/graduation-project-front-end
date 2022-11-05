import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Rating, AirbnbRating } from 'react-native-ratings'
import styles from './styles.js'
import { TextInput } from 'react-native-paper'
import axios from 'axios'
import API_URL from '../../App_URL'
import * as SecureStore from 'expo-secure-store'

const RatingModal = ({ modalVisible, onPress }) => {
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const onOkPress = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/user/rating`, {
            comment,
            rating
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
                    <View style={[styles.modalView, { height: '60%' }]}>
                        <View style={styles.flex}>
                            <Text style={styles.modalText}>Rate This User</Text>
                        </View>
                        <View style={styles.flex}>
                            <AirbnbRating
                                count={5}
                                defaultRating={0}
                                size={20}
                                onFinishRating={setRating}
                            />
                        </View>
                        <View style={[styles.flex, { width: '100%', margin: 0 }]}>
                            <TextInput
                                placeholder='Add your comment here'
                                selectionColor='#1093c9'
                                style={styles.textInput}
                                activeUnderlineColor='#1093c9'
                                underlineColor='transparent'
                                onChangeText={setComment}
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
    )
}
export default RatingModal