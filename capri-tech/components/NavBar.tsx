"use client";
import { useState } from "react";
import LoginModal from "./login";

export default function NavBar(){
    const [menu, setMenu] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    return(
        <>
        <nav className="shadow-sm flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            
            <a href="/">
            <img 
            src="/logo1.jpg.png"
            alt="logo"
            className="w-16 md:w-15"></img>
            
            </a>
            
            <button onClick={() => setMenu(!menu)} className="md:hidden text-2xl">
                ☰
            </button>

            <div className="hidden md:flex items-center gap-8">
                <a href="/" className="hover:text-green-700">Inicio</a>
                <a href="/contacto" className="hover:text-green-700">Contacto</a>
                <a href="/nosotros" className="hover:text-green-700">Nosotros</a>
                <LoginModal/>
            </div>
            {menu && (
              <div className="md:hidden flex flex-col gap-3 mt-4 px-6 pb-4 bg-white absolute top-full left-0 w-full">
                <a href="/" className="hover:text-green-700">Inicio</a>
                <a href="/contacto" className="hover:text-green-700">Contacto</a>
                <a href="/nosotros" className="hover:text-green-700">Nosotros</a>
                <LoginModal />
              </div>
            )}

        </nav>
        </>
    )
}
