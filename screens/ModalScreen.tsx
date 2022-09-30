import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Keyboard } from "react-native";
import { Text, View, FlatList } from "react-native";
import CheckOut from "../components/CheckOut";

export default function ModalScreen() {
  const [isloading, setisloading] = useState(true);
  const [data, setdata] = useState({});
  const [pdetails, setpdetails] = useState({});
  React.useEffect(() => {
    if (getAuth().currentUser?.displayName != undefined) {
      const db = getFirestore();
      getDoc(doc(db, "Users/" + getAuth().currentUser?.uid)).then(
        (snapshot) => {
          const user = snapshot.data();
          // console.log(new Date());
          setdata(user?.cart);
        }
      );
      const rtdb = getDatabase();
      get(ref(rtdb, "Products/")).then((snapshot) => {
        setpdetails(snapshot.val());
      });
      setisloading(false);
    }
  }, []);
  // console.log(pdetails);

  if (isloading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <View style={styles.separator} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, styles.boxshadow]}>
            <View style={styles.item}>
              <Text style={styles.Name}>
                {" "}
                {pdetails[item.product - 1]?.Name}
              </Text>
              <Text style={styles.Price}>
                {" "}
                {pdetails[item.product - 1]?.Price}
              </Text>

              <Text style={styles.qty}> {item.qty}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.product}
        numColumns={1}
      />
      <CheckOut cart={data} sc={setdata} products={pdetails} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  Price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  qty: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
