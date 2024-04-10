import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './screens/LoginScreen';
import {CreateAccountScreen} from './screens/CreateAccountScreen';
import {HomeScreen} from './screens/HomeScreen';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from './firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID,
});

// TODO: Fix Route typing
type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// TODO Setup routing to go to CreateAccountScreen if new account, else route to HomeScreen
// TODO: Create an AuthContext in a separate file
// https://reactnavigation.org/docs/auth-flow

function App(): React.JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken}: any = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
      setIsSignedIn(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  const authenticatedRoutes = (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
    </>
  );

  const nonAuthenticatedRoutes = (
    <>
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {(props: any) => <LoginScreen {...props} googleSignIn={googleSignIn} />}
      </Stack.Screen>
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </>
  );
  return (
    <NavigationContainer>
      {/* TODO: Change initialRouteName to Home once we setup auth routing */}
      <Stack.Navigator initialRouteName="Home">
        {isSignedIn ? authenticatedRoutes : nonAuthenticatedRoutes}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
