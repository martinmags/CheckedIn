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
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { addUserToFirestore } from "../utils/addUserToFirestore";
import { makeRedirectUri } from "expo-auth-session";

interface User {
  displayName: string | null;
  email?: string | null;
  phoneNumber?: string | null; // Marked as optional in the interface
  photoURL?: string | null;
  providerId?: string | undefined;
  uid?: string | undefined;
  isAnonymous: boolean;
  emailVerified: boolean;
}
// TODO: HANDLE ASYNC STOAGE
interface AuthContextType {
  user: User | null;
  googleSignIn: () => {};
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user:
    {
      displayName: "",
      isAnonymous: false,
      emailVerified: false,
      phoneNumber: "",
      photoURL: "",
      providerId: "",
      uid: "",
    } || null,
  googleSignIn: async () => {},
  signOut: async () => {},
});

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, googleSignIn] = Google.useAuthRequest({
    redirectUri: makeRedirectUri({
      scheme: "com.martinimugs.checkedin",
    }),
    expoClientId: process.env.EXPO_PUBLIC_FIREBASE_EXPO_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token, access_token } = response?.params;

      //@ts-ignore
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userInfo = {
          displayName: firebaseUser?.displayName,
          isAnonymous: firebaseUser?.isAnonymous,
          emailVerified: firebaseUser?.emailVerified,
          photoUrl: firebaseUser?.providerData,
          ...firebaseUser?.providerData?.at(0),
        };
        setUser(userInfo);
        addUserToFirestore(userInfo);
      } else {
        console.log("Logged out user");
      }
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
