// TODO
import {View, Text, Button} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import React from 'react';

const HomeScreen = () => {
  const {signOut} = useAuth();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => signOut()} title="sign out" />
    </View>
  );
};

export default HomeScreen;
