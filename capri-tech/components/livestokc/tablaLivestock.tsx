"use client"
import { useState, useEffect } from "react"
import { Pencil } from "lucide-react" // <-- 1. Importamos el lápiz
import FormCreacionLivestock, { Livestock } from "@/components/livestokc/formCreacion" // Ajusta tu ruta

function formatearFecha(fechaISO: string) {
  if (!fechaISO) return "—"
  const fecha = new Date(fechaISO)
  return fecha.toLocaleDateString("es-CO")
}

type Props = {
  busqueda?: string
  headerExtra?: React.ReactNode
}

export default function TablaLivestock({ busqueda = "", headerExtra }: Props) {
  const [animales, setAnimales] = useState([])
  const [cargando, setCargando] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  })

  // 2. Estados para el modal y el elemento a editar
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [usuarioEditor, setUsuarioEditor] = useState<Livestock | null>(null)

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

    const handler = () => cargarAnimales(1)
    window.addEventListener("livestock:created", handler)
    return () => window.removeEventListener("livestock:created", handler)
  }, [])

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      cargarAnimales(newPage)
    }
  }

  // 3. Función para editar
  function handleEditarAnimal(animal: Livestock) {
    setUsuarioEditor(animal)
    setIsModalOpen(true)
  }

  // 4. Función de éxito
  function handleSuccess() {
    cargarAnimales(pagination.currentPage)
  }

  const animalesFiltrados = animales.filter((a: any) =>
    (a.nombre || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (a.chapeta || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (a.raza || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (a.sexo || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (a.etapaProduccion || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (a.observaciones || "").toString().toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="py-10 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">

        {/* TUS ESTILOS ORIGINALES INTACTOS */}
        <div className="bg-white p-6 ">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">Caprinos</h1>
          <p className="text-gray-500 mt-1 text-sm">Registro general de animales</p>

          {headerExtra}
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#844243] text-white">
                  <th className="p-3 text-left font-semibold text-sm rounded-l-lg">Nombre</th>
                  <th className="p-3 text-left font-semibold text-sm">Chapeta</th>
                  <th className="p-3 text-left font-semibold text-sm">Fecha de nacimiento</th>
                  <th className="p-3 text-left font-semibold text-sm">Raza</th>
                  <th className="p-3 text-left font-semibold text-sm">Sexo</th>
                  <th className="p-3 text-left font-semibold text-sm">Etapa de Producción</th>
                  <th className="p-3 text-left font-semibold text-sm">Observaciones</th>
                  <th className="p-3 text-left font-semibold text-sm">Estado</th>
                  {/* 5. Nueva columna de Acciones */}
                  <th className="p-3 text-left font-semibold text-sm rounded-r-lg">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      Cargando animales...
                    </td>
                  </tr>
                )}

                {!cargando && animales.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      Todavía no hay animales registrados.
                    </td>
                  </tr>
                )}

                {!cargando && animalesFiltrados.length === 0 && animales.length > 0 && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      No se encontraron animales que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}

                {!cargando && animalesFiltrados.map(function renderFila(animal: any) {
                  return (
                    <tr key={animal.id} className="border-b border-gray-100 hover:bg-[#faf8f5] transition-colors">
                      <td className="p-3 text-sm text-gray-800 capitalize">{animal.nombre}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{animal.chapeta}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{formatearFecha(animal.fechaNacimiento)}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{animal.raza}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{animal.sexo}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{animal.etapaProduccion}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{animal.observaciones || "—"}</td>
                      <td className="p-3 text-sm text-gray-800">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${animal.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}>
                          {animal.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      {/* 6. Celda con el botón de editar */}
                      <td className="p-3 text-sm text-gray-800">
                        <button
                          onClick={() => handleEditarAnimal(animal)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {!cargando && pagination.totalPages > 0 && busqueda.length === 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-600">
                Total de registros: <span className="font-semibold text-[#3E2723]">{pagination.totalItems}</span> | Página <span className="font-semibold text-[#3E2723]">{pagination.currentPage}</span> de {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${pagination.currentPage === 1
                    ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-[#3E2723] border-[#E8D9C5] hover:bg-[#E8D9C5]"
                    }`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${pagination.currentPage === pagination.totalPages
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

      {/* 7. Se llama al componente enviándole las props */}
      <FormCreacionLivestock
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        usuarioEditor={usuarioEditor}
      />
    </div>
  );
}