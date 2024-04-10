import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  auth,
  onAuthStateChanged,
  signOut as FirebaseSignOut,
} from '../firebase';
import {User as FirebaseUser} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

// Define the shape of your context
interface AuthContextType {
  user: FirebaseUser | null;
  googleSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  googleSignIn: async () => {},
  signOut: async () => {},
});

// Custom hook to use the AuthContext
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    configureGoogleSignIn();
    getCurrentUser();
  }, []);

  const configureGoogleSignIn = async () => {
    await GoogleSignin.configure({
      webClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID,
    });
  };

  const getCurrentUser = async () => {
    try {
      const currentUser: any = await GoogleSignin.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user}: any = await GoogleSignin.signIn();
      setUser(user);
    } catch (error: any) {
      console.log(error);
    }
  };

  const signOut = async () => {
    await FirebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, googleSignIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
