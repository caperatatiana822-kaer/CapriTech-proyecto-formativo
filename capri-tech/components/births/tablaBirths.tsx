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

export default function TablaBirths() {
  const router = useRouter()
  const [nacimientos, setNacimientos] = useState<any[]>([]) 
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const cargarNacimientos = async (pagina = 1) => {
    try {
      setCargando(true)
      setError("")
      
      console.log("Obteniendo nacimientos...")
      
      const limite = 10
      const offset = (pagina - 1) * limite
      const respuesta = await fetch(`http://localhost:3001/api/births/birthsAll?limit=${limite}&offset=${offset}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log("Status de respuesta:", respuesta.status)
      const datos = await respuesta.json()
      console.log("Respuesta completa del backend:", datos)
      
      if (!respuesta.ok) {
        const mensajeError = datos.message || `Error ${respuesta.status}: ${respuesta.statusText}`
        throw new Error(mensajeError)
      }

      console.log("Contenido de datos:", datos)

      let listaNacimientos = []
      let total = 0
      let paginas = 1
      let paginaActualServidor = 1
      
      if (datos.data && Array.isArray(datos.data)) {
        listaNacimientos = datos.data
        total = listaNacimientos.length
      } else if (Array.isArray(datos)) {
        listaNacimientos = datos
        total = listaNacimientos.length
      } else if (datos && typeof datos === 'object') {
        const posiblesArrays = ['births', 'nacimientos', 'items', 'results', 'rows']
        for (const key of posiblesArrays) {
          if (datos[key] && Array.isArray(datos[key])) {
            listaNacimientos = datos[key]
            break
          }
        }
        
        // Obtener datos de paginación si existen
        if (datos.data && typeof datos.data === 'object' && !Array.isArray(datos.data)) {
          const dataObj = datos.data
          listaNacimientos = dataObj.data || dataObj.items || dataObj.rows || []
          total = dataObj.totalItems || listaNacimientos.length
          paginas = dataObj.totalPages || 1
          paginaActualServidor = dataObj.currentPage || 1
        } else {
          total = listaNacimientos.length
          paginas = 1
          paginaActualServidor = 1
        }

        if (listaNacimientos.length === 0 && Object.keys(datos).length > 0) {
          console.warn("No se encontró un array en la respuesta, usando el objeto completo como array")
          listaNacimientos = [datos]
          total = 1
        }
      }
      
      console.log("Lista de nacimientos procesada:", listaNacimientos)
      setNacimientos(listaNacimientos)
      setTotalItems(total)
      setTotalPaginas(paginas)
      setPaginaActual(paginaActualServidor || pagina)
      
    } catch (error: any) {
      console.error("Error al cargar los nacimientos:", error)
      setError(error.message || "No se pudieron cargar los nacimientos")
      setNacimientos([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarNacimientos(1)
  }, [])

  console.log("Estado actual - Cargando:", cargando, "Error:", error, "Nacimientos:", nacimientos)

  function handleAgregarParto() {
    router.push("/dashboard/births")
  }

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarNacimientos(pagina)
    }
  }

  return (
    <div className="py-10 px-6 bg-[#f5efe6] min-h-screen">
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarParto}
          className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-6 py-2 rounded-lg shadow-md transition border border-[#8d6e63]"
        >
          + Agregar Parto
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-[#d7ccc8]">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Tabla de Partos</h1>
          <p className="text-[#d7ccc8] mt-1">Registro de Partos de caprinos</p>
        </div>

        <div className="p-6 overflow-x-auto">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 font-semibold">Error:</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!cargando && !error && nacimientos.length === 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="text-yellow-700">Todavía no hay partos registrados.</p>
            </div>
          )}

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#ede4d4] text-[#4e342e]">
                <th className="p-3 text-left font-semibold">Chapeta</th>
                <th className="p-3 text-left font-semibold">Nombre</th>
                <th className="p-3 text-left font-semibold">Fecha Nacimiento</th>
                <th className="p-3 text-left font-semibold">Raza</th>
                <th className="p-3 text-left font-semibold">Sexo</th>
                <th className="p-3 text-left font-semibold">Peso (Kg)</th>
                <th className="p-3 text-left font-semibold">Madre</th>
                <th className="p-3 text-left font-semibold">Padre</th>
              </tr>
            </thead>

            <tbody>
              {cargando && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-[#6d4c41]">
                    <div className="flex justify-center items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-[#6d4c41]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Cargando partos...</span>
                    </div>
                  </td>
                </tr>
              )}

              {!cargando && !error && nacimientos.length > 0 && (
                nacimientos.map(function renderFila(nacimiento: any, index: number) {
                  console.log(`Renderizando nacimiento ${index}:`, nacimiento)
                  return (
                    <tr key={nacimiento.id || index} className="border-b border-[#d7ccc8] hover:bg-[#f5efe6] transition">
                      <td className="p-3 font-medium text-[#4e342e]">{nacimiento.chapeta || "—"}</td>
                      <td className="p-3 text-[#5d4037]">{nacimiento.nombre || "—"}</td>
                      <td className="p-3 text-[#5d4037]">{formatearFecha(nacimiento.fechaNacimiento)}</td>
                      <td className="p-3 text-[#5d4037]">{nacimiento.raza || "—"}</td>
                      <td className="p-3 text-[#5d4037]">{nacimiento.sexo || "—"}</td>
                      <td className="p-3 text-[#5d4037]">{nacimiento.pesoNacimiento || nacimiento.pesoNacer || "—"} Kg</td>
                      <td className="p-3 text-[#5d4037]">{nacimiento.chapetaMadre || "—"}</td>
                      <td className="p-3 text-[#5d4037]">{nacimiento.chapetaPadre || "—"}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>

          {!cargando && !error && totalItems > 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#d7ccc8]">
              <div className="text-sm text-[#6d4c41]">
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
    </div>
  );
}