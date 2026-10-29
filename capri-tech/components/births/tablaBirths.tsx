"use client"
import { useState, useEffect } from "react"

function formatearFecha(fechaISO: string) {
  if (!fechaISO) return "—"
  return new Date(fechaISO).toLocaleDateString("es-CO")
}

type Props = { busqueda?: string; headerExtra?: React.ReactNode }

export default function TablaBirths({ busqueda = "", headerExtra }: Props) {
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
      const limite = 10
      const offset = (pagina - 1) * limite
      const respuesta = await fetch(`http://localhost:3001/api/births/birthsAll?limit=${limite}&offset=${offset}`)
      const datos = await respuesta.json()
      
      if (!respuesta.ok) throw new Error(datos.message || `Error ${respuesta.status}`)

      let lista = datos.data?.data || datos.data || []
      setNacimientos(lista)
      setTotalItems(datos.data?.totalItems || lista.length)
      setTotalPaginas(datos.data?.totalPages || 1)
      setPaginaActual(datos.data?.currentPage || pagina)
    } catch (error: any) {
      setError(error.message)
      setNacimientos([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarNacimientos(1)
    const handler = () => cargarNacimientos(1)
    window.addEventListener("Births:created", handler)
    return () => window.removeEventListener("Births:created", handler)
  }, [])

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) cargarNacimientos(pagina)
  }

  const filtrados = nacimientos.filter((n: any) =>
    (n.razas || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (n.responsable || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (n.idMonta || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (typeof n.active === "boolean" && (n.active ? "activo" : "inactivo").includes(busqueda.toLowerCase()))
  )

  return (
    <div className="py-10 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-white p-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">Partos</h1>
          <p className="text-gray-500 mt-1 text-sm">Historial y resultados de partos</p>
          {headerExtra}
        </div>

        <div className="p-6">
          {error && <div className="bg-red-50 text-red-700 p-4 mb-4">{error}</div>}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#844243] text-white">
                  <th className="p-3 text-left font-semibold text-sm rounded-l-lg">ID Monta</th>
                  <th className="p-3 text-left font-semibold text-sm">Fecha Parto</th>
                  <th className="p-3 text-left font-semibold text-sm">Raza</th>
                  <th className="p-3 text-left font-semibold text-sm">Vivos</th>
                  <th className="p-3 text-left font-semibold text-sm">Muertos</th>
                  <th className="p-3 text-left font-semibold text-sm">Machos</th>
                  <th className="p-3 text-left font-semibold text-sm">Hembras</th>
                  <th className="p-3 text-left font-semibold text-sm">Responsable</th>
                  {/* COLUMNA DE ESTADO AGREGADA */}
                  <th className="p-3 text-left font-semibold text-sm rounded-r-lg">Estado</th>
                </tr>
              </thead>
              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      Cargando partos...
                    </td>
                  </tr>
                )}
                
                {!cargando && !error && nacimientos.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      No hay partos registrados.
                    </td>
                  </tr>
                )}

                {/* Mensaje si la búsqueda no arroja resultados */}
                {!cargando && !error && filtrados.length === 0 && nacimientos.length > 0 && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      No se encontraron partos que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
                
                {!cargando && !error && filtrados.map((n: any) => (
                  <tr key={n.id} className="border-b border-gray-100 hover:bg-[#faf8f5]">
                    <td className="p-3 text-sm text-gray-800 font-medium">#{n.idMonta}</td>
                    <td className="p-3 text-sm text-gray-800">{formatearFecha(n.fechaParto)}</td>
                    <td className="p-3 text-sm text-gray-800 capitalize">{n.razas}</td>
                    <td className="p-3 text-sm text-gray-800 font-semibold text-green-700">{n.nacidosVivos}</td>
                    <td className="p-3 text-sm text-gray-800 font-semibold text-red-700">{n.nacidosMuertos}</td>
                    <td className="p-3 text-sm text-gray-800">{n.machos}</td>
                    <td className="p-3 text-sm text-gray-800">{n.hembras}</td>
                    <td className="p-3 text-sm text-gray-800 capitalize">{n.responsable}</td>
                    <td className="p-3 text-sm text-gray-800">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${n.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}>
                        {n.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!cargando && !error && totalItems > 0 && busqueda.length === 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">Total: <b>{totalItems}</b> | Página <b>{paginaActual}</b> de {totalPaginas}</div>
              <div className="flex gap-2">
                <button onClick={() => irPagina(paginaActual - 1)} disabled={paginaActual === 1} className="px-4 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50">← Anterior</button>
                <button onClick={() => irPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} className="px-4 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50">Siguiente →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}