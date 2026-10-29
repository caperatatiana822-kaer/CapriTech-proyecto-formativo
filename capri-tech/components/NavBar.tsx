"use client";
import { useState } from "react";
import LoginModal from "./login";

export default function NavBar() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="shadow-sm flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-100 bg-white relative transition-all">
        
        <a href="/">
          <img
            src="/logo.jpg.png"
            alt="logo"
            className="w-14 md:w-14"
          />
        </a>

        <button
          onClick={() => setMenu(!menu)}
          className="md:hidden text-2xl text-gray-700 hover:text-[#844243] transition"
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <div className="hidden md:flex items-center gap-10">
          <a
            href="/"
            className="text-base text-gray-800 hover:text-[#844243] font-medium transition duration-300"
          >
            Inicio
          </a>
          <a
            href="/contact"
            className="text-base text-gray-800 hover:text-[#844243] font-medium transition duration-300"
          >
            Contacto
          </a>
          <a
            href="/about"
            className="text-base text-gray-800 hover:text-[#844243] font-medium transition duration-300"
          >
            Nosotros
          </a>
          <LoginModal />
        </div>

        {menu && (
          <div className="md:hidden flex flex-col gap-4 mt-4 px-6 pb-6 pt-2 bg-white absolute top-full left-0 w-full border-b border-gray-100 shadow-md z-50">
            <a
              href="/"
              className="text-gray-800 hover:text-[#844243] font-medium transition duration-300 py-2"
            >
              Inicio
            </a>
            <a
              href="/contact"
              className="text-gray-800 hover:text-[#844243] font-medium transition duration-300 py-2"
            >
              Contacto
            </a>
            <a
              href="/about"
              className="text-gray-800 hover:text-[#844243] font-medium transition duration-300 py-2"
            >
              Nosotros
            </a>
            <div className="pt-2">
              <LoginModal />
            </div>
          </div>
        )}

      </nav>
    </>
  );
}