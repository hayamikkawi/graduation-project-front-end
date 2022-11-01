import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './profile'
import ProfileEdit from './profile-edit'
import ProfileVerify from './profile-verify'
import SignInScreen from '../SigInScreen/signin-screen'
import PasswordChange from './profile-password-change'
import RoleChange from './profile-become-driver'
import SignUpDriver from '../SignUpDriverScreen/sign-up-driver'

const ProfileScreenMain = () => {
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
        </ProfileStack.Navigator>
    )
}

export default ProfileScreenMain