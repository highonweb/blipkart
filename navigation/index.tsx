import { FontAwesome } from '@expo/vector-icons';
import { onAuthStateChanged,getAdditionalUserInfo } from "firebase/auth";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { getAuth } from 'firebase/auth';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [Auth, setAuth] = useState(getAuth())
  const [uid, setuid] = useState("");
interface User {}

onAuthStateChanged(Auth,(user : User) =>{
    if (user) {
      setuid(user.uid);
      console.log(uid);
      SecureStore.setItemAsync("Auth_Token",String(uid));
    }else{
      setuid("");
    }

});
  return (
<Stack.Navigator>
    
{uid == ""
?(
  <Stack.Screen name="Root" component={Login} options={{ headerShown: false }} />
):(
  <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
)}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */