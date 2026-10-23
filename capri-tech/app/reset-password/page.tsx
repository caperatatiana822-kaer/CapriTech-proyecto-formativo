"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react"; 

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("t");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

  if (!token) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#844243] mb-4">Error</h2>
        <p className="text-black">Token inválido o no proporcionado.</p>
      </div>
    );
  }

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Por favor, llena todos los campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            token: token, 
            newPassword: newPassword, 
            confirmPassword: confirmPassword 
        }),
      });

      const data = await response.json();
      console.log("Respuesta del backend al cambiar contraseña:", data);

      if (data.success) {
        alert("¡Contraseña actualizada! Ya puedes iniciar sesión.");
        router.push("/"); 
      } else {

        alert(data.mensaje || "Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Ocurrió un error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

   return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-[#844243]">
        Nueva Contraseña
      </h2>

      <div className="mb-3">
        <label className="block text-sm font-medium text-black mb-1">
          Nueva contraseña
        </label>
        <div className="relative">
          <input
            type={typePassword}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="********"
            className="w-full border border-gray-200 rounded-lg p-3 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-[#844243]"
          />
          <button
            type="button"
            onClick={() => setTypePassword(typePassword === "password" ? "text" : "password")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {typePassword === "password" ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">
          Confirmar contraseña
        </label>
        <div className="relative">
          <input
            type={typeConfirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            className="w-full border border-gray-200 rounded-lg p-3 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-[#844243]"
          />
          <button
            type="button"
            onClick={() => setTypeConfirmPassword(typeConfirmPassword === "password" ? "text" : "password")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {typeConfirmPassword === "password" ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        onClick={handleResetPassword}
        disabled={cargando}
        type="button"
        className="w-full bg-[#844243] hover:bg-[#6E3536] text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
      >
        {cargando ? "Cambiando..." : "Cambiar Contraseña"}
      </button>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-xl w-96 shadow-xl">
        <Suspense fallback={<p className="text-center text-black">Cargando...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}