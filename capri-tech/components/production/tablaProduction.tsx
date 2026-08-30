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

export default function TablaProduction() {
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

  function handleAgregarProduccion() {
    router.push("/dashboard/production")
  }

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      cargarProduccion(newPage)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-7xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarProduccion}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          + Agregar Producción
        </button>
      </div>
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Tabla de Producción</h1>
          <p className="text-green-100 mt-1">Registro de producción y control de productos</p>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-left">Unidad</th>
                <th className="p-3 text-left">Cantidad</th>
                <th className="p-3 text-left">Valor Unitario</th>
                <th className="p-3 text-left">Valor Total</th>
                <th className="p-3 text-left">Fecha Vencimiento</th>
                <th className="p-3 text-left">Centro de Costo</th>
                <th className="p-3 text-left">Quien Traslada</th>
                <th className="p-3 text-left">Quien Recibe</th>
                <th className="p-3 text-left">Instructor Técnico</th>
                <th className="p-3 text-left">Observaciones</th>
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

              {!cargando && produccion.map(function renderFila(item: any) {
                return (
                  <tr key={item.id} className="border-b hover:bg-green-50 transition">
                    <td className="p-3 capitalize">{item.productionType}</td>
                    <td className="p-3">{formatearFecha(item.fecha)}</td>
                    <td className="p-3">{item.descripcionElemento}</td>
                    <td className="p-3">{item.unidadMedida}</td>
                    <td className="p-3">{item.cantidad}</td>
                    <td className="p-3">{formatearMoneda(item.valorUnitario)}</td>
                    <td className="p-3">{formatearMoneda(item.valorTotal)}</td>
                    <td className="p-3">{formatearFecha(item.fechaVencimiento)}</td>
                    <td className="p-3">{item.centroCosto}</td>
                    <td className="p-3">{item.nombreTraslada}</td>
                    <td className="p-3">{item.nombreRecibe}</td>
                    <td className="p-3">{item.instructorTecnico}</td>
                    <td className="p-3">{item.observaciones || "—"}</td>
                  </tr>
                )
              })}
            </tbody>

          </table>

          {!cargando && (
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
                      : "bg-green-100 text-green-700 hover:bg-green-200"
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
                      : "bg-green-100 text-green-700 hover:bg-green-200"
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