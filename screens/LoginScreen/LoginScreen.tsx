import { View, Text, Button } from "react-native";
import React from "react";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import styles from "./LoginScreen.styles";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const { googleSignIn } = useAuth();

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
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => googleSignIn()}
        /> */}
        <Button title="Sign In" onPress={() => googleSignIn()} />
      </View>
    </View>
  );
};

export default LoginScreen;
