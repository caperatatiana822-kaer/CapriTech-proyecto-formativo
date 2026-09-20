"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function formatearFecha(fechaISO: string) {
  if (!fechaISO) return "—"
  const fecha = new Date(fechaISO)
  return fecha.toLocaleDateString("es-CO")
}

export default function TablaLivestock() {
  const router = useRouter()
  const [animales, setAnimales] = useState([])
  const [cargando, setCargando] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  })

  const cargarAnimales = async (page = 1) => {
    setCargando(true)
    try {
      const limit = 10
      const offset = (page - 1) * limit
      const respuesta = await fetch(`http://localhost:3001/api/livestock/livestockAll?limit=${limit}&offset=${offset}`)
      const datos = await respuesta.json()
      
      if (datos.success && datos.data) {
        setAnimales(datos.data.data || [])
        if (datos.data.pagination) {
          setPagination(datos.data.pagination)
        }
      } else {
        setAnimales([])
      }
    } catch (error) {
      console.error("Error al cargar los animales:", error)
      setAnimales([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarAnimales(1)
  }, [])

  function handleAgregarCaprino() {
    router.push("/dashboard/livestock")
  }

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      cargarAnimales(newPage)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarCaprino}
          className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-6 py-2 rounded-lg shadow-md transition">
          + Agregar Caprino
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Tabla de Inventario</h1>
          <p className="text-[#d7ccc8] mt-1">Registro general de animales del inventario</p>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f5efe6] text-[#4e342e]">
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Chapeta</th>
                <th className="p-3 text-left">Fecha de nacimiento</th>
                <th className="p-3 text-left">Raza</th>
                <th className="p-3 text-left">Sexo</th>
                <th className="p-3 text-left">Etapa de Producción</th>
                <th className="p-3 text-left">Observaciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    Cargando animales...
                  </td>
                </tr>
              )}

              {!cargando && animales.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    Todavía no hay animales registrados.
                  </td>
                </tr>
              )}

              {!cargando && animales.map(function renderFila(animal: any) {
                return (
                  <tr key={animal.id} className="border-b hover:bg-[#faf8f5] transition">
                    <td className="p-3">{animal.nombre}</td>
                    <td className="p-3">{animal.chapeta}</td>
                    <td className="p-3">{formatearFecha(animal.fechaNacimiento)}</td>
                    <td className="p-3">{animal.raza}</td>
                    <td className="p-3">{animal.sexo}</td>
                    <td className="p-3">{animal.etapaProduccion}</td>
                    <td className="p-3">{animal.observaciones || "—"}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {!cargando && pagination.totalPages > 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Página {pagination.currentPage} de {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    pagination.currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#f5efe6] text-[#6d4c41] hover:bg-[#ede4d4]"
                  }`}
                >
                 ← Anterior
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    pagination.currentPage === pagination.totalPages
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