import { ScrollView, StyleSheet } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import Avatar from '../../../assets/user/F38.jpg'
import ChatCard from '../../components/Cards/chat-card'
import CustomHeader from '../../components/Header/header'
import API_URL from '../../App_URL'
import socket from '../../../utils/socket'

const AllChatsScreen = ({ navigation }) => {
  const allChats = [
    {
      id: 1,
      chatter: {
        _id: 3,
        name: 'Mostafa',
        profilePicture: Avatar
      }, 
      lastMessage:{
        message: 'Hello', 
        date: '22/10/2020'
      }
    },
    {
      id: 2,
      chatter: {
        _id: 10,
        name: 'Danah',
        profilePicture: Avatar
      }, 
      lastMessage:{
        message: 'hii', 
        date: '22/9/2020'
      }
    }
  ]
  const [rooms, setRooms] = useState([])
  useLayoutEffect(() => {
    function fetchGroups() {
      fetch(`${API_URL}/chats`)
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on("chatsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  return (
    <ScrollView style={styles.root}>
      <CustomHeader text={'Chats'} size={25} />
      {
        allChats.map((chat) => {
          return <ChatCard
            chat={chat}
            key={chat.id}
            navigattion={navigation}
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