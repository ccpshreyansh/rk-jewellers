"use client";

import { useEffect, useState } from "react";
import useAdminAuth from "@/utils/useAdminAuth";
import { addProduct, fetchProducts, deleteProduct , updateProduct} from "@/lib/productService";
import { fetchCategories } from "@/lib/categorieService";
import { compressImageToBase } from "@/utils/imageCom";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function AddProduct() {
  useAdminAuth();


const [editProduct, setEditProduct] = useState<any | null>(null);
const [editImages, setEditImages] = useState<(string | null)[]>([null, null, null]);
const [editLoading, setEditLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState<number | "">("");
 const [karat, setKarat] = useState("");
const [extraCharges, setExtraCharges] = useState<number | "">("");

  const [making, setMaking] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  const [categories, setCategories] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const generateProductId = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    return `p${String(snapshot.size + 1).padStart(3, "0")}`;
  };

  // Upload single image slot
  const handleSingleImage = async (file: File, index: number) => {
    const base64 = await compressImageToBase(file, 800, 0.6);
    const updated = [...images];
    updated[index] = base64;
    setImages(updated);
  };

  const handleSubmit = async () => {
    const finalImages = images.filter(Boolean) as string[];

    if (!title || !categoryId || finalImages.length === 0) {
      alert("Title, Category & at least 1 image required");
      return;
    }

    setLoading(true);
    try {
      const productId = await generateProductId();

   await addProduct({
  title,
  image: finalImages[0],
  productImages: finalImages,
  weight: Number(weight),
  karat,                       // string now
  making: Number(making),
  extraCharges: Number(extraCharges),
  description,
  categoryId,
  show: true,
  stock: true,
  productId,
  createdAt: new Date(),
});


      alert("Product added");

      setTitle("");
      setWeight("");
      setKarat("");
      setKarat("");
setExtraCharges("");

      setMaking("");
      setDescription("");
      setImages([null, null, null]);
      setCategoryId("");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
    setLoading(false);
  };

  /* ================= Fetch Products ================= */

  const fetchByCategory = async () => {
    if (!filterCategory) return alert("Select category");
    const all = await fetchProducts();
    setProducts(all.filter(p => p.categoryId === filterCategory));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    fetchByCategory();
  };
const handleEditImage = async (file: File, index: number) => {
  const base64 = await compressImageToBase(file, 800, 0.6);
  const updated = [...editImages];
  updated[index] = base64;
  setEditImages(updated);
};

  const handleUpdateProduct = async () => {
  if (!editProduct) return;

  setEditLoading(true);
  try {
    const finalImages = editImages.filter(Boolean);
await updateProduct(editProduct.id, {
  title: editProduct.title,
  weight: editProduct.weight,
  karat: editProduct.karat,
  making: editProduct.making,
  extraCharges: editProduct.extraCharges,
  description: editProduct.description,
  categoryId: editProduct.categoryId,
  image: finalImages[0],
  productImages: finalImages,
});


    alert("Product updated");
    setEditProduct(null);
    fetchByCategory();
  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
  setEditLoading(false);
};


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-xl sm:text-2xl font-semibold text-[#4a0f0b] mb-6">
          Add Product
        </h1>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input-maroon" placeholder="Product title" value={title} onChange={e => setTitle(e.target.value)} />
          <select className="input-maroon" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">Select category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
          </select>

          <input className="input-maroon" type="number" placeholder="Weight (gm)" value={weight} onChange={e => setWeight(Number(e.target.value))} />
          {/* <input className="input-maroon" type="number" placeholder="Karat" value={karat} onChange={e => setKarat(Number(e.target.value))} /> */}
         
         <select
  className="input-maroon"
  value={karat}
  onChange={(e) => setKarat(e.target.value)}
>
  <option value="">Select Karat</option>
  <option value="Gold14k">Gold 14k</option>
  <option value="Gold18k">Gold 18k</option>
  <option value="Gold22k">Gold 22k</option>
  <option value="Gold24k">Gold 24k</option>
  <option value="Silver24k">Silver 24k</option>
</select>

         
          <input className="input-maroon" type="number" placeholder="Making charge" value={making} onChange={e => setMaking(Number(e.target.value))} />
        </div>

        <textarea className="input-maroon mt-4 h-24" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
<input
  className="input-maroon"
  type="number"
  placeholder="Extra Charges (₹)"
  value={extraCharges}
  onChange={(e) => setExtraCharges(Number(e.target.value))}
/>

        {/* Image Upload Icons */}
        <div className="mt-6">
          <p className="font-medium text-[#4a0f0b] mb-3">Product Images</p>

          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <label
                key={i}
                className="h-28 border-2 border-dashed border-[#580F09] rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                {images[i] ? (
                  <img
                    src={`data:image/jpeg;base64,${images[i]}`}
                    className="h-full w-full object-cover rounded"
                  />
                ) : (
                  <span className="text-3xl text-[#580F09]">＋</span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files &&
                    handleSingleImage(e.target.files[0], i)
                  }
                />
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading} className="mt-8 px-8 py-3 bg-[#580F09] text-white rounded-lg">
          {loading ? "Saving..." : "Add Product"}
        </button>

        {/* ================= Fetch Section ================= */}
        <hr className="my-10" />

        <h2 className="text-lg font-semibold text-[#4a0f0b] mb-4">
          Fetch Products by Category
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <select className="input-maroon" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="">Select category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
          </select>

          <button onClick={fetchByCategory} className="px-6 py-3 bg-[#580F09] text-white rounded-lg">
            Fetch
          </button>
        </div>
{editProduct && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
    <div className="bg-white w-full max-w-2xl rounded-xl p-6 overflow-y-auto max-h-[90vh]">

      <h2 className="text-xl font-semibold text-[#4a0f0b] mb-4">
        Edit Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input-maroon"
          value={editProduct.title}
          onChange={(e) =>
            setEditProduct({ ...editProduct, title: e.target.value })
          }
        />

        <select
          className="input-maroon"
          value={editProduct.categoryId}
          onChange={(e) =>
            setEditProduct({ ...editProduct, categoryId: e.target.value })
          }
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="input-maroon"
          value={editProduct.weight}
          onChange={(e) =>
            setEditProduct({ ...editProduct, weight: Number(e.target.value) })
          }
        />

       <select
  className="input-maroon"
  value={editProduct.karat}
  onChange={(e) =>
    setEditProduct({ ...editProduct, karat: e.target.value })
  }
>
  <option value="Gold14k">Gold 14k</option>
  <option value="Gold18k">Gold 18k</option>
  <option value="Gold22k">Gold 22k</option>
  <option value="Gold24k">Gold 24k</option>
  <option value="Silver24k">Silver 24k</option>
</select>


        <input
          type="number"
          className="input-maroon"
          value={editProduct.making}
          onChange={(e) =>
            setEditProduct({ ...editProduct, making: Number(e.target.value) })
          }
        />
      </div>

      <textarea
        className="input-maroon mt-4 h-24"
        value={editProduct.description}
        onChange={(e) =>
          setEditProduct({ ...editProduct, description: e.target.value })
        }
      />
<input
  type="number"
  className="input-maroon"
  value={editProduct.extraCharges || ""}
  onChange={(e) =>
    setEditProduct({
      ...editProduct,
      extraCharges: Number(e.target.value),
    })
  }
/>

      {/* Image Edit */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <label
            key={i}
            className="h-24 border-2 border-dashed border-[#580F09] rounded flex items-center justify-center cursor-pointer"
          >
            {editImages[i] ? (
              <img
                src={`data:image/jpeg;base64,${editImages[i]}`}
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <span className="text-3xl text-[#580F09]">＋</span>
            )}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleEditImage(e.target.files[0], i)
              }
            />
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditProduct(null)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateProduct}
          disabled={editLoading}
          className="px-6 py-2 bg-[#580F09] text-white rounded"
        >
          {editLoading ? "Updating..." : "Update"}
        </button>
      </div>

    </div>
  </div>
)}

        {/* Product List */}
        <div className="mt-6 space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
              <img src={`data:image/jpeg;base64,${p.image}`} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-gray-500">{p.productId}</p>
              </div>

            <button
  onClick={() => {
    setEditProduct(p);
    setEditImages([
      p.productImages?.[0] || null,
      p.productImages?.[1] || null,
      p.productImages?.[2] || null,
    ]);
  }}
  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
>
  Update
</button>

              <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
