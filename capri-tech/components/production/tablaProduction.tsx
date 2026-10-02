"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function formatearFecha(fechaISO: string) {
  if (!fechaISO) return "—"
  const fecha = new Date(fechaISO)
  return fecha.toLocaleDateString("es-CO")
}

function formatearMoneda(valor: number) {
  if (valor === null || valor === undefined) return "—"
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor)
}

type Props = {
  busqueda?: string
  headerExtra?: React.ReactNode
}

export default function TablaProduction({ busqueda = "", headerExtra }: Props) {
  const router = useRouter()
  const [produccion, setProduccion] = useState([])
  const [cargando, setCargando] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  })

  const cargarProduccion = async (page = 1) => {
    setCargando(true)
    try {
      const limit = 10
      const offset = (page - 1) * limit
      const respuesta = await fetch(`http://localhost:3001/api/production/productionAll?limit=${limit}&offset=${offset}`)
      const datos = await respuesta.json()
      
      if (datos.success && datos.data) {
        setProduccion(datos.data.data || [])
        if (datos.data.pagination) {
          setPagination(datos.data.pagination)
        }
      } else {
        setProduccion([])
      }
    } catch (error) {
      console.error("Error al cargar la producción:", error)
      setProduccion([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarProduccion(1)
  }, [])

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      cargarProduccion(newPage)
    }
  }

  const produccionFiltrada = produccion.filter((p: any) =>
    (p.productionType || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.fecha || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.descripcionElemento || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.unidadMedida || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.centroCosto || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.nombreTraslada || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.nombreRecibe || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.instructorTecnico || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.observaciones || "").toString().toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="py-10 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">

        <div className="bg-white p-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">Tabla de Producción</h1>
          <p className="text-gray-500 mt-1 text-sm">Registro de producción y control de productos</p>

          {headerExtra}
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#844243] text-white">
                  <th className="p-3 text-left font-semibold text-sm rounded-l-lg">Tipo</th>
                  <th className="p-3 text-left font-semibold text-sm">Fecha</th>
                  <th className="p-3 text-left font-semibold text-sm">Descripción</th>
                  <th className="p-3 text-left font-semibold text-sm">Unidad</th>
                  <th className="p-3 text-left font-semibold text-sm">Cantidad</th>
                  <th className="p-3 text-left font-semibold text-sm">Valor Unitario</th>
                  <th className="p-3 text-left font-semibold text-sm">Valor Total</th>
                  <th className="p-3 text-left font-semibold text-sm">Fecha Vencimiento</th>
                  <th className="p-3 text-left font-semibold text-sm">Centro de Costo</th>
                  <th className="p-3 text-left font-semibold text-sm">Quien Traslada</th>
                  <th className="p-3 text-left font-semibold text-sm">Quien Recibe</th>
                  <th className="p-3 text-left font-semibold text-sm">Instructor Técnico</th>
                  <th className="p-3 text-left font-semibold text-sm rounded-r-lg">Observaciones</th>
                </tr>
              </thead>

              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={13} className="p-6 text-center text-gray-500">
                      Cargando producción...
                    </td>
                  </tr>
                )}

                {!cargando && produccion.length === 0 && (
                  <tr>
                    <td colSpan={13} className="p-6 text-center text-gray-500">
                      Todavía no hay producción registrada.
                    </td>
                  </tr>
                )}

                {!cargando && produccionFiltrada.map(function renderFila(item: any) {
                  return (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-[#faf8f5] transition-colors">
                      <td className="p-3 text-sm text-gray-800 capitalize">{item.productionType}</td>
                      <td className="p-3 text-sm text-gray-800">{formatearFecha(item.fecha)}</td>
                      <td className="p-3 text-sm text-gray-800">{item.descripcionElemento}</td>
                      <td className="p-3 text-sm text-gray-800">{item.unidadMedida}</td>
                      <td className="p-3 text-sm text-gray-800">{item.cantidad}</td>
                      <td className="p-3 text-sm text-gray-800">{formatearMoneda(item.valorUnitario)}</td>
                      <td className="p-3 text-sm text-gray-800">{formatearMoneda(item.valorTotal)}</td>
                      <td className="p-3 text-sm text-gray-800">{formatearFecha(item.fechaVencimiento)}</td>
                      <td className="p-3 text-sm text-gray-800">{item.centroCosto}</td>
                      <td className="p-3 text-sm text-gray-800">{item.nombreTraslada}</td>
                      <td className="p-3 text-sm text-gray-800">{item.nombreRecibe}</td>
                      <td className="p-3 text-sm text-gray-800">{item.instructorTecnico}</td>
                      <td className="p-3 text-sm text-gray-800">{item.observaciones || "—"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {!cargando && pagination.totalPages > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-600">
                Total de registros: <span className="font-semibold text-[#3E2723]">{pagination.totalItems}</span> | Página <span className="font-semibold text-[#3E2723]">{pagination.currentPage}</span> de {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                    pagination.currentPage === 1
                      ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-[#3E2723] border-[#E8D9C5] hover:bg-[#E8D9C5]"
                  }`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                    pagination.currentPage === pagination.totalPages
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