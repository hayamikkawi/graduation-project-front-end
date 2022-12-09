import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './profile'
import ProfileEdit from './profile-edit'
import ProfileVerify from './profile-verify'
import PasswordChange from './profile-password-change'
import SignUpDriver from '../SignUpDriverScreen/sign-up-driver'
import ChatScreen from '../Chatting/chat-screen'

const ProfileScreenMain = ({route}) => {
    const ProfileStack = createNativeStackNavigator()
    return (
        <ProfileStack.Navigator
            screenOptions={{
                title: '',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#262a2d'
                }
            }}
        >
            <ProfileStack.Screen
                name='Profile-Main'
                component={Profile}
                initialParams = {{id: 0, other:false, setIsSigned: route.params.setIsSigned}}
            />
            <ProfileStack.Screen
                name='Profile-Edit'
                component={ProfileEdit}
            />
            <ProfileStack.Screen
                name='Profile-Verify'
                component={ProfileVerify}
            />
            <ProfileStack.Screen
                name='Profile-ChangePass'
                component={PasswordChange}
            />
            <ProfileStack.Screen
                name='Profile-ChangeRole'
                component={SignUpDriver}
            />
            <ProfileStack.Screen
                name='Profile-Other'
                component={Profile}
            />
            <ProfileStack.Screen
                name='Chat-Screen'
                component={ChatScreen}
            />
        </ProfileStack.Navigator>
    )
}

export default ProfileScreenMain