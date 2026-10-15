"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [tokenValido, setTokenValido] = useState<boolean | null>(null);


  useEffect(() => {
    const verificarToken = async () => {
      if (!token) {
        setTokenValido(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/auth/verify-reset-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        setTokenValido(data.success);
      } catch (error) {
        console.error("Error verificando token:", error);
        setTokenValido(false);
      }
    };

    verificarToken();
  }, [token]);

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
        body: JSON.stringify({ token, newPassword, confirmPassword }),
      });

      const data = await response.json();
      console.log("Respuesta reset:", data);

      if (data.success) {
        alert("¡Contraseña actualizada! Ahora puedes iniciar sesión.");
        router.push("/");
      } else {
        alert(data.mensaje || "Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error de conexión");
    } finally {
      setCargando(false);
    }
  };

  if (tokenValido === null) {
    return <p className="text-center text-gray-600">Verificando enlace...</p>;
  }

  if (tokenValido === false) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Enlace inválido o expirado</h2>
        <p className="text-gray-600 mb-4">Solicita un nuevo enlace de recuperación.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-[#6d4c41] text-white px-6 py-2 rounded-lg"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-[#5d4037]">
        Nueva Contraseña
      </h2>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nueva contraseña
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="********"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="********"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
        />
      </div>

      <button
        onClick={handleResetPassword}
        disabled={cargando}
        type="button"
        className="w-full bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] py-3 rounded-lg font-medium transition border border-[#8d6e63] disabled:opacity-50"
      >
        {cargando ? "Cambiando..." : "Cambiar Contraseña"}
      </button>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efe6]">
      <div className="bg-white p-8 rounded-xl w-96 shadow-xl">
        <Suspense fallback={<p className="text-center">Cargando...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}