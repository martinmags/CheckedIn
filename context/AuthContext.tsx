import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  auth,
  onAuthStateChanged,
  signOut as FirebaseSignOut,
  signInWithCredential,
  GoogleAuthProvider,
} from "../firebase";
import { User as FirebaseUser } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

// import {addUserToFirestore} from '../utils/addUserToFirestore';

// Define the shape of your context
interface AuthContextType {
  user: FirebaseUser | null;
  googleSignIn: () => {};
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  googleSignIn: async () => {},
  signOut: async () => {},
});

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [request, response, googleSignIn] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token, access_token } = response?.params;

      //@ts-ignore
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await FirebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, googleSignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
