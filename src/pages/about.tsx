import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutLuxury() {
  return (
    <section className="relative py-32 bg-[#faf7f3] overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fff2e8] to-transparent opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          {/* Luxury Label */}
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-[#c9a24d]" />
            <p className="text-xs tracking-[0.3em] text-[#c9a24d] uppercase">
              Our Legacy
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#4a0f0b] leading-tight">
            Crafting Jewellery <br />
            <span className="text-[#7a1a12]">That Tells Your Story</span>
          </h2>

          {/* Long Description */}
          <div className="space-y-6 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              For generations, our jewellery has been more than just an ornament —
              it is a symbol of trust, tradition, and refined artistry. Rooted in
              timeless values and inspired by India’s rich heritage, we have been
              crafting jewellery that reflects purity, elegance, and emotional
              connection. Every piece we create carries a story of dedication,
              precision, and unmatched craftsmanship.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              Our skilled artisans blend traditional techniques with contemporary
              design to create jewellery that feels timeless yet modern. From
              intricate gold creations to elegant everyday wear, every design is
              thoughtfully handcrafted with attention to detail. We believe true
              luxury lies not just in appearance, but in quality you can feel and
              trust that lasts for generations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              With decades of trust and transparency, we continue to serve families
              who choose us for their most meaningful moments — weddings,
              celebrations, and milestones of life. Our promise is simple: authentic
              purity, honest pricing, and jewellery that becomes a cherished part
              of your legacy, passed down with pride and love.
            </motion.p>
          </div>

          {/* Signature */}
          <div className="pt-6">
            <p className="text-sm text-gray-500">— Since 1989</p>
          </div>
        </motion.div>

        {/* RIGHT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Gold frame */}
          <div className="absolute -inset-4 rounded-[2.5rem] border border-[#e7d8c6]" />

          {/* Image */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src="/rk_logo.png"
              alt="Luxury Jewellery Craftsmanship"
              width={800}
              height={900}
              className="w-full h-[520px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
