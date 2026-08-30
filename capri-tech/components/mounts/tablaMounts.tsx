"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function formatearFecha(fechaISO:string){
  if(!fechaISO) return "—"
  return new Date(fechaISO).toLocaleDateString("es-CO")
}

export default function TablaMounts(){
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
        // Asegurarnos de obtener los datos correctamente
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

  function handleAgregarMonta() {
    router.push("/dashboard/mounts")
  }

  function irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= totalPaginas) {
      cargarMontas(pagina)
    }
  }

  return(
    <div className="py-10 px-6">
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button 
          onClick={handleAgregarMonta}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          + Agregar Monta
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Tabla de Montas</h1>
          <p className="text-green-100 mt-1">Registro de montas y seguimiento reproductivo</p>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="p-3 text-left">Fecha de Monta</th>
                <th className="p-3 text-left">Nombre del Macho</th>
                <th className="p-3 text-left">Raza del Macho</th>
                <th className="p-3 text-left">Chapeta del Macho</th>
                <th className="p-3 text-left">Nombre de la Hembra</th>
                <th className="p-3 text-left">Raza de la Hembra</th>
                <th className="p-3 text-left">Chapeta de la Hembra</th>
                <th className="p-3 text-left">Número de Monta</th>
                <th className="p-3 text-left">Posible Fecha de Parto</th>
              </tr>
            </thead>
            <tbody>
              {cargando && <tr><td colSpan={9} className="p-6 text-center text-gray-500">Cargando montas...</td></tr>}
              {!cargando && montas.length===0 && <tr><td colSpan={9} className="p-6 text-center text-gray-500">Todavía no hay montas registradas.</td></tr>}
              {!cargando && montas.map((item:any)=>(
                <tr key={item.id} className="border-b hover:bg-green-50 transition">
                  <td className="p-3">{formatearFecha(item.fechaMonta)}</td>
                  <td className="p-3">{item.nombreMacho}</td>
                  <td className="p-3">{item.razaMacho}</td>
                  <td className="p-3">{item.chapetaMacho}</td>
                  <td className="p-3">{item.nombreHembra}</td>
                  <td className="p-3">{item.razaHembra}</td>
                  <td className="p-3">{item.chapetaHembra}</td>
                  <td className="p-3">{item.numeroMonta}</td>
                  <td className="p-3">{formatearFecha(item.posibleFechaParto)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!cargando && totalItems > 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Página {paginaActual} de {totalPaginas}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => irPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    paginaActual === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Anterior
                </button>
                <button
                  onClick={() => irPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    paginaActual === totalPaginas
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}