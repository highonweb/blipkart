import { get, getDatabase, onValue, ref } from "firebase/database";
import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import Buy_now_Button from "../components/Buy_now";
import Add_to_Cart from "../components/Add_to_cart";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

interface ProductPageProps {}

const ProductPage = (props: ProductPageProps) => {
  const [product, setProduct] = useState({});
  const [isloading, setisloading] = useState(true);
  const [qty, setqty] = useState(0);
  useEffect(() => {
    const db = getDatabase();
    // console.log("Products/" + (props.route.params.pid - 1));
    onValue(ref(db, "Products/" + (props.route.params.pid - 1)), (snapshot) => {
      setProduct(snapshot.val());
    });
    setisloading(false);
  }, []);
  if (isloading)
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.name}>{product.Name}</Text>
        <Text style={styles.price}>{product.Price}</Text>
        <Text style={styles.qty}>{product.qty} pieces availabe </Text>
        <View style={styles.separator} />
        <TextInput
          placeholder="Quantity"
          onChangeText={setqty}
          keyboardType="numeric"
          placeholderTextColor="gray"
          style={styles.input}
        ></TextInput>
        <View style={styles.separator}></View>

        <Buy_now_Button product={product} qty={qty} pid={product.pid - 1} />
        <View style={styles.separator}></View>

        <Add_to_Cart
          nav={props.navigation}
          product={product}
          qty={qty}
          pid={product.pid - 1}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    fontSize: "18px",
    width: "40%",
    borderColor: "black",
    borderBottomWidth: 2,
  },
  price: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  qty: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 0,
    width: "80%",
  },
});
