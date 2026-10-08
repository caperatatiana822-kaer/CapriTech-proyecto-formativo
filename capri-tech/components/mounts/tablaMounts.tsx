"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function formatearFecha(fechaISO:string){
  if(!fechaISO) return "—"
  return new Date(fechaISO).toLocaleDateString("es-CO")
}

type Props = {
  busqueda?: string
  headerExtra?: React.ReactNode
}

export default function TablaMounts({ busqueda = "", headerExtra }: Props){
  const router = useRouter()
  const [montas,setMontas]=useState<any[]>([])
  const [cargando,setCargando]=useState(true)
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const cargarMontas = async (pagina = 1) => {
    try{
      setCargando(true)
      const limite = 10
      const offset = (pagina - 1) * limite
      const res=await fetch(`http://localhost:3001/api/mounts/mountsAll?limit=${limite}&offset=${offset}`)
      const json=await res.json()
      
      console.log("Respuesta MONTS:", json)
      
      if (json.success && json.data) {
        const dataList = json.data.data || json.data || []
        setMontas(dataList)
        setTotalItems(json.data.totalItems || 0)
        setTotalPaginas(json.data.totalPages || 1)
        setPaginaActual(json.data.currentPage || 1)
      } else {
        setMontas([])
      }
    }catch(e){
      console.error("Error al cargar montas:",e)
      setMontas([])
    }finally{
      setCargando(false)
    }
  }

  useEffect(()=>{
    cargarMontas(1)
  },[])

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarMontas(pagina)
    }
  }

  const montasFiltradas = montas.filter((m: any) =>
    (m.fechaMonta || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.nombreMacho || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.razaMacho || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.chapetaMacho || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.nombreHembra || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.razaHembra || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.chapetaHembra || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.numeroMonta || "").toString().toLowerCase().includes(busqueda.toLowerCase()) ||
    (m.posibleFechaParto || "").toString().toLowerCase().includes(busqueda.toLowerCase())
  )

  return(
    <div className="py-10 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">

        <div className="bg-white p-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">Montas</h1>
          <p className="text-gray-500 mt-1 text-sm">Registro de montas y seguimiento reproductivo</p>

          {headerExtra}
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#844243] text-white">
                  <th className="p-3 text-left font-semibold text-sm rounded-l-lg">Fecha de Monta</th>
                  <th className="p-3 text-left font-semibold text-sm">Nombre del Macho</th>
                  <th className="p-3 text-left font-semibold text-sm">Raza del Macho</th>
                  <th className="p-3 text-left font-semibold text-sm">Chapeta del Macho</th>
                  <th className="p-3 text-left font-semibold text-sm">Nombre de la Hembra</th>
                  <th className="p-3 text-left font-semibold text-sm">Raza de la Hembra</th>
                  <th className="p-3 text-left font-semibold text-sm">Chapeta de la Hembra</th>
                  <th className="p-3 text-left font-semibold text-sm">Número de Monta</th>
                  <th className="p-3 text-left font-semibold text-sm rounded-r-lg">Posible Fecha de Parto</th>
                </tr>
              </thead>
              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">Cargando montas...</td>
                  </tr>
                )}
                {!cargando && montas.length===0 && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">Todavía no hay montas registradas.</td>
                  </tr>
                )}
                {!cargando && montasFiltradas.map((item:any)=>(
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-[#faf8f5] transition-colors">
                    <td className="p-3 text-sm text-gray-800">{formatearFecha(item.fechaMonta)}</td>
                    <td className="p-3 text-sm text-gray-800">{item.nombreMacho}</td>
                    <td className="p-3 text-sm text-gray-800">{item.razaMacho}</td>
                    <td className="p-3 text-sm text-gray-800">{item.chapetaMacho}</td>
                    <td className="p-3 text-sm text-gray-800">{item.nombreHembra}</td>
                    <td className="p-3 text-sm text-gray-800">{item.razaHembra}</td>
                    <td className="p-3 text-sm text-gray-800">{item.chapetaHembra}</td>
                    <td className="p-3 text-sm text-gray-800">{item.numeroMonta}</td>
                    <td className="p-3 text-sm text-gray-800">{formatearFecha(item.posibleFechaParto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!cargando && totalItems > 0 && (
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
  )
}