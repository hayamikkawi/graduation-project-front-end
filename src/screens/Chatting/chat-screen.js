import { StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat, InputToolbar, Bubble, Send } from 'react-native-gifted-chat'
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView'
import socket from '../../../utils/socket'

const ChatScreen = ({ navigation, route }) => {
    const sender = route.params.sender
    const receiver = route.params.receiver

    //new for socket: 
    const [chatMessages, setChatMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({ title: receiver.name });
        const ids = {
            senderId: sender._id,
            receiverId: receiver._id
        }
        console.log(ids)
        socket.emit("findChat", ids);
        socket.on("foundChat", (roomChats) => {
            setChatMessages(roomChats)
        });
    }, []);

    // useEffect(() => {
    //     const getChats = async () => {
    //         const chatsRef = firebase.firestore().collection('chats')
    //         const sentChats = chatsRef.where('from._id', '==', sender._id).where('to._id', '==', receiver._id).orderBy('createdAt', 'desc').get()
    //         const receivedChats = chatsRef.where('to._id', '==', sender._id).where('from._id', '==', receiver._id).orderBy('createdAt', 'desc').get()
    //         const [sentChatsSnapshot, receivedChatsSnapshot] = await Promise.all([
    //             sentChats,
    //             receivedChats
    //         ])
    //         const sentChatsArray = sentChatsSnapshot.docs
    //         const receivedChatsArray = receivedChatsSnapshot.docs
    //         const allChatsArray = sentChatsArray.concat(receivedChatsArray)
    //         return allChatsArray
    //     }

    //     let chats = []
    //     if (sender._id != undefined) {
    //         getChats().then((result) => {
    //             result.forEach(doc => {
    //                 chats.push({
    //                     _id: doc.data()._id,
    //                     time: doc.data().createdAt,
    //                     createdAt: doc.data().createdAt.toDate(),
    //                     text: doc.data().text,
    //                     user: doc.data().from
    //                 })
    //             });
    //         });
    //     }
    //     chats.sort(function (a, b) {
    //         return b.time - a.time
    //     })
    //     setMessages(chats)
    // }, [sender])

    useEffect(() => {
        socket.on("foundChat", (roomChats) => setChatMessages(roomChats));
    }, [socket])

    const handleNewMessage = (messages) => {
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;
        const newMessage = {
            text: messages[0].text,
            from: {
                _id: sender._id
            },
            to: {
                _id: receiver._id
            },
            createdAt: { hour, mins }
        }
        console.log(newMessage)
        socket.emit("newMessage", newMessage);
    };

    const onSend = useCallback((messages = []) => {
        setChatMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        handleNewMessage(messages)
    }, [])
    const renderInputToolbar = (props) => {
        //Add the extra styles via containerStyle
        return <InputToolbar {...props}
            containerStyle={{ backgroundColor: '#4b5158' }}
        />
    }
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={
                    {
                        right: {
                            backgroundColor: '#1093c9'
                        },
                        left: {
                            backgroundColor: '#4b5158',
                        }
                    }
                }
                textStyle={
                    {
                        left: {
                            color: 'white'
                        }
                    }
                }
            />
        );
    }
    const renderSend = (props) => {
        return <Send {...props}
            textStyle={{ color: '#1093c9' }}
        />
    }
    return (
        // <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
            <GiftedChat
                messages={chatMessages}
                onSend={messages => onSend(messages)}
                user={{ _id: route.params.sender._id }}
                renderInputToolbar={renderInputToolbar}
                renderBubble={renderBubble}
                renderSend={renderSend}
            />
        </KeyboardAvoidingView>

        // </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262a2d',
        height: '100%',
        // marginTop: '-5%'
    },
    test: {
        color: 'red',
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#262a2d',
    }
})
export default ChatScreen