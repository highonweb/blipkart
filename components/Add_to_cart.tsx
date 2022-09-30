import { FontAwesome5 } from "@expo/vector-icons";
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import * as React from "react";
import * as FileSystem from "expo-file-system";

import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { uploadBytes, getStorage } from "firebase/storage";

interface Add_to_CartProps {}

const Add_to_Cart = (props: Add_to_CartProps) => {
  const onPurchase = () => {
    const f = async () => {
      const db = getFirestore();
      await updateDoc(doc(db, "Users", String(getAuth().currentUser?.uid)), {
        cart: arrayUnion({ product: props.product.pid, qty: props.qty }),
      });
      props.nav.goBack();
    };
    f();
  };

  return (
    <TouchableHighlight
      onPress={() => onPurchase()}
      //   disabled={!request}
      underlayColor="white"
    >
      <View style={styles.loginButton}>
        <FontAwesome5 name="shopping-cart" size={24} color="white" />
        <Text style={styles.google}>Add to Cart</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Add_to_Cart;

const styles = StyleSheet.create({
  container: {},
  loginButton: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-around",
    backgroundColor: "#4285F4",
    height: 50,
    width: "40%",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  google: {
    fontSize: 24,
    color: "white",
  },
});
