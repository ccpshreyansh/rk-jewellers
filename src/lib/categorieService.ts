import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const categoriesCollection = collection(db, "firestoreCategories");

export const fetchCategories = async () => {
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addCategory = async (title: string, base64Image: string) => {
  await addDoc(categoriesCollection, {
    title,
    image: base64Image,
    createdAt: new Date(),
  });
};

export const updateCategory = async (
  id: string,
  title: string,
  base64Image: string
) => {
  await updateDoc(doc(db, "firestoreCategories", id), {
    title,
    image: base64Image,
    updatedAt: new Date(),
  });
};

export const deleteCategory = async (id: string) => {
  await deleteDoc(doc(db, "firestoreCategories", id));
};
