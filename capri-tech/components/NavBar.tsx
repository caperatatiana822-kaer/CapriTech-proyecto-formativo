"use client";
import { useState } from "react";
import LoginModal from "./login";

export default function NavBar(){
    const [menu, setMenu] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    return(
        <>
        <nav className="shadow-sm flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-[#d7ccc8] bg-[#f5efe6] relative transition-all">
            
            <a href="/">
            <img 
            src="/logo.jpg.png"
            alt="logo"
            className="w-16 md:w-15"></img>
            
            </a>
            
            <button onClick={() => setMenu(!menu)} className="md:hidden text-2xl text-[#5d4037]">
                ☰
            </button>

            <div className="hidden md:flex items-center gap-15">
                <a href="/" className=" text-lg text-[#5d4037] hover:text-[#8d6e63] font-medium transition duration-300">Inicio</a>
                <a href="/contacto" className=" text-lg text-[#5d4037] hover:text-[#8d6e63] font-medium transition duration-300">Contacto</a>
                <a href="/nosotros" className="text-lg text-[#5d4037] hover:text-[#8d6e63] font-medium transition duration-300">Nosotros</a>
                <LoginModal />
            </div>
            {menu && (
              <div className="md:hidden flex flex-col gap-3 mt-4 px-6 pb-4 bg-[#f5efe6] absolute top-full left-0 w-full border-b border-[#d7ccc8]">
                <a href="/" className="text-[#5d4037] hover:text-[#8d6e63] font-medium transition duration-300">Inicio</a>
                <a href="/contacto" className="text-[#5d4037] hover:text-[#8d6e63] font-medium transition duration-300">Contacto</a>
                <a href="/nosotros" className="text-[#5d4037] hover:text-[#8d6e63] font-medium transition duration-300">Nosotros</a>
                <LoginModal />
              </div>
            )}

        </nav>
        </>
    )
}