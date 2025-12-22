import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { fetchCategories } from "@/lib/categorieService";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

interface Category {
  id: string;
  title: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  featured?: boolean;
}


export const fetchProductsByCategory = async (categoryId: string) => {
  const q = query(collection(db, "products"), where("categoryId", "==", categoryId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const ProductsPage = () => {
  const router = useRouter();
  const { catId, type } = router.query;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    typeof catId === "string" ? catId : null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res);
      if (!selectedCategory && res.length) {
        setSelectedCategory(res[0].id);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to fetch categories");
    }
  };

  const loadProducts = async (categoryId: string) => {
    setLoading(true);
    try {
      const res = await fetchProductsByCategory(categoryId);
      setProducts(res);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-16 py-10 bg-white">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>
          Home
        </span>{" "}
        /{" "}
        <span className="cursor-pointer hover:underline" onClick={() => router.push("/collections")}>
          Collections
        </span>{" "}
        {type && <> / {type}</>}
      </div>

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
        {type ? type : "Products"}
      </h1>

      {/* Category Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full border text-sm whitespace-nowrap transition-colors duration-300
              ${
                selectedCategory === cat.id
                  ? "bg-[#580F09] text-white border-[#580F09]"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {products.map((product) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl border border-[#e6c98b] shadow-sm hover:shadow-xl hover:border-[#d4af37] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <Image
          src={`data:image/jpeg;base64,${product.image}`}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-3 text-center space-y-1">
        <p className="text-sm font-semibold text-[#3a0b07] line-clamp-1">
          {product.title}
        </p>
        <p className="text-xs text-gray-500">
          {product.weight} gm · {product.karat}
        </p>

        {/* CTA */}
        <button
          onClick={() => router.push(`/products/${product.id}`)}
          className="mt-2 w-full text-xs py-2 rounded-lg border border-[#d4af37] text-[#7a5a18] font-medium
          bg-gradient-to-r from-[#fff6d8] to-[#f3e2b3]
          hover:from-[#f3e2b3] hover:to-[#fff6d8]
          transition-all duration-300"
        >
          Check Details
        </button>
      </div>
    </motion.div>
  ))}
</div>

      )}
    </section>
  );
};

export default ProductsPage;
