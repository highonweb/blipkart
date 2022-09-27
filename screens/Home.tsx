import * as React from 'react';
import { Text, View, StyleSheet,Image, Button } from 'react-native';
import {getAuth, signOut} from 'firebase/auth';

interface HomeProps {}

const Home = (props: HomeProps) => {
const auth = getAuth();
console.log(auth.currentUser);
const name = auth.currentUser?.displayName;
const photoURL = auth.currentUser?.photoURL;
  return (
    <View style={styles.container}>
      <Text>Hello {name}</Text>

      <Image
        style={styles.tinyLogo}
        source={{
          uri: photoURL,
        }}
      />

      <Button onPress={()=>{
        signOut(auth).then(() => {
  // Sign-out successful.
  console.log("Signed out!");
  
}).catch((error) => {
  // An error happened.
  console.log(error);
  
});}} title="Sign Out" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo:{
    width: 100,
    height: 100,
    borderRadius: '50%',
  }
});
