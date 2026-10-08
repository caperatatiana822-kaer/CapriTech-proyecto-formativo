"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginModal(props: any) {
  const [abrir, setAbrir] = useState(false);
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [eye, setEye] = useState(<EyeClosed />)
  const [typePassword, setTypePassword] = useState("password")

  const handleLogin = async () => {
    const credenciales = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      if (data.success) {
        let token = data.data.token;
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error de conexión");
    }
  };

  const handleRecuperarPassword = async () => {
    if (!email) {
      alert("Por favor, ingresa tu correo electrónico");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      console.log("Respuesta recuperar:", data);

      if (data.success) {
        alert(data.message || "Revisa tu correo para recuperar la contraseña");
        setModo("login");
      } else {
        alert(data.message || "Error al recuperar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error de conexión");
    }
  };

  const MostrarPassword = () => {
    if (typePassword == "password") {
      setTypePassword("text");
      setEye(<Eye />)
    } else {
      setTypePassword("password");
      setEye(<EyeClosed />)
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setAbrir(true)}
        className="bg-[#844243] hover:bg-[#4e342e] text-[#f5efe6] font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-[#8d6e63]"
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

            <h2 className="text-2xl font-bold text-center mb-6 text-[#000000]">
              {modo === "login"
                ? "Iniciar Sesión"
                : "Recuperar Contraseña"}
            </h2>

            {modo === "login" ? (
              <>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña:
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="contraseña"
                      type={typePassword}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-gray-400 transition"
                    />
                    <button
                      type="button"
                      onClick={MostrarPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {typePassword === "password" ? <EyeClosed size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <p
                  onClick={() => setModo("recuperar")}
                  className="text-blue-600 text-sm cursor-pointer hover:underline mb-6 text-right"
                >
                  ¿Olvidaste tu contraseña?
                </p>

                <button
                  onClick={handleLogin}
                  type="button"
                  className="w-full bg-[#844243] hover:bg-[#6E3536] text-[#f5efe6] py-3 rounded-lg font-medium transition border border-[#8d6e63]"
                >
                  Entrar
                </button>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                  />
                </div>

                <button
                  onClick={handleRecuperarPassword}
                  type="button"
                  className="w-full bg-[#844243] hover:bg-[#6E3536] text-[#f5efe6] py-3 rounded-lg font-medium transition border border-[#8d6e63]"
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