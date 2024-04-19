import React from "react";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./context/AuthContext";

// TODO: Fix Route typing
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Handles navigation and determines authentication flow
 *
 * @returns
 */
const StackNavigator = () => {
  const { user } = useAuth();

  const authenticatedRoutes = (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* ...plus other authenticated routes */}
    </Stack.Navigator>
  );

  const nonAuthenticatedRoutes = (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* ...plus other non authenticated routes */}
    </Stack.Navigator>
  );

  // return nonAuthenticatedRoutes;

  return user ? authenticatedRoutes : nonAuthenticatedRoutes;
};

export default StackNavigator;
