import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PublishSource from './publish-source'
import PublishDestination from './publish-destination'
import PublishRoute from './publish-route'
import PublishTimeDetails from './publish-time-details'
import PublishDateDetails from './publish-date-details'
import PublishProperties from './publish-properties'
import PublishNumber from './publish-number'
import UnauthorizedDriver from '../Unauthorized/unauthorized-driver'
import * as SecureStore from 'expo-secure-store'
import SignUpDriver from '../SignUpDriverScreen/sign-up-driver'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'
import API_URL from '../../App_URL'

const PublishScreenMain = () => {
    const Stack = createNativeStackNavigator()
    const [role, setRole] = useState('')
    useFocusEffect(React.useCallback(() => {
        async function fetchRole() {
            const token = await SecureStore.getItemAsync('secureToken')
            await axios.get(`${API_URL}/publish/role`, {
                headers: {
                    'Authorization': 'Bearer '+ token
                }
            }).then((res)=>{
                setRole(res.data)
            })
            // setRole(user.role)
        }
        fetchRole()
    }, [])
    )

    return (
        role === 'driver' ?
            <Stack.Navigator
                screenOptions={
                    {
                        title: '',
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: '#262a2d'
                        }
                    }
                }
            >
                <Stack.Screen
                    name='Publish-Source'
                    component={PublishSource}
                />
                <Stack.Screen
                    name='Publish-Destination'
                    component={PublishDestination}
                />
                <Stack.Screen
                    name='Publish-Route'
                    component={PublishRoute}
                />
                <Stack.Screen
                    name='Publish-Date-Details'
                    component={PublishDateDetails}
                />
                <Stack.Screen
                    name='Publish-Time-Details'
                    component={PublishTimeDetails}
                />
                <Stack.Screen
                    name='Publish-Properties'
                    component={PublishProperties}
                />
                <Stack.Screen
                    name='Publish-Number'
                    component={PublishNumber}
                />
            </Stack.Navigator>
            : <Stack.Navigator screenOptions={
                {
                    title: '',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#262a2d'
                    }
                }
            }
            >
                <Stack.Screen
                    name='Unauthorized-Driver'
                    component={UnauthorizedDriver}
                />
                <Stack.Screen
                    name='Profile-ChangeRole'
                    component={SignUpDriver}
                />
            </Stack.Navigator>
    )
}

export default PublishScreenMain