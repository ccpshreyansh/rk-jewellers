import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";

const priceDocRef = doc(db, "metalPrices", "today");

/**
 * ADMIN: Update daily metal prices
 */
export const updateMetalPrices = async (data: {
  gold14k: number;
  gold18k: number;
  gold22k: number;
  gold24k: number;
  silver24k: number;
}) => {
  const now = new Date();

  await setDoc(priceDocRef, {
    gold: {
      "14k": data.gold14k,
      "18k": data.gold18k,
      "22k": data.gold22k,
      "24k": data.gold24k,
    },
    silver: {
      "24k": data.silver24k,
    },
    updatedAt: serverTimestamp(), // Firebase Timestamp
    date: now.toLocaleDateString("en-GB"), // DD/MM/YYYY
    time: now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  });
};

/**
 * PUBLIC: Get today metal prices (JSON-serializable)
 */
export const getMetalPrices = async () => {
  const snap = await getDoc(priceDocRef);

  if (!snap.exists()) return null;

  const data = snap.data();

  // Convert Firebase Timestamp to milliseconds
  const updatedAt =
    data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : null;

  return {
    ...data,
    updatedAt,
  };
};
