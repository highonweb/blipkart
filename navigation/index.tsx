import { FontAwesome } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { getAuth } from "firebase/auth";
import ModalScreen from "../screens/ModalScreen";
import Login from "../screens/Login";
import Admin from "../screens/Admin";
import Password from "../screens/Password";
import Home from "../screens/Home";
import ProductPage from "../screens/ProductPage";
import Register from "../screens/Register";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import firebaseApp from "../components/FirebaseApp";

import LinkingConfiguration from "./LinkingConfiguration";
import { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext, AuthProvider } from "../context/AuthContext";

export default function Navigation() {
  const [uid, setuid] = useState({});
  return (
    <AuthProvider value={{ uid, setuid }}>
      <NavigationContainer linking={LinkingConfiguration}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const app = firebaseApp;

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const Auth = useContext(AuthContext);
  const [isRegistered, setisRegistered] = useState(false);
  const [isStoreAdmin, setisStoreAdmin] = useState(false);
  const [Loggedin, setLoggedin] = useState(false);

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      Auth.setuid(getAuth().currentUser?.uid);
    } else {
      Auth.setuid("");
    }
  });

  if (isStoreAdmin && !Loggedin) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Password"
          component={Password}
          options={{ headerShown: false }}
          initialParams={{ setLoggedin }}
        />
      </Stack.Navigator>
    );
  }
  if (isStoreAdmin && Loggedin) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  //
  if (Auth.uid == "") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Login}
          initialParams={{ setisStoreAdmin }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    if (isRegistered) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{ reg: setisRegistered }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product"
            component={ProductPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={ModalScreen}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Regiser"
            component={Register}
            initialParams={{ reg: setisRegistered }}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
    }
  }
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
