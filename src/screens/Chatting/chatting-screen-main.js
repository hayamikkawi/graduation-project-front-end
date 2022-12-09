import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatScreen from './chat-screen'
import AllChatsScreen from './all-chats'

const ChatScreenMain = () => {
  const ChattingStack = createNativeStackNavigator()
  return (
    <ChattingStack.Navigator
      screenOptions={{
        title: '',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#262a2d'
        }
      }}
    >
      <ChattingStack.Screen
        name='All Chats Screen'
        component={AllChatsScreen}
      />
      <ChattingStack.Screen
        name='Chat Screen'
        component={ChatScreen}
      />
    </ChattingStack.Navigator>
  )
}

export default ChatScreenMain