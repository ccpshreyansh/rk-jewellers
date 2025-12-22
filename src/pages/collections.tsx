import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { fetchCategories } from "@/lib/categorieService";

interface Category {
  id: string;
  title: string;
  image: string;
  featured?: boolean;
}

const CollectionsPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchCategories();
      const formatted = res.map((cat: any, idx: number) => ({
        ...cat,
        featured: idx % 4 === 0, // mark some as featured for premium look
      }));
      setCategories(formatted);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-16 bg-white">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => router.push("/")}
        >
          Home
        </span>{" "}
        / All Collections
      </div>

      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
          Explore All Collections
        </h1>
        <p className="text-gray-500 text-lg">Discover your perfect jewellery</p>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <p className="text-center text-gray-400">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className="cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() =>
                router.push(`/products?catId=${cat.id}&type=${cat.title}`)
              }
            >
              <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <Image
                  src={`data:image/jpeg;base64,${cat.image}`}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {cat.featured && (
                  <span className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-4 text-center text-sm font-medium text-gray-800 tracking-wide">
                {cat.title.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CollectionsPage;
