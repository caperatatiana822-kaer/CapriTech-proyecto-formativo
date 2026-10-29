"use client"

import { useState, useEffect } from "react"
import { Search, CirclePlus, Pencil } from "lucide-react" 
import FormCreacionUsuario, { User } from "@/components/user/formCreacion"

export default function TablaUsuario() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [usuarioEditor, setUsuarioEditor] = useState<User | null>(null)

  const [busqueda, setBusqueda] = useState("")

        const cargarUsuarios = async (pagina = 1) => {
    try {
      setCargando(true)
      setError("")
      const limite = 10
      
      const respuesta = await fetch(`http://localhost:3001/api/user?limit=${limite}&page=${pagina}`)
      const datos = await respuesta.json().catch(() => ({}))
      
      if (!respuesta.ok) throw new Error(datos.message || "Error al cargar usuarios")

      const lista = Array.isArray(datos?.data) ? datos.data : []
      
      const total = Number(datos?.pagination?.total ?? lista.length ?? 0)
      const paginas = Number(datos?.pagination?.totalPages ?? 1)
      const paginaActualServidor = Number(datos?.pagination?.page ?? pagina)

      setUsuarios(lista)
      setTotalItems(total)
      setTotalPaginas(paginas || 1)
      setPaginaActual(paginaActualServidor || pagina)
      
    } catch (error: any) {
      console.error("Error al cargar los usuarios:", error)
      setError(error.message || "No se pudieron cargar los usuarios")
      setUsuarios([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios(1)
  }, [])

  const handleSuccess = () => {
    cargarUsuarios(paginaActual)
  }

  function handleAgregarUsuario() {
    setUsuarioEditor(null) 
    setIsModalOpen(true)
  }

  function handleEditarUsuario(u: User) {
    setUsuarioEditor(u)
    setIsModalOpen(true)
  }

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarUsuarios(pagina)
    }
  }

  const usuariosFiltrados = usuarios.filter((u: any) =>
    (u.name || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (u.email || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (u.documento || u.documentId || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (u.postJob || "").toString().toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="py-10 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">

        <div className="bg-white p-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">Usuarios</h1>
          <p className="text-gray-500 mt-1 text-sm">Registro de usuarios del sistema</p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3E2723]" />
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full border border-[#844243] rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#E8D9C5] text-sm"
              />
            </div>
            <button onClick={handleAgregarUsuario} className="bg-[#aff5af] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[bg-[#E2EFE2]] transition flex items-center gap-2">
              <CirclePlus className="w-5 h-5" /> Agregar Usuario
            </button>
          </div>
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
                  <th className="p-3 text-left font-semibold text-sm rounded-l-lg">ID</th>
                  <th className="p-3 text-left font-semibold text-sm">Nombre</th>
                  <th className="p-3 text-left font-semibold text-sm">Email</th>
                  <th className="p-3 text-left font-semibold text-sm">Documento</th>
                  <th className="p-3 text-left font-semibold text-sm">Cargo</th>
                  <th className="p-3 text-left font-semibold text-sm">Estado</th>
                  <th className="p-3 text-left font-semibold text-sm rounded-r-lg">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500"> 
                      Cargando usuarios...
                    </td>
                  </tr>
                )}

                {!cargando && !error && usuarios.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500"> 
                      Todavia no hay usuarios registrados.
                    </td>
                  </tr>
                )}

                {!cargando && !error && usuariosFiltrados.map(function renderFila(usuario: any, index: number) {
                  return (
                    <tr key={usuario.id || index} className="border-b border-gray-100 hover:bg-[#faf8f5] transition-colors">
                      <td className="p-3 text-sm text-gray-800 font-medium">{usuario.id}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{usuario.name}</td>
                      <td className="p-3 text-sm text-gray-800">{usuario.email}</td>
                      <td className="p-3 text-sm text-gray-800">{usuario.documento || usuario.documentId}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">{usuario.postJob}</td>
                      <td className="p-3 text-sm text-gray-800 capitalize">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          usuario.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {usuario.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>

                      <td className="p-3 text-sm text-gray-800">
                        <button onClick={() => handleEditarUsuario({ ...usuario, documento: usuario.documento || usuario.documentId })} className="text-blue-600 hover:text-blue-800 transition">
                          <Pencil className="w-5 h-5" />
                        </button>
                      </td>
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
                <button onClick={() => irPagina(paginaActual - 1)} disabled={paginaActual === 1} className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${paginaActual === 1 ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-[#3E2723] border-[#E8D9C5] hover:bg-[#E8D9C5]"}`}>
                  ← Anterior
                </button>
                <button onClick={() => irPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${paginaActual === totalPaginas ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-[#3E2723] border-[#E8D9C5] hover:bg-[#E8D9C5]"}`}>
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <FormCreacionUsuario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        usuarioEditor={usuarioEditor}
      />
    </div>
  )
}