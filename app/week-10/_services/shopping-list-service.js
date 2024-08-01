import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const getItems = async (userId) => {
    try {
      const collectionRef = collection(db, "users", userId, "items");
      const itemsQuery = query(collectionRef);
      const querySnapshot = await getDocs(itemsQuery);
      let items = [];
      querySnapshot.forEach((doc) => {
        let item = {
          id: doc.id,
          ...doc.data(), // Correctly retrieve the document data
        };
        items.push(item);
      });
      return items;
    } catch (error) {
      console.log("Error getting items: ", error);
      return []; // Return an empty array on error
    }
  };

export const addItem = async (userId, newItem) => {
    try {
      const newCollectionRef = collection(db, "users", userId, "items");
      const newItemPromise = await addDoc(newCollectionRef, newItem);
      return newItemPromise.id;
    } catch (error) {
      console.log("Error adding item: ", error);
    }
  };