"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TablaResponsables() {
  const router = useRouter()
  const [responsables, setResponsables] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const cargarResponsables = async (pagina = 1) => {
    try {
      setCargando(true)
      setError("")
      
      const limite = 10
      const offset = (pagina - 1) * limite
      const respuesta = await fetch(`http://localhost:3001/api/responsible/responsibleAll?limit=${limite}&offset=${offset}`)
      const datos = await respuesta.json()
      console.log("Respuesta RESPONSIBLE:", datos)
      
      if (!respuesta.ok) {
        throw new Error(datos.message || "Error al cargar responsables")
      }
      
      if (datos.success && datos.data) {
        setResponsables(datos.data.data || [])
        setTotalItems(datos.data.totalItems || 0)
        setTotalPaginas(datos.data.totalPages || 1)
        setPaginaActual(datos.data.currentPage || 1)
      } else {
        setResponsables([])
      }
    } catch (error: any) {
      console.error("Error al cargar los responsables:", error)
      setError(error.message || "No se pudieron cargar los responsables")
      setResponsables([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarResponsables(1)
  }, [])

  function handleAgregarResponsable() {
    router.push("/dashboard/responsible")
  }

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarResponsables(pagina)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarResponsable}
          className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          + Agregar Responsable
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Tabla de Responsables</h1>
          <p className="text-[#d7ccc8] mt-1">Registro de responsables vinculados al sistema</p>
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
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Documento</th>
                <th className="p-3 text-left">Tipo de Responsable</th>
                <th className="p-3 text-left">Actividad a Cargo</th>
                <th className="p-3 text-left">Frecuencia</th>
                <th className="p-3 text-left">Dia de la Semana</th>
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
                      <span>Cargando responsables...</span>
                    </div>
                  </td>
                </tr>
              )}

              {!cargando && !error && responsables.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    Todavia no hay responsables registrados.
                  </td>
                </tr>
              )}

              {!cargando && !error && responsables.map(function renderFila(responsable: any, index: number) {
                return (
                  <tr key={responsable.id || index} className="border-b hover:bg-[#faf8f5] transition">
                    <td className="p-3 font-medium">{responsable.nombre}</td>
                    <td className="p-3">{responsable.documento}</td>
                    <td className="p-3">{responsable.tipoResponsable}</td>
                    <td className="p-3">{responsable.actividad}</td>
                    <td className="p-3">{responsable.frecuencia}</td>
                    <td className="p-3">{responsable.diaSemana}</td>
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
                 ←  Anterior
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
    </div>
  );
}