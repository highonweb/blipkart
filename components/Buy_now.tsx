import { FontAwesome5 } from "@expo/vector-icons";
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { Buffer } from "buffer";
import {
  getStorage,
  ref as SRef,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import Base64 from "./base64";
import { getAuth } from "firebase/auth";
import * as React from "react";
import * as Sharing from "expo-sharing";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from "react-native";
import {
  arrayUnion,
  doc,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";

interface Buy_now_ButtonProps {}

const Buy_now_Button = (props: Buy_now_ButtonProps) => {
  const onPurchase = () => {
    const f = async () => {
      const db = getDatabase();
      const updates = {};
      updates[`/Products/${props.pid}/qtySold`] =
        props.product.qtySold + props.qty;
      updates[`/Products/${props.pid}/qty`] = props.product.qty - props.qty;
      update(dbRef(db), updates);

      let filename = new Date().toISOString();
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + `/${filename}.csv`,
        `UserID,ProductID,ProductName,OrderQuantity,price,Total Price \n ${
          getAuth().currentUser?.uid
        },${props.pid},"${props.product.Name}",${props.qty},${
          props.product.Price
        },${
          "$" + String(Number(String(props.product.Price).slice(1)) * props.qty)
        }`,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
      let res = await fetch(FileSystem.documentDirectory + `${filename}.csv`);
      console.log(res);
      let t = await res.blob();
      await uploadBytes(SRef(getStorage(), filename + ".csv"), t, {
        contentType: "text/csv",
      });
      await updateDoc(
        doc(getFirestore(), "Users/" + getAuth().currentUser?.uid),
        {
          cart: {},
          Products: arrayUnion(props.pid),
          amountSpent: increment(
            Number(String(props.product.Price).slice(1)) * props.qty
          ),
        }
      );
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
        <Text style={styles.google}>Buy Now</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Buy_now_Button;

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
