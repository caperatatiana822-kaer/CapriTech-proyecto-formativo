"use client"

import { useState } from "react"
import { X, Lock, Key, ShieldCheck, LockKeyhole } from "lucide-react"

interface FormActualizarPasswordProps {
  isOpen: boolean
  onClose: () => void
}

export default function FormActualizarPassword({ isOpen, onClose }: FormActualizarPasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  if (!isOpen) return null

  const handleCancel = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    onClose()
  }

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Aquí se actualizará la contraseña (pendiente)")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-[#3E2723]/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative">

        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#844243]/10 flex items-center justify-center">
            <LockKeyhole className="h-7 w-7 text-[#844243]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Actualizar Contraseña
              </h1>
              <p className="text-gray-500 mt-0.5 text-sm">
                Ingresa tu contraseña actual y define una nueva.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleGuardar} className="p-8 space-y-5">

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Lock className="h-4 w-4 text-[#844243]" />
              Contraseña actual *
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
              placeholder="Ingresa tu contraseña actual"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Key className="h-4 w-4 text-[#844243]" />
              Nueva contraseña *
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Key className="h-4 w-4 text-[#844243]" />
              Confirmar nueva contraseña *
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
              placeholder="Repite la nueva contraseña"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#aff5af] border border-[#90a78f] text-black font-semibold px-8 py-3 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}