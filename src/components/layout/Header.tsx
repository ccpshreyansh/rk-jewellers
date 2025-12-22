

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose, IoHomeOutline, IoDiamondOutline, IoInformationCircleOutline, IoCallOutline } from "react-icons/io5";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: <IoHomeOutline size={20} /> },
    { name: "Products", href: "/products", icon: <IoDiamondOutline size={20} /> },
    { name: "About", href: "/about", icon: <IoInformationCircleOutline size={20} /> },
    { name: "Contact Us", href: "/contact", icon: <IoCallOutline size={20} /> },
  ];

  return (
<header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-200">



      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <Image
            src="/rk_logo.png"
            alt="RK Jewellery"
            width={75}
            height={55}
            className="rounded-full object-cover"
          />
          <h1 className="font-heading text-xl text-darkbrown tracking-wide">
            RK Jewellery
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="menu-link font-body flex items-center gap-2">
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-darkbrown text-3xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Slider */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-pearl shadow-xl transform transition-transform duration-300 ease-in-out z-50
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="font-heading text-lg text-darkbrown">Menu</h2>
          <button
            className="text-darkbrown text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IoClose />
          </button>
        </div>
        <nav className="flex flex-col mt-6 gap-6 px-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="menu-link font-body flex items-center gap-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Subtle Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#fff8f0] bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
