// TODO: Might scrap;
import {View, Text, Button, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../../context/AuthContext.tsx';
import styles from './SignUpScreen.styles.ts';
const SignUpScreen = () => {
  const {user} = useAuth();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View>
      <Text>username</Text>
      <TextInput
        style={styles.input}
        value={user?.displayName || username}
        placeholder={user?.displayName || username}
        keyboardType="numeric"
        onChangeText={text => setUserName(text)}
      />
      <Text>email</Text>
      <TextInput value={email} onChangeText={value => setEmail(value)} />
      <Text>password</Text>
      <TextInput value={password} onChangeText={value => setEmail(password)} />
      {/* <Button title="Create Account" onPress={() => setIsSignedIn(true)} /> */}
    </View>
  );
};

export default SignUpScreen;
