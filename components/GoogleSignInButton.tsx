import * as React from 'react';
import * as WebBrowser from 'expo-web-browser'
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { Text, View, StyleSheet,TouchableHighlight } from 'react-native';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import {FontAwesome5} from '@expo/vector-icons'

interface GsigninButtonProps {}
  WebBrowser.maybeCompleteAuthSession();


const GsigninButton = (props: GsigninButtonProps) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '990356104835-ekqr7hqo0hgcn5qrm4og9hir252r0n3b.apps.googleusercontent.com',
        },
      );
      React.useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          const auth = getAuth();
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(auth, credential);
        }
      }, [response]);

    let onLoginClicked = ()=>{
        promptAsync();
      }
  return (
    <TouchableHighlight
      onPress={() => onLoginClicked()}
      disabled = {!request}
      underlayColor="white">
      <View style={styles.loginButton}>
      <FontAwesome5 name="google" size={24} color="white" /> 
      <Text style={styles.google}>Sign in</Text>
      </View>
    </TouchableHighlight>
  );
};

export default GsigninButton;

const styles = StyleSheet.create({
    loginButton: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-around',
        backgroundColor: '#4285F4',
        height:50,
        width : '40%',
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      google: {
        fontSize : 24,
        color: 'white'
      },
});
