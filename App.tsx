import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import StackNavigator from "./StackNavigator";

function App(): React.JSX.Element {
  return (
    <NavigationContainer
      children={
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      }
    />
  );
}

export default App;
