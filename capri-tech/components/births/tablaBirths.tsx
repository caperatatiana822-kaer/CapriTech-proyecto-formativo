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

  useEffect(function cargarNacimientos() {
    async function obtenerNacimientos() {
      try {
        setCargando(true)
        setError("")
        
        console.log("Obteniendo nacimientos...")
        
        const respuesta = await fetch("http://localhost:3001/api/births/birthsAll", {
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
        
        if (datos.data && Array.isArray(datos.data)) {
          listaNacimientos = datos.data
        } else if (Array.isArray(datos)) {
          listaNacimientos = datos
        } else if (datos && typeof datos === 'object') {
          const posiblesArrays = ['births', 'nacimientos', 'items', 'results', 'rows']
          for (const key of posiblesArrays) {
            if (datos[key] && Array.isArray(datos[key])) {
              listaNacimientos = datos[key]
              break
            }
          }
          

          if (listaNacimientos.length === 0 && Object.keys(datos).length > 0) {
            console.warn("No se encontró un array en la respuesta, usando el objeto completo como array")
            listaNacimientos = [datos]
          }
        }
        
        console.log("Lista de nacimientos procesada:", listaNacimientos)
        setNacimientos(listaNacimientos)
        
      } catch (error: any) {
        console.error("Error al cargar los nacimientos:", error)
        setError(error.message || "No se pudieron cargar los nacimientos")
        setNacimientos([])
      } finally {
        setCargando(false)
      }
    }
    obtenerNacimientos()
  }, [])

  console.log("Estado actual - Cargando:", cargando, "Error:", error, "Nacimientos:", nacimientos)

  function handleAgregarParto() {
    router.push("/dashboard/births")
  }

  return (
    <div className="py-10 px-6">
      {/* Contenedor superior con el botón fuera de la tabla */}
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarParto}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          + Agregar Parto
        </button>
      </div>

      {/* Tabla */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Tabla de Partos</h1>
          <p className="text-green-100 mt-1">Registro de Partos de caprinos</p>
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
              <tr className="bg-green-100 text-green-800">
                <th className="p-3 text-left">Chapeta</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Fecha Nacimiento</th>
                <th className="p-3 text-left">Raza</th>
                <th className="p-3 text-left">Sexo</th>
                <th className="p-3 text-left">Peso (Kg)</th>
                <th className="p-3 text-left">Madre</th>
                <th className="p-3 text-left">Padre</th>
              </tr>
            </thead>

            <tbody>
              {cargando && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                    <tr key={nacimiento.id || index} className="border-b hover:bg-green-50 transition">
                      <td className="p-3 font-medium">{nacimiento.chapeta || "—"}</td>
                      <td className="p-3">{nacimiento.nombre || "—"}</td>
                      <td className="p-3">{formatearFecha(nacimiento.fechaNacimiento)}</td>
                      <td className="p-3">{nacimiento.raza || "—"}</td>
                      <td className="p-3">{nacimiento.sexo || "—"}</td>
                      <td className="p-3">{nacimiento.pesoNacimiento || nacimiento.pesoNacer || "—"} Kg</td>
                      <td className="p-3">{nacimiento.chapetaMadre || "—"}</td>
                      <td className="p-3">{nacimiento.chapetaPadre || "—"}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}