import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { ref, set, getDatabase, get } from "firebase/database";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { FontAwesome5 } from "@expo/vector-icons";

const Home = (props: HomeProps) => {
  const Auth = React.useContext(AuthContext);
  const [auth, setauth] = useState({});
  const [age, onChangeAge] = useState(18);
  const [name, onChangeName] = useState("");
  const [gender, onChangeGender] = useState("");

  const [isloading, setisloading] = useState(true);
  React.useEffect(() => {
    const auth = getAuth();
    setauth(auth);
    Auth.setuid(auth.currentUser?.uid);
    if (auth.currentUser?.displayName != undefined) {
      setisloading(false);
      const db = getFirestore();
      onChangeName(auth.currentUser?.displayName);
      getDoc(doc(db, "Users", auth.currentUser.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          props.route.params.reg(true);
        }
      });
    }
  });

  if (isloading) {
    console.log(auth.currentUser?.displayName);
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const submitForm = () => {
    const db = getFirestore();
    console.log(Auth.uid);
    setDoc(doc(db, "Users", String(auth.currentUser?.uid)), {
      name: name,
      age: age,
      gender: gender,
    });
    props.route.params.reg(true);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>Sign Up</Text>
      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        placeholder="Name"
        value={name}
      />
      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        onChangeText={onChangeAge}
        value={age}
        placeholder="Age"
        keyboardType="numeric"
      />

      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        onChangeText={onChangeGender}
        value={gender}
        placeholder="Gender"
      />

      <View style={styles.separator} />
      <TouchableHighlight onPress={() => submitForm()} underlayColor="white">
        <View style={styles.loginButton}>
          <FontAwesome5 name="check" size={24} color="white" />
          <Text style={styles.google}>Submit</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    // borderRadius: "50%",
  },
  input: {
    height: 40,
    fontSize: "18px",
    width: "80%",
    borderColor: "black",
    borderBottomWidth: 2,
  },
  loginButton: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-around",
    backgroundColor: "#4285F4",
    height: 50,
    width: "35%",
    borderRadius: 5,
    alignItems: "center",
  },
  boxshadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  google: {
    fontSize: 24,
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 0,
    width: "80%",
  },
});
