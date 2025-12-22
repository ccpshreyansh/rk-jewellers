
import { motion } from "framer-motion";

const stats = [
  { value: "25+", label: "Years of Trust" },
  { value: "12K+", label: "Happy Families" },
  { value: "500+", label: "Exclusive Designs" },
];

export default function LuxuryStats() {
  return (
    <section className="py-24 bg-[#fffaf6]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-4xl md:text-5xl font-semibold text-[#4a0f0b]">
              {stat.value}
            </p>
            <p className="text-sm tracking-widest text-gray-500 uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
