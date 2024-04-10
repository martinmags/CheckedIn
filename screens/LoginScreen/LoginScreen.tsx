import {View, Text} from 'react-native';
import React from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import styles from './LoginScreen.styles.ts';

const LoginScreen = ({googleSignIn}: {googleSignIn: any}) => {
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
