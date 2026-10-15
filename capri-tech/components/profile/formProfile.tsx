"use client"

import { useState } from "react"
import { X, User, Mail, IdCard, Briefcase } from "lucide-react"

interface FormActualizarPerfilProps {
  isOpen: boolean
  onClose: () => void
}

export default function FormActualizarPerfil({ isOpen, onClose }: FormActualizarPerfilProps) {
  const [name, setName] = useState("Tatiana Capera")
  const [postJob, setPostJob] = useState("Administrador")

  if (!isOpen) return null

  const handleCancel = () => {
    onClose()
  }

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Aquí se actualizará el perfil (pendiente)")
  }

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

        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#844243] flex items-center justify-center text-white text-2xl font-bold shadow-md">
              T
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Actualizar Perfil
              </h1>
              <p className="text-gray-500 mt-0.5 text-sm">
                Edita tu información personal. Los campos bloqueados no se pueden modificar.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleGuardar} className="p-8 space-y-6">

          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Información editable
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="h-4 w-4 text-[#844243]" />
                  Nombre *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Briefcase className="h-4 w-4 text-[#844243]" />
                  Cargo *
                </label>
                <select
                  value={postJob}
                  onChange={(e) => setPostJob(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition bg-white"
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Gestor">Gestor</option>
                  <option value="Pasante">Pasante</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-2">
              Información no editable
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                  <Mail className="h-4 w-4 text-gray-300" />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value="tatiana@capritech.com"
                  disabled
                  className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                  <IdCard className="h-4 w-4 text-gray-300" />
                  Documento
                </label>
                <input
                  type="text"
                  value="1234567890"
                  disabled
                  className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
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