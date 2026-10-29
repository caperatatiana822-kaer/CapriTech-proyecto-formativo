"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { Toaster, toast } from "@/components/ui/toast";

export default function LoginModal({ hideTrigger = false }: { hideTrigger?: boolean }) {
  const [abrir, setAbrir] = useState(false);
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [typePassword, setTypePassword] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(<EyeClosed size={20} />);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.add({
        title: "Corregir",
        description: "Por favor, ingresa tu correo electrónico y contraseña",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      const success = data.success !== undefined ? data.success : data.json?.success;
      const token = data.data?.token || data.json?.data?.token;

      if (success && token) {
        localStorage.setItem("token", token);
        toast.add({
          title: "Exito",
          description: "Bienvenido, has iniciado sesión correctamente",
          type: "success",
        });
        router.push("/dashboard");
      } else {
        const msg = data.message || data.json?.message || "Credenciales incorrectas";
        alert(Array.isArray(msg) ? msg[0] : msg);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Respuesta recuperar:", data);

      const success = data.success !== undefined ? data.success : data.json?.success;
      const message = data.message || data.json?.message;

      if (success) {
        alert(message || "Revisa tu correo para recuperar la contraseña");
        setModo("login");
      } else {
        alert(message || "Error al recuperar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error de conexión");
    }
  };

    const MostrarPassword = () => {
    if (typePassword === "password") {
      setTypePassword("text");
      setEyeIcon(<Eye size={20} />);
    } else {
      setTypePassword("password");
      setEyeIcon(<EyeClosed size={20} />);
    }
  };
  return (
    <>
      <button
        type="button"
        id="btn-login-hidden"
        onClick={() => setAbrir(true)}
        className={hideTrigger ? "hidden" : "bg-[#844243] hover:bg-[#6E3536] text-[#f5efe6] font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-[#8d6e63]"}
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