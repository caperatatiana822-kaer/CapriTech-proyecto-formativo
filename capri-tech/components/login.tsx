"use client";
import { useState } from "react";

export default function LoginModal() {
  const [abrir, setAbrir] = useState(false);
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <button
        onClick={() => setAbrir(true)}
        className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-[#8d6e63]"
      >
        Ingresar
      </button>

      {abrir && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96 relative shadow-xl">
            <button
              onClick={() => setAbrir(false)}
              className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-gray-700 transition"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-[#5d4037]">
              {modo === "login"
                ? "Iniciar Sesión"
                : "Recuperar Contraseña"}
            </h2>

            {modo === "login" ? (
              <>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingresa tu correo electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingresa tu contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
                  />
                </div>

                <p
                  onClick={() => setModo("recuperar")}
                  className="text-blue-600 text-sm cursor-pointer hover:underline mb-6 text-right"
                >
                  ¿Olvidaste tu contraseña?
                </p>

                <button
                  className="w-full bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] py-3 rounded-lg font-medium transition border border-[#8d6e63]"
                >
                  Entrar
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingresa tu correo electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition"
                  />
                </div>

                <button
                  className="w-full bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] py-3 rounded-lg font-medium transition border border-[#8d6e63]"
                >
                  Recuperar
                </button>

                <p
                  onClick={() => setModo("login")}
                  className="text-blue-600 text-sm text-center mt-4 cursor-pointer hover:underline"
                >
                  Volver al inicio de sesión
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}