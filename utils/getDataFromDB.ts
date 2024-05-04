import { db, getDocs, collection, doc, getDoc } from "../firebase";

export const getDataFromDB = async (collectionName : string, docName?: string) => {
    if (docName !== undefined){
      const docRef = doc(db, collectionName, docName);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      return docSnap.data();
    }
    else {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = {}
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      console.log(data);
      return data;
    }
  }