import {
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Text, View } from "react-native";
import GSigninButton from "../components/GoogleSignInButton";

export default function Login(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BlipKart</Text>
      <View style={styles.separator} />
      <GSigninButton />
      <View style={styles.separator} />
      <Button
        onPress={() => props.route.params.setisStoreAdmin(true)}
        title="Admin View"
      />
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
    height: 0,
    width: "80%",
  },
});
