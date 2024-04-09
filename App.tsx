import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './screens/LoginScreen';
import {CreateAccountScreen} from './screens/CreateAccountScreen';
import {HomeScreen} from './screens/HomeScreen';

// TODO: Fix Route typing
type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// TODO Setup routing to go to CreateAccountScreen if new account, else route to HomeScreen
// https://reactnavigation.org/docs/auth-flow

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      {/* TODO: Change initialRouteName to Home once we setup auth routing */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
