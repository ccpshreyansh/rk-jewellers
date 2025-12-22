"use client";

import { useEffect, useState } from "react";
import useAdminAuth from "@/utils/useAdminAuth";
import  {compressImageToBase}  from "@/utils/imageCom";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/categorieService";

export default function AddCategory() {
  useAdminAuth();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  // Convert image to base64
 const handleImagePick = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  const compressedBase64 = await compressImageToBase(
    file,
    600,   // width
    0.55   // quality
  );

  // Optional safety check
  const sizeInKB = (compressedBase64.length * 3) / 4 / 1024;
  console.log("Compressed size:", Math.round(sizeInKB), "KB");

  if (sizeInKB > 450) {
    alert("Image too large. Try another image.");
    return;
  }

  setImage(compressedBase64);
};


  const handleSubmit = async () => {
    if (!title || !image) {
      alert("Title & Image required");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateCategory(editingId, title, image);
        alert("Category updated");
      } else {
        await addCategory(title, image);
        alert("Category added");
      }

      setTitle("");
      setImage(null);
      setEditingId(null);
      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  const handleEdit = (cat: any) => {
    setTitle(cat.title);
    setImage(cat.image);
    setEditingId(cat.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">

        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Category" : "Add Category"}
        </h2>

        {/* Form */}
        <input
          type="text"
          placeholder="Category title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-4"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImagePick}
          className="mb-4"
        />

        {image && (
          <img
            src={`data:image/jpeg;base64,${image}`}
            className="h-40 rounded mb-4"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg"
        >
          {loading ? "Saving..." : editingId ? "Update" : "Add"}
        </button>

        {/* Category List */}
        <h3 className="text-lg font-semibold mt-8 mb-4">
          Existing Categories
        </h3>

        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 bg-gray-50 p-3 rounded"
            >
              <img
                src={`data:image/jpeg;base64,${cat.image}`}
                className="h-16 w-16 rounded object-cover"
              />
              <p className="flex-1 font-medium">{cat.title}</p>

              <button
                onClick={() => handleEdit(cat)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
