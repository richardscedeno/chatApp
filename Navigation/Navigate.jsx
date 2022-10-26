import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home'
import { Chat } from '../screens/Chat'
import { Login } from '../screens/Login';
import { Signup } from '../screens/Signup';

import { AuthContext } from '../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

export const ChatStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={Home} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat}/>
    </Stack.Navigator>
  )
}

export const AuthStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  )
}


export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth,
      async authenticateUser => {
        authenticateUser ? setUser(authenticateUser) : setUser(null)
        setLoading(false)
      }
    )

    return () => unSubcribe()
  }, [user]);


  if(loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {
        user ? <ChatStack /> : <AuthStack />
      }
    </NavigationContainer>
  )
}