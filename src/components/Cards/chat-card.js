import { View, Text, StyleSheet, Pressable } from 'react-native'
import ProfilePic from '../ProfilePicture/profile-pic'
import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { useState, useEffect } from 'react'
import { Buffer } from "buffer";

const ChatCard = ({ chat, navigation }) => {
    const [imageURL, setImageURL] = useState('')
    useEffect(() => {
        const getProfilePicture = async () => {
            try {
                const b = new Buffer.from(chat.chatter.profilePicture.data, 'binary').toString('base64')
                setImageURL('data:image/jpeg;base64,' + b)
            } catch (err) {
                console.log(err)
            }
        }
         getProfilePicture()
    }, [])

    const onChatPressed = async () => {
        const sender = await SecureStore.getItemAsync('user')
        const senderJson = await JSON.parse(sender)
        navigation.navigate('Chat Screen', {
            receiver: {
                _id: chat.chatter.id,
                name: chat.chatter.username,
                profilePicture: null
            },
            sender: {
                _id: senderJson.id,
                //name: senderJson.username
            }
        })
    }
    return (
        <Pressable style={styles.container} onPress={onChatPressed}>
            <ProfilePic source={{ uri: imageURL }} radius={60} />
            <View style={styles.innerContainer}>
                <View style={styles.rowFlex}>
                    <Text style={styles.boldText}>{chat.chatter.username}</Text>
                    <Text style={styles.text}>{chat.lastMessage.createdAt}</Text>
                </View>
                <View>
                    <Text style={[styles.text, { paddingTop: '3%' }]}>{chat.lastMessage.text}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 1
    },
    innerContainer: {
        borderBottomColor: '#4b5158',
        borderBottomWidth: 0.5,
        paddingVertical: '5%',
        width: '100%'
    },
    rowFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
    },
    boldText: {
        fontFamily: 'kanyon-bold',
        fontSize: 18,
        color: 'white'
    },
    text: {
        fontFamily: 'kanyon-normal',
        color: '#d9d5d2',
        maxWidth: '70%',
        maxHeight: 30

    }

})
export default ChatCard