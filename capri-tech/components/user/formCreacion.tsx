"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { API_USER_URL } from "@/app/config";

function obtenerMensajeError(error: unknown): string {
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const datosError = error as Record<string, unknown>;
    const mensaje = datosError.message ?? datosError.error ?? datosError.errors;
    if (Array.isArray(mensaje)) {
      return mensaje.map((item) => obtenerMensajeError(item)).join(", ");
    }
    if (typeof mensaje === "string") return mensaje;
    if (mensaje && typeof mensaje === "object") return obtenerMensajeError(mensaje);
    return JSON.stringify(error);
  }
  return "Error desconocido al registrar el usuario";
}

interface FormCreacionUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormCreacionUsuario({ isOpen, onClose, onSuccess }: FormCreacionUsuarioProps) {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [documentId, setDocumentId] = useState<string>('');
  const [postJob, setPostJob] = useState<string>('');
  const [verifyEmail] = useState<boolean>(false);
  const [active] = useState<boolean>(true);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setDocumentId('');
    setPostJob('');
    setError('');
    setMensajeExito(null);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const gestionarForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setError("");
    setMensajeExito(null);

    if (!name.trim() || name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      setGuardando(false);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Por favor ingrese un correo electrónico válido.");
      setGuardando(false);
      return;
    }
    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setGuardando(false);
      return;
    }
    if (!documentId.trim() || documentId.length < 5) {
      setError("El documento de identidad debe tener al menos 5 caracteres.");
      setGuardando(false);
      return;
    }
    if (!postJob.trim() || postJob.length < 3) {
      setError("El campo cargo debe tener al menos 3 caracteres.");
      setGuardando(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      documentId,
      postJob,
      verifyEmail,
      active
    };

    try {
      const response = await fetch(API_USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const contenido = await response.text();
      let data: Record<string, unknown> = {};

      if (contenido) {
        try {
          data = JSON.parse(contenido) as Record<string, unknown>;
        } catch {
          data = { message: contenido };
        }
      }

      if (!response.ok || data.success === false) {
        throw new Error(obtenerMensajeError(data) || "Error al registrar el usuario");
      }

      setMensajeExito("¡Usuario creado correctamente!");

      onSuccess();

      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);

    } catch (error: unknown) {
      const mensajeError = obtenerMensajeError(error);
      console.error("Error registrando usuario:", error);
      setError("Error al registrar usuario: " + mensajeError);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-[#3E2723]/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">

        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 pb-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">
            Formulario de Usuario
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Ingresa la información del usuario.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-2">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {mensajeExito && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-6 mt-2">
            <p className="text-green-700 text-sm">{mensajeExito}</p>
          </div>
        )}

        <form onSubmit={gestionarForm} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nombre *</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Email *</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Documento *</label>
            <input 
              type="text" 
              required 
              value={documentId} 
              onChange={(e) => setDocumentId(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              placeholder="Número de documento"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Contraseña *</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Cargo *</label>
            <select 
              required 
              value={postJob} 
              onChange={(e) => setPostJob(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
            >
              <option value="">Selecciona un cargo</option>
              <option value="Administrador">Administrador</option>
              <option value="Instructor">Instructor</option>
              <option value="Gestor">Gestor</option>
              <option value="Pasante">Pasante</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-2 !border-t-0">
            <button 
              type="submit" 
              disabled={guardando}
              className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {guardando ? "Registrando..." : "Registrar Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}