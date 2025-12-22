import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const enquiryCollection = collection(db, "enquiries");

export const addEnquiry = async (data: {
  name: string;
  phone: string;
  message: string;
}) => {
  const now = new Date();

  await addDoc(enquiryCollection, {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
    date: now.toLocaleDateString("en-GB"), // 20/01/2025
    time: now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  
};
