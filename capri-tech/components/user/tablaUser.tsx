"use client"

import { useState, useEffect } from "react"
import FormCreacionUsuario from "@/components/user/formCreacion" 

export default function TablaUsuario() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const cargarUsuarios = async (pagina = 1) => {
    try {
      setCargando(true)
      setError("")

      const limite = 10
      const offset = (pagina - 1) * limite
      const respuesta = await fetch(`http://localhost:3001/api/user?limit=${limite}&offset=${offset}`)
      const datos = await respuesta.json().catch(() => ({}))
      console.log("Respuesta USER:", datos)

      const lista = Array.isArray(datos?.data?.data)
        ? datos.data.data
        : Array.isArray(datos?.data)
          ? datos.data
          : Array.isArray(datos?.users)
            ? datos.users
            : Array.isArray(datos)
              ? datos
              : []

      const total = Number(datos?.data?.totalItems ?? datos?.totalItems ?? lista.length ?? 0)
      const paginas = Number(datos?.data?.totalPages ?? datos?.totalPages ?? 1)
      const paginaActualServidor = Number(datos?.data?.currentPage ?? datos?.currentPage ?? pagina)

      if (!respuesta.ok && datos?.message && !lista.length) {
        setUsuarios([])
        setTotalItems(0)
        setTotalPaginas(1)
        setPaginaActual(1)
        return
      }

      if (!respuesta.ok) {
        throw new Error(datos.message || "Error al cargar usuarios")
      }

      setUsuarios(lista)
      setTotalItems(total)
      setTotalPaginas(paginas || 1)
      setPaginaActual(paginaActualServidor || pagina)
    } catch (error: any) {
      console.error("Error al cargar los usuarios:", error)
      setError(error.message || "No se pudieron cargar los usuarios")
      setUsuarios([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios(1)
  }, [])

  const handleSuccess = () => {
    cargarUsuarios(paginaActual)
  }

  function handleAgregarUsuario() {
    setIsModalOpen(true)
  }

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarUsuarios(pagina)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarUsuario}
          className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          + Agregar Usuario
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Tabla de Usuarios</h1>
          <p className="text-[#d7ccc8] mt-1">Registro de usuarios del sistema</p>
        </div>

        <div className="p-6 overflow-x-auto">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 font-semibold">Error:</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f5efe6] text-[#4e342e]">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Documento</th>
                <th className="p-3 text-left">Cargo</th>
                <th className="p-3 text-left">Estado</th>
              </tr>
            </thead>

            <tbody>
              {cargando && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-[#6d4c41]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Cargando usuarios...</span>
                    </div>
                  </td>
                </tr>
              )}

              {!cargando && !error && usuarios.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    Todavia no hay usuarios registrados.
                  </td>
                </tr>
              )}

              {!cargando && !error && usuarios.map(function renderFila(usuario: any, index: number) {
                return (
                  <tr key={usuario.id || index} className="border-b hover:bg-[#faf8f5] transition">
                    <td className="p-3 font-medium">{usuario.id}</td>
                    <td className="p-3">{usuario.name}</td>
                    <td className="p-3">{usuario.email}</td>
                    <td className="p-3">{usuario.documentId}</td>
                    <td className="p-3">{usuario.postJob}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        usuario.active 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {usuario.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {!cargando && !error && totalItems > 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Página {paginaActual} de {totalPaginas}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => irPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    paginaActual === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#f5efe6] text-[#6d4c41] hover:bg-[#ede4d4]"
                  }`}
                >
                 ← Anterior
                </button>
                <button
                  onClick={() => irPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    paginaActual === totalPaginas
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#f5efe6] text-[#6d4c41] hover:bg-[#ede4d4]"
                  }`}
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Registro de Usuario */}
      <FormCreacionUsuario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  )
}