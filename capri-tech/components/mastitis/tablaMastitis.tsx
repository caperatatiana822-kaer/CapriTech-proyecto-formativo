"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function formatearFecha(fechaISO: string) {
  if (!fechaISO) return "—"
  try {
    const fecha = new Date(fechaISO)
    return fecha.toLocaleDateString("es-CO")
  } catch {
    return "—"
  }
}

export default function TablaMastitis() {
  const router = useRouter()
  const [casos, setCasos] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const cargarMastitis = async (pagina = 1) => {
    try {
      setCargando(true)
      setError("")
      
      const limite = 10
      const offset = (pagina - 1) * limite
      const respuesta = await fetch(`http://localhost:3001/api/mastitis/mastitisAll?limit=${limite}&offset=${offset}`)
      const datos = await respuesta.json()
      console.log("Respuesta MASTITIS:", datos)
      
      if (!respuesta.ok) {
        throw new Error(datos.message || "Error al cargar casos de mastitis")
      }
      
      if (datos.success && datos.data) {
        setCasos(datos.data.data || [])
        setTotalItems(datos.data.totalItems || 0)
        setTotalPaginas(datos.data.totalPages || 1)
        setPaginaActual(datos.data.currentPage || 1)
      } else {
        setCasos([])
      }
    } catch (error: any) {
      console.error("Error al cargar los casos de mastitis:", error)
      setError(error.message || "No se pudieron cargar los casos de mastitis")
      setCasos([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarMastitis(1)
  }, [])

  function handleAgregarMastitis() {
    router.push("/dashboard/mastitis")
  }

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarMastitis(pagina)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarMastitis}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          + Agregar Mastitis
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Tabla de Mastitis</h1>
          <p className="text-green-100 mt-1">Registro de diagnosticos y pruebas de mastitis</p>
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
              <tr className="bg-green-100 text-green-800">
                <th className="p-3 text-left">Chapeta</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Resultado</th>
                <th className="p-3 text-left">Responsable</th>
                <th className="p-3 text-left">Observaciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Cargando casos de mastitis...</span>
                    </div>
                  </td>
                </tr>
              )}

              {!cargando && !error && casos.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Todavia no hay casos de mastitis registrados.
                  </td>
                </tr>
              )}

              {!cargando && !error && casos.map(function renderFila(caso: any, index: number) {
                return (
                  <tr key={caso.id || index} className="border-b hover:bg-green-50 transition">
                    <td className="p-3 font-medium">{caso.chapeta}</td>
                    <td className="p-3">{formatearFecha(caso.fecha)}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        caso.resultado === "Positivo" ? "bg-red-100 text-red-800" :
                        caso.resultado === "Negativo" ? "bg-green-100 text-green-800" :
                        caso.resultado === "Sospechoso" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {caso.resultado}
                      </span>
                    </td>
                    <td className="p-3">{caso.responsable}</td>
                    <td className="p-3 text-gray-600">{caso.observaciones || "—"}</td>
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
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Anterior
                </button>
                <button
                  onClick={() => irPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    paginaActual === totalPaginas
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}