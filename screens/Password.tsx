import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

interface PasswordProps {}

const Password = (props: PasswordProps) => {
  const [AP, setAP] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setAP}
        style={styles.input}
        placeholderTextColor={"gray"}
        placeholder="Access Code"
      />
      <Button
        onPress={() => {
          if (AP == "00000000") props.route.params.setLoggedin(true);
        }}
        title="Get Access"
      />
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    height: 40,
    fontSize: "18px",
    width: "80%",
    borderColor: "black",
    borderBottomWidth: 2,
  },
});
