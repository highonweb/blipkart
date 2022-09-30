import { FontAwesome5 } from "@expo/vector-icons";
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { getStorage, ref as SRef, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import * as React from "react";
import * as FileSystem from "expo-file-system";

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from "react-native";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

interface CheckOutProps {}

const CheckOut = (props: CheckOutProps) => {
  const onPurchase = () => {
    const f = async () => {
      const db = getDatabase();
      const updates = {};

      let filename = new Date().toISOString();
      let content = "UserID,ProductName,OrderQuantity,price,Total Price \n";
      // console.log(content);

      let totalPrice = 0;
      let userProducts = [];
      for (let i = 0; i < props.cart.length; i++) {
        totalPrice +=
          Number(
            String(props.products[props.cart[i].product - 1].Price).slice(1)
          ) * props.cart[i].qty;
        userProducts.push(props.cart[i].product - 1);
        content += ` ${getAuth().currentUser?.uid},"${
          props.products[props.cart[i].product - 1].Name
        }",${props.cart[i].qty},${
          props.products[props.cart[i].product - 1].Price
        },${
          "$" +
          String(
            Number(
              String(props.products[props.cart[i].product - 1].Price).slice(1)
            ) * props.cart[i].qty
          )
        } \n`;
        updates[`/Products/${props.cart[i].product}/qtySold`] =
          props.products[props.cart[i].product - 1].qtySold + props.cart[i].qty;
        updates[`/Products/${props.cart[i].product - 1}/qty`] =
          props.products[props.cart[i].product].qty - props.cart[i].qty;
      }
      update(dbRef(db), updates);

      await updateDoc(
        doc(getFirestore(), "Users/" + getAuth().currentUser?.uid),
        {
          cart: {},
          Products: arrayUnion(...userProducts),
          amountSpent: increment(totalPrice),
        }
      );
      // console.log(filename);
      // console.log(content);
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + `/${filename}.csv`,
        content,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
      // return;

      let res = await fetch(FileSystem.documentDirectory + `${filename}.csv`);
      // console.log(res);
      let t = await res.blob();
      await uploadBytes(SRef(getStorage(), filename + ".csv"), t, {
        contentType: "text/csv",
      });
      props.sc({});
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
        <Text style={styles.google}>Check Out</Text>
      </View>
    </TouchableHighlight>
  );
};

export default CheckOut;

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
