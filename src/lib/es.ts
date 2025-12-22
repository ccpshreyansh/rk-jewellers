import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";

const enquiryCollection = collection(db, "enquiries");

// Fetch all enquiries (latest first)
export const fetchEnquiries = async () => {
  const q = query(enquiryCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Delete enquiry
export const deleteEnquiry = async (id: string) => {
  await deleteDoc(doc(db, "enquiries", id));
};

// Mark enquiry as contacted
export const markContacted = async (id: string) => {
  await updateDoc(doc(db, "enquiries", id), {
    status: "contacted",
    updatedAt: new Date(),
  });
};
