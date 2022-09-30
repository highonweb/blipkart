import * as React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native";
import { downloadAsync, documentDirectory } from "expo-file-system";
import * as Sharing from "expo-sharing";

interface AdminProps {}

const size = Dimensions.get("window").width;
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

const Admin = (props: AdminProps) => {
  const [receipts, setreceipts] = useState([]);
  useEffect(() => {
    const storage = getStorage();
    const listRef = ref(storage);
    let res;
    const f = async () => {
      res = await listAll(listRef);
      setreceipts(res.items);
    };
    f();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Admin</Text>
      <FlatList
        data={receipts}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              const f = async () => {
                let res = await downloadAsync(
                  await getDownloadURL(ref(getStorage(), item.toString())),
                  documentDirectory + item.name
                );
                console.log(res.uri);
                await Sharing.shareAsync(res.uri);
              };
              f();
            }}
          >
            <View style={[styles.itemContainer, styles.boxshadow]}>
              <View style={styles.item}>
                <Text style={styles.text}> {item.name}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item.fullPath}
        numColumns={1}
      />
    </View>
  );
};

export default Admin;
