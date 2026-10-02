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

type Props = {
  busqueda?: string
  headerExtra?: React.ReactNode
}

export default function TablaMastitis({ busqueda = "", headerExtra }: Props) {
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

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarMastitis(pagina)
    }
  }

  const casosFiltrados = casos.filter((c: any) =>
    (c.chapeta || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.fecha || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.resultado || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.responsable || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.observaciones || "").toString().toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="py-10 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">

        <div className="bg-white p-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">Tabla de Mastitis</h1>
          <p className="text-gray-500 mt-1 text-sm">Registro de diagnosticos y pruebas de mastitis</p>

          {headerExtra}
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 font-semibold">Error:</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#844243] text-white">
                  <th className="p-3 text-left font-semibold text-sm rounded-l-lg">Chapeta</th>
                  <th className="p-3 text-left font-semibold text-sm">Fecha</th>
                  <th className="p-3 text-left font-semibold text-sm">Resultado</th>
                  <th className="p-3 text-left font-semibold text-sm">Responsable</th>
                  <th className="p-3 text-left font-semibold text-sm rounded-r-lg">Observaciones</th>
                </tr>
              </thead>

              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      <div className="flex justify-center items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-[#844243]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

                {!cargando && !error && casosFiltrados.map(function renderFila(caso: any, index: number) {
                  return (
                    <tr key={caso.id || index} className="border-b border-gray-100 hover:bg-[#faf8f5] transition-colors">
                      <td className="p-3 text-sm text-gray-800 font-medium">{caso.chapeta}</td>
                      <td className="p-3 text-sm text-gray-800">{formatearFecha(caso.fecha)}</td>
                      <td className="p-3 text-sm text-gray-800">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          caso.resultado === "Positivo" ? "bg-red-100 text-red-800" :
                          caso.resultado === "Negativo" ? "bg-green-100 text-green-800" :
                          caso.resultado === "Sospechoso" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {caso.resultado}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-800">{caso.responsable}</td>
                      <td className="p-3 text-sm text-gray-800">{caso.observaciones || "—"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {!cargando && !error && totalItems > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-600">
                Total de registros: <span className="font-semibold text-[#3E2723]">{totalItems}</span> | Página <span className="font-semibold text-[#3E2723]">{paginaActual}</span> de {totalPaginas}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => irPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                    paginaActual === 1
                      ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-[#3E2723] border-[#E8D9C5] hover:bg-[#E8D9C5]"
                  }`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => irPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                    paginaActual === totalPaginas
                      ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-[#3E2723] border-[#E8D9C5] hover:bg-[#E8D9C5]"
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