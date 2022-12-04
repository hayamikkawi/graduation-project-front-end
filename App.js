import { StyleSheet, Text } from 'react-native';
import FirstScreen from './src/screens/FirstScreen/first-screen.js';
import SignInScreen from './src/screens/SigInScreen/signin-screen.js';
import SignUpScreen from './src/screens/SignUpScreen/sign-up.js';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/home-screen.js';
import SignUpDriver from './src/screens/SignUpDriverScreen/sign-up-driver.js';
import *   as SecureStore from 'expo-secure-store'
import { useState, useEffect, useReducer } from 'react'
import SignUpScreen2 from './src/screens/SignUpScreen/sign-up-second.js';

export default function App() {
  const [isSigned, setIsSigned] = useState(false)
  
  useEffect(() => {
    async function isLoggedIn() {
      //await SecureStore.setItemAsync('secureToken', '')
      const storedToken = await SecureStore.getItemAsync('secureToken')
      if (!storedToken || storedToken.length == 0) {
        setIsSigned(false)
      }
      else {
        console.log('signed')
        setIsSigned(true)
      }
    }
    isLoggedIn()
  }, [isSigned])


  let [fontsLoaded] = useFonts({
    'kanyon-bold': require('./assets/fonts/Fontspring-DEMO-kanyon-bold.otf'),
    'kanyon-normal': require('./assets/fonts/Fontspring-DEMO-kanyon-regular.otf'),
    'kanyon-medium': require('./assets/fonts/Fontspring-DEMO-kanyon-medium.otf')
  });
  if (!fontsLoaded) {
    //return <AppLoading />;
    return <Text>hey</Text>
  }
  const Stack = createNativeStackNavigator()

  return (
    !isSigned ?
      <NavigationContainer >
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
          // screenOptions={{
          //   title: '',
          //   headerTintColor: 'white',
          //   headerStyle: {
          //     backgroundColor: '#262a2d'
          //   }
          // }}
        >
          <Stack.Screen
            name="Pre"
            component={FirstScreen}
          />
          <Stack.Screen
            name="Log in"
            component={SignInScreen}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUpScreen}
          />
          <Stack.Screen
            name='Sign Up2'
            component={SignUpScreen2}
          />
          <Stack.Screen
            name="Sign Up Driver"
            component={SignUpDriver}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{setIsSigned: setIsSigned}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      : <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ setIsSigned: setIsSigned }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#262a2d',
    width: '100%',
    height: '100%'
    //fontFamily:'kanyon-normal'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
