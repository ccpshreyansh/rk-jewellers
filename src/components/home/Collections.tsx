

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCategories } from "@/lib/categorieService";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  title: string;
  image: string;
  categoryId?: string;
  featured?: boolean;
}

const Collections = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
  }, [emblaApi]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchCategories();
      const formattedData = res.map((item: any, idx: number) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        categoryId: item.categoryId,
        featured: idx % 3 === 0,
      }));
      setCategories(formattedData);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <section className="py-12 px-4 md:px-16 bg-white-50">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif mb-2">Find Your Perfect Match</h2>
        <p className="text-gray-500">Shop by Categories</p>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4 pb-4">
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              displayedCategories.map((item) => (
             <div
  key={item.id}
  className="flex-none w-44 cursor-pointer group"
  onClick={() =>
    router.push(`/productpage?type=${item.title}&catId=${item.id}`)
  }
>
  {/* Image */}
  <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-md">
    <Image
      src={`data:image/jpeg;base64,${item.image}`}
      alt={item.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
  </div>

  {/* Title Outside */}
<p className="mt-4 text-center text-xs tracking-[0.25em] font-medium text-gray-800">
  {item.title.toUpperCase()}
</p>

</div>

              ))
            )}
          </div>
        </div>
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-2 space-x-2">
          {displayedCategories.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index ? "bg-yellow-500 w-3 h-3" : "bg-gray-300"
              }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {loading ? (
          <p className="text-gray-400 col-span-full text-center">Loading...</p>
        ) : (
          displayedCategories.map((item) => (
          <motion.div
  key={item.id}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="cursor-pointer group"
  onClick={() =>
    router.push(`/products?type=${item.title}&catId=${item.id}`)
  }
>
  {/* Image Card */}
  <div className="relative w-full h-44 sm:h-48 md:h-52 lg:h-56 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
    <Image
      src={`data:image/jpeg;base64,${item.image}`}
      alt={item.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />

    {item.featured && (
      <span className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
        Featured
      </span>
    )}
  </div>

  {/* Title Outside */}
  <p className="mt-4 text-center text-xs tracking-[0.25em] font-medium text-gray-800">
  {item.title.toUpperCase()}
</p>

</motion.div>

          ))
        )}
      </div>

      {/* Show More Button */}
    {categories.length > 6 && (
  <div className="flex justify-center mt-8">
    <button
      className="px-6 py-2 bg-gradient-to-r from-[#580F09] to-[#8A1C12] text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      onClick={() => router.push("/collections")}
    >
      Show More Collections
    </button>
  </div>
)}


      {/* Tailwind Keyframe for Featured shine */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shine {
          background: linear-gradient(120deg, #662020ff, #fff, #421d1bff);
          background-size: 200% 100%;
          animation: shine 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Collections;
