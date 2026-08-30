"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function FormCreacionMount() {
  const router = useRouter()

  const [animales, setAnimales] = useState<any[]>([])
  const [fechaMonta, setFechaMonta] = useState("")
  const [chapetaMacho, setChapetaMacho] = useState("")
  const [chapetaHembra, setChapetaHembra] = useState("")
  const [numeroMonta, setNumeroMonta] = useState("")
  const [posibleFechaParto, setPosibleFechaParto] = useState("")
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("http://localhost:3001/api/livestock/livestockAll")
        const json = await res.json()

        const datos = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json?.data?.data)
            ? json.data.data
            : Array.isArray(json?.animales)
              ? json.animales
              : Array.isArray(json)
                ? json
                : []

        setAnimales(datos)
      } catch (e) {
        console.error(e)
      }
    }
    cargar()
  }, [])

  const listaAnimales = Array.isArray(animales) ? animales : []
  const machos = listaAnimales.filter(a => (a.sexo || "").toLowerCase() === "macho")
  const hembras = listaAnimales.filter(a => (a.sexo || "").toLowerCase() === "hembra")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)

    const macho = machos.find(a => a.chapeta === chapetaMacho)
    const hembra = hembras.find(a => a.chapeta === chapetaHembra)

    if (!macho || !hembra) {
      alert("Debe seleccionar un macho y una hembra.")
      setEnviando(false)
      return
    }

    const nuevaMonta = {
      fechaMonta,
      numeroMonta,
      nombreMacho: macho.nombre,
      razaMacho: macho.raza,
      chapetaMacho: macho.chapeta,
      nombreHembra: hembra.nombre,
      razaHembra: hembra.raza,
      chapetaHembra: hembra.chapeta,
      posibleFechaParto
    }

    try {
      const res = await fetch("http://localhost:3001/api/mounts/mounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaMonta)
      })

      if (!res.ok) throw new Error()

      router.push("/dashboard/mounts/table")
    } catch {
      alert("No se pudo registrar la monta.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="py-10 px-6">
      {/* Contenedor superior con el botón fuera del formulario */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button 
          disabled={enviando} 
          type="submit"
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {enviando ? "Registrando..." : "Registrar Monta"}
        </button>
      </div>

      {/* Formulario */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Formulario de Montas</h1>
          <p className="text-green-100 mt-1">Ingresa la información de la monta realizada</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Monta</label>
            <input type="date" required value={fechaMonta} onChange={e => setFechaMonta(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Chapeta del Macho</label>
            <select required value={chapetaMacho} onChange={e => setChapetaMacho(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="">Selecciona una chapeta</option>
              {machos.map(m => (
                <option key={m.id} value={m.chapeta}>{m.chapeta} - {m.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Chapeta de la Hembra</label>
            <select required value={chapetaHembra} onChange={e => setChapetaHembra(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="">Selecciona una chapeta</option>
              {hembras.map(h => (
                <option key={h.id} value={h.chapeta}>{h.chapeta} - {h.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Monta</label>
            <input type="number" required value={numeroMonta} onChange={e => setNumeroMonta(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Posible Fecha de Parto</label>
            <input type="date" required value={posibleFechaParto} onChange={e => setPosibleFechaParto(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>
        </form>
      </div>
    </div>
  )
}