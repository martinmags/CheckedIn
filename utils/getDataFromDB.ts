import { db, getDocs, collection, doc, getDoc } from "../firebase";

export const getDataFromDB = async (collectionName : string, docName?: string) => {
  // If they are not specific on the doc then just return the whole collection
    if (docName !== undefined){
      const docRef = doc(db, collectionName, docName);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    }
  // Return the specific doc in the collection requested
    else {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = {}
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      return data;
    }
  }