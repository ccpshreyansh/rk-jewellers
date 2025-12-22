import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { getMetalPrices } from "@/lib/metalPriceService";

export default function ProductDetails({ product, metalPrices }: any) {
  const router = useRouter();

  const images =
    product.productImages?.length > 0 ? product.productImages : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Compute 1gm rate based on karat
  const getOneGramRate = () => {
    if (!metalPrices) return 0;

    switch (product.karat) {
      case "Gold14k":
        return metalPrices.gold?.["14k"] || 0;
      case "Gold18k":
        return metalPrices.gold?.["18k"] || 0;
      case "Gold22k":
        return metalPrices.gold?.["22k"] || 0;
      case "Gold24k":
        return metalPrices.gold?.["24k"] || 0;
      case "Silver24k":
        return metalPrices.silver?.["24k"] || 0;
      default:
        return 0;
    }
  };

  const oneGramRate = getOneGramRate();
  const basePrice = product.weight * oneGramRate;
  const makingCharge = (product.making / 100) * basePrice;
  const extraCharges = product.extraCharges || 0;

  const subTotal = basePrice + makingCharge + extraCharges;
  const gst = subTotal * 0.03;

  const totalPrice = Math.round(subTotal + gst);

  return (
    <section className="bg-[#fffaf3] py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <span onClick={() => router.push("/")} className="cursor-pointer hover:underline">
            Home
          </span>{" "}
          /{" "}
          <span onClick={() => router.push("/collections")} className="cursor-pointer hover:underline">
            Collections
          </span>{" "}
          /{" "}
          <span className="text-[#7a5a18] font-medium">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="rounded-3xl overflow-hidden border border-[#e6c98b] shadow-lg">
              <Image
                src={`data:image/jpeg;base64,${selectedImage}`}
                alt={product.title}
                width={900}
                height={1000}
                className="w-full h-[420px] md:h-[520px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {images.map((img: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 ${
                    selectedImage === img ? "border-[#d4af37]" : "border-[#e7d8c6]"
                  }`}
                >
                  <Image
                    src={`data:image/jpeg;base64,${img}`}
                    alt=""
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3a0b07]">
              {product.title}
            </h1>

            <div className="flex gap-4 text-sm text-gray-600">
              <span>{product.karat}</span>
              <span>•</span>
              <span>{product.weight} gm</span>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Charges */}
            <div className="bg-white rounded-xl p-5 border border-[#e6c98b] space-y-2">
              <p className="flex justify-between text-sm">
                <span>Gold Price</span>
                <span>₹ {basePrice.toLocaleString()}</span>
              </p>

              <p className="flex justify-between text-sm">
                <span>Making ({product.making}%)</span>
                <span>₹ {makingCharge.toLocaleString()}</span>
              </p>

              {extraCharges > 0 && (
                <p className="flex justify-between text-sm">
                  <span>Extra Charges</span>
                  <span>₹ {extraCharges.toLocaleString()}</span>
                </p>
              )}

              <p className="flex justify-between text-sm">
                <span>GST (3%)</span>
                <span>₹ {gst.toLocaleString()}</span>
              </p>

              <hr />

              <p className="flex justify-between text-lg font-semibold text-[#3a0b07]">
                <span>Total Price</span>
                <span>₹ {totalPrice.toLocaleString()}</span>
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  `Hello, I am interested in this jewellery:\n\n` +
                    `Product: ${product.title}\n` +
                    `Karat: ${product.karat}\n` +
                    `Weight: ${product.weight} gm\n` +
                    `Price: ₹ ${totalPrice}\n\n` +
                    `Please share more details.`
                );

                window.open(`https://wa.me/919572031045?text=${message}`, "_blank");
              }}
              className="mt-4 w-fit px-10 py-4 rounded-xl font-medium text-white
    bg-gradient-to-r from-[#3a0b07] to-[#7a2d1b]
    shadow-lg hover:scale-105 transition-transform"
            >
              Enquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SERVER SIDE ================= */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  // Fetch product
  const q = query(collection(db, "products"), where("__name__", "==", id));
  const snap = await getDocs(q);

  if (snap.empty) return { notFound: true };

  const productDoc = snap.docs[0];
  const product = productDoc.data();

  // Fetch metal prices
  const metalPrices = await getMetalPrices();

  return {
    props: {
      product: {
        id: productDoc.id,
        ...product,
        createdAt: product.createdAt?.toMillis() || null,
        updatedAt: product.updatedAt?.toMillis() || null,
      },
      metalPrices,
    },
  };
};
