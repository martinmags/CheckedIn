import {View, Text} from 'react-native';
import React from 'react';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from '../../firebase';
import Config from 'react-native-config';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import styles from './LoginScreen.styles.ts';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID,
});

const LoginScreen = () => {
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken}: any = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Checked In</Text>
        <Text style={styles.textDescription}>
          Check yourself before you wreck yourself
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => googleSignIn()}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
