// productsService.ts
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

/* =========================
   Types
========================= */

export interface Product {
  productId: string;
  title: string;
  image: string;
  productImages: string[];
  weight: number;
  karat: string;           // ✅ changed
  making: number;
  extraCharges: number;    // ✅ new
  description: string;
  show: boolean;
  stock: boolean;
  categoryId: string;
  createdAt?: any;
  updatedAt?: any;
}


/* =========================
   Fetch Products
========================= */

// Fetch all products once
export const fetchProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Product),
  }));
};

// Real-time listener
export const subscribeProducts = (
  callback: (data: Product[]) => void
) => {
  return onSnapshot(
    productsCollection,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));
      callback(data);
    }
  );
};

/* =========================
   Add Product
========================= */

export const addProduct = async (product: Product) => {
  await addDoc(productsCollection, {
    ...product,
    createdAt: serverTimestamp(),
  });
};

/* =========================
   Update Product
========================= */

// export const updateProduct = async (
//   id: string,
//   product: Partial<Product>
// ) => {
//   await updateDoc(doc(db, "products", id), {
//     ...product,
//     updatedAt: serverTimestamp(),
//   });
// };

// productService.ts
export const updateProduct = async (id: string, product: any) => {
  await updateDoc(doc(db, "products", id), {
    ...product,
    updatedAt: new Date(),
  });
};


/* =========================
   Delete Product
========================= */

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, "products", id));
};
