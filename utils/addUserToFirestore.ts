import {db, doc, setDoc} from '../firebase';
import {User as FirebaseUser} from 'firebase/auth';

/**
 * Add an Authenticated User to Firestore "users" collection
 *
 * @param user Authenticated User
 */
export const addUserToFirestore = async (user: FirebaseUser) => {
  if (user) {
    try {
      await setDoc(doc(db, 'users', String(user.email)), user);
      console.log('Added User to Firestore (if DNE)');
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
  } else {
    console.log('No user is currently authenticated.');
  }
};
