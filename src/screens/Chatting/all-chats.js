import { ScrollView, StyleSheet } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import Avatar from '../../../assets/user/F38.jpg'
import ChatCard from '../../components/Cards/chat-card'
import CustomHeader from '../../components/Header/header'
import API_URL from '../../App_URL'
import socket from '../../../utils/socket'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useFocusEffect } from '@react-navigation/native'

const AllChatsScreen = ({ navigation }) => {
  const allChats = [
    {
      id: 2,
      chatter: {
        _id: 10,
        name: 'Danah',
        profilePicture: Avatar
      },
      lastMessage: {
        message: 'hii',
        date: '22/9/2020'
      }
    }
  ]
  const [rooms, setRooms] = useState([])
  useFocusEffect(
    React.useCallback(() => {
      async function fetchGroups() {
        const userString = await SecureStore.getItemAsync('user')
        const user = JSON.parse(userString)
        axios.get(`${API_URL}/chats/${user.id}`).then((res) => {
          setRooms(res.data)
        }).catch((err) => {
          console.log("here" + err)
        })
      }
      fetchGroups();
    }, [])
  );

  useEffect(() => {
    socket.on("chatsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  return (
    <ScrollView style={styles.root}>
      <CustomHeader text={'Chats'} size={25} />
      {
        rooms.map((chat, index) => {
          return <ChatCard
            chat={chat}
            key={index}
            navigation={navigation}
          />
        }
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#262a2d',
    padding: '2%'
  }
})

export default AllChatsScreen