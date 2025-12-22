import Image from "next/image";
import { useRouter } from "next/router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
// lib/productService.ts
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export const fetchRecentProducts = async (limitCount = 10) => {
  const q = query(
    collection(db, "products"),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export default function PremiumProductSlider() {
  const [products, setProducts] = useState<any[]>([]);
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const recentProducts = await fetchRecentProducts(10); // fetch top 10
        setProducts(recentProducts);
      } catch (err) {
        console.log("Failed to fetch recent products:", err);
      }
    };
    loadProducts();
  }, []);

  const handleProductClick = (product: any) => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/products/${product.id}`); // navigate to product details
  };

  if (!products.length) return null; // or a loader

  return (
    <section className="py-24 bg-[#fff]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3a0b07]">
            Buxar Favourites
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            Crafted in the Heart of Buxar — Adorn Yourself with Timeless Grace & Tradition
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer min-w-[260px] sm:min-w-[300px] lg:min-w-[340px] group"
              >
                <div className="relative rounded-3xl bg-[#fff7f2] border border-[#e7d8c6] overflow-hidden">
                  <Image
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    width={500}
                    height={600}
                    className="object-cover w-full h-[360px] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-sm text-white tracking-wide">
                      View Details →
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-center space-y-1">
                  <p className="text-[11px] uppercase tracking-widest text-gray-500">
                    {product.category}
                  </p>
                  <h3 className="text-base font-medium text-[#3a0b07]">{product.title}</h3>
                  <p className="text-xs text-[#7a6a4f]">{product.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
