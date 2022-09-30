import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { ref, get, getDatabase } from "firebase/database";
import Product from "../components/Product";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface HomeProps {}
const numColumns = 1;
const size = Dimensions.get("window").width / numColumns;
const h = Dimensions.get("window").height / 10;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: h,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  item: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    width: size,
    height: size / 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
  },
  boxshadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

const Home = (props: HomeProps) => {
  const Auth = React.useContext(AuthContext);
  const [auth, setauth] = useState({});
  const [isloading, setisloading] = useState(true);
  const [data, setdata] = useState({});
  React.useEffect(() => {
    const auth = getAuth();
    setauth(auth);
    Auth.setuid(auth.currentUser?.uid);
    if (auth.currentUser?.displayName != undefined) {
      setisloading(false);
      const db = getDatabase();
      get(ref(db, "Products")).then((snapshot) => {
        const products = snapshot.val();
        // console.log(new Date());
        setdata(products);
      });
    }
  }, []);

  if (isloading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={[styles.title, styles.boxshadow]}>Products</Text>
        <TouchableHighlight
          onPress={() => {
            signOut(getAuth());
          }}
        >
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => props.navigation.navigate("Cart")}>
          <FontAwesome5 name="shopping-cart" size={24} color="black" />
        </TouchableHighlight>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              props.navigation.navigate("Product", {
                pid: item.pid,
              });
            }}
          >
            <View style={[styles.itemContainer, styles.boxshadow]}>
              <View style={styles.item}>
                <Text style={styles.text}> {item.Name}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item.pid}
        numColumns={numColumns}
      />
    </>
  );
};

export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   tinyLogo: {
//     width: 100,
//     height: 100,
//     // borderRadius: "50%",
//   },
// });
