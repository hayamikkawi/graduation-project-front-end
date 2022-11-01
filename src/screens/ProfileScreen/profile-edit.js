import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProfilePic from '../../components/ProfilePicture/profile-pic'
import User from '../../../assets/user/F38.jpg'
import CustomButton from '../../components/CustomButton'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { TextInput } from 'react-native-paper'
import styles from './styles.js'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import ErrorMessage from '../../components/ErrorMessage/error-message'
import SucceedModal from '../../components/Modals/succeed-modal'
import CustomHeader from '../../components/Header/header'

const ProfileEdit = ({ navigation, route }) => {
    const { user, setUser } = route.params
    const [bio, setBio] = useState(user.bio)
    const [token, setToken] = useState('')
    const [hasPermession, setHasPermession] = useState(null)
    const [profilePic, setProfilePic] = useState(user.profilePic)
    const [disabled, setDisabled] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchToken = async () => {
            setToken(await SecureStore.getItemAsync('secureToken'))
        }
        const requestPermession = async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasPermession(galleryStatus.status === 'granted')
        }
        fetchToken()
        requestPermession()
    }, [])
    const onPPEditPressed = () => {
        setSuccess(true)
        // const newUser = JSON.parse(JSON.stringify(user))
        // newUser.profilePic = profilePic
        // setUser(newUser)
        const pic = new FormData()
        pic.append('filename', 'profilePic')
        pic.append('file', {
            uri: profilePic.uri,
            type: profilePic.type,
            name: profilePic.fileName
        })
        axios.post('/user/update', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            if (res.status == 200) {
                setSuccess(true)
                const newUser = JSON.parse(JSON.stringify(user))
                newUser.profilePic = profilePic
                setUser(newUser)
            }
        }).catch((err) => {
            return <ErrorMessage message={'An error occured'} />
        })
    }
    const selectPic = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            })
            setDisabled(false)
            setProfilePic(res)
        } catch (err) {
            if (res.cancelled) {
                console.log('cancelled')
                setDisabled(true)
            }
            console.log(JSON.stringify(err))
            return <ErrorMessage message={'An error occured.'} />
        }
    }
    const onBioChangePressed = async () => {
        setSuccess(true)
        const newUser = JSON.parse(JSON.stringify(user))
        newUser.bio = bio
        setUser(newUser)
        // axios.post('/user/update', {
        //     bio: bio
        // }, {
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // }).then((res) => {
        //     if (res.status == 200) {
        //         setSuccess(true)
        //         setUserBio(bio)
        //     }
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
    const onChangePasswordPressed = () => {
        navigation.navigate('Profile-ChangePass')
    }
    const onChangeRolePressed = () => {
        navigation.navigate('Profile-ChangeRole', {
            roleChange : true
        })
    }
    return (
        <ScrollView style={styles.root}>
            <CustomHeader text={'Profile Settings'} size={22} />
            <SucceedModal
                modalVisible={success}
                setModalVisible={setSuccess}
                onPress={() => {
                    setSuccess(false)
                }}
                message={'You update was successfully done.'}
            />
            <View style={styles.outer}>
                <View style={styles.flex}>
                    <ProfilePic source={profilePic} radius={100} />
                    <Pressable onPress={selectPic}>
                        <Text style={[styles.text, { textDecorationLine: 'underline' }]}>
                            Choose a new profile picture
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.center}>
                    <CustomButton text={'Edit'} width={'30%'} disabled={disabled} onPress={onPPEditPressed} />
                </View>
            </View>
            <View style={styles.outer}>
                <View>
                    <View style={styles.flex}>
                        <Text style={styles.text}>Bio:</Text>
                        <TextInput
                            multiline
                            style={[styles.textInput, { width: '80%' }]}
                            activeUnderlineColor={'#1093c9'}
                            onChangeText={setBio}
                            value={bio}
                            setValue={setBio}
                        />
                    </View>
                    <View style={styles.center}>
                        <CustomButton text={'Edit'} width={'30%'} onPress={onBioChangePressed} />
                    </View>
                </View>
            </View>
            <View>
                <CustomButton text={'Change Password'} type={'TERTIARY'} onPress={onChangePasswordPressed} />
                {user.role != 'driver' && <CustomButton text={'Become a driver'} type={'TERTIARY'} onPress={onChangeRolePressed} />}
            </View>
        </ScrollView>
    )
}

export default ProfileEdit