import React, {useEffect , useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PublishSource from '../Publish-Source/publish-source'
import PublishDestination from '../Publish-Deastination/publish-destination'
import PublishRoute from '../Publish-Route/publish-route'
import PublishTimeDetails from '../PublishTimeDetails/publish-time-details'
import PublishDateDetails from '../PublishDateDetails/publish-date-details'
import PublishProperties from '../PuclishProperties/publish-properties'
import PublishNumber from '../Publish-Number/publish-number'
import UnauthorizedDriver from '../Unauthorized/unauthorized-driver'
import * as SecureStore from 'expo-secure-store' 

const PublishScreenMain =  () => {
    const Stack = createNativeStackNavigator()
    const [role, setRole] = useState('')
    useEffect(() => {
        async  function fetchRole (){
        const userString = await SecureStore.getItemAsync('user')
        const user = JSON.parse(userString)
        console.log('role1: ' + user.role)
        setRole(user.role)
        }
        fetchRole()
    }, [])

    console.log('role2: ' + role)
    return (
         role === 'driver' ?
            <Stack.Navigator screenOptions={{ headerShown: false }}>
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
            : <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name = 'Unauthorized-Driver'
                    component={UnauthorizedDriver}
                />
            </Stack.Navigator>
    )
}

export default PublishScreenMain