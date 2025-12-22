

import { useState } from "react";
import Image from "next/image";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { addEnquiry } from "@/lib/enquiryService";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);


const [loading, setLoading] = useState(false);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !phone || !message) return;

  setLoading(true);
  try {
    await addEnquiry({
      name,
      phone,
      message,
    });

    setSent(true);
    setName("");
    setPhone("");
    setMessage("");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
  setLoading(false);
};

  const whatsappUrl = `https://wa.me/919572031045`;

  return (
    <section className="bg-[#fff] py-28">
      <div className="max-w-7xl mx-auto px-6 space-y-28">

        {/* ===================== SECTION 1 ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-[#eadfce]">
            <Image
              src="/images/banner.webp"
              alt="Jewellery Store"
              width={900}
              height={600}
              className="w-full h-[380px] object-cover"
            />
          </div>

          {/* STORE INFO */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-[#c9a24d] mb-4">
                Visit Our Store
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold text-[#4a0f0b] leading-tight">
                Experience Fine <br /> Jewellery Craftsmanship
              </h1>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eadfce] space-y-5">
              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-[#c9a24d] mt-1" />
                <p className="text-sm text-gray-600 leading-relaxed">
                   <br />
                  - RajKishore Gold Jewellery Pvt. Ltd., Purana Chowk, Near R.K. Sarees,  <br />
                  Buxar, Bihar - 802101
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <FaPhoneAlt className="text-[#c9a24d]" />
                <p className="text-sm text-gray-600">+91 9572031045</p>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-5">
              {[FaFacebookF, FaInstagram, FaWhatsapp].map((Icon, i) => (
                <a
                  key={i}
                  href={whatsappUrl}
                  className="w-12 h-12 rounded-full border border-[#c9a24d]
                             flex items-center justify-center
                             text-[#4a0f0b]
                             hover:bg-[#4a0f0b] hover:text-white transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== SECTION 2 ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

          {/* FORM */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-[#eadfce] p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a24d] mb-4">
              Contact
            </p>

            <h2 className="text-3xl font-semibold text-[#4a0f0b] mb-10">
              Book a Personal Consultation
            </h2>

            {sent ? (
              <div className="p-6 bg-[#fdf3e7] rounded-xl text-[#4a0f0b]">
                Thank you — our jewellery expert will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  required
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-full border border-[#eadfce]
                             focus:outline-none focus:ring-2 focus:ring-[#c9a24d]"
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  required
                  placeholder="Mobile Number"
                  className="w-full px-6 py-4 rounded-full border border-[#eadfce]
                             focus:outline-none focus:ring-2 focus:ring-[#c9a24d]"
                  onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                  required
                  placeholder="Your requirement"
                  className="w-full px-6 py-4 rounded-2xl border border-[#eadfce] h-36
                             focus:outline-none focus:ring-2 focus:ring-[#c9a24d]"
                  onChange={(e) => setMessage(e.target.value)}
                />

               <button
  type="submit"
  disabled={loading}
  className="w-full py-4 rounded-full
             bg-gradient-to-r from-yellow-400 via-[#4a0f0b] to-yellow-600
             text-white shadow-xl hover:scale-105 transition disabled:opacity-60"
>
  {loading ? "Submitting..." : "Request Call Back"}
</button>

              </form>
            )}
          </div>

          {/* MAP */}
          <div className="rounded-[2.5rem] overflow-hidden border border-[#eadfce] shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.853822293612!2d83.97530357409563!3d25.57652961623426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399275a8edc9187f%3A0x676217ad34f1eae!2sRajKishore%20Gold%20Jewellery!5e0!3m2!1sen!2sin!4v1766231913632!5m2!1sen!2sin"
              className="w-full h-full min-h-[520px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
