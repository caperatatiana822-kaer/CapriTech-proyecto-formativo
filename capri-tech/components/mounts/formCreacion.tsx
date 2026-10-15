"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CirclePlus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function FormCreacionMount() {
  const router = useRouter()

  const [animales, setAnimales] = useState<any[]>([])
  const [fechaMonta, setFechaMonta] = useState("")
  const [chapetaMacho, setChapetaMacho] = useState("")
  const [chapetaHembra, setChapetaHembra] = useState("")
  const [numeroMonta, setNumeroMonta] = useState("")
  const [posibleFechaParto, setPosibleFechaParto] = useState("")
  const [enviando, setEnviando] = useState(false)

  const [open, setOpen] = useState(false)

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

      router.push("/dashboard/mounts")
    } catch {
      alert("No se pudo registrar la monta.")
    } finally {
      setEnviando(false)
      setEnviando(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
         <button className="bg-[#aff5af] border border-[#90a78f] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[bg-[#E2EFE2]] transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Monta
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Formulario de Montas
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Fecha de Monta</label>
            <input type="date" required value={fechaMonta} onChange={e => setFechaMonta(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Chapeta del Macho</label>
            <select required value={chapetaMacho} onChange={e => setChapetaMacho(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option value="">Selecciona una chapeta</option>
              {machos.map(m => (
                <option key={m.id} value={m.chapeta}>{m.chapeta} - {m.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Chapeta de la Hembra</label>
            <select required value={chapetaHembra} onChange={e => setChapetaHembra(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option value="">Selecciona una chapeta</option>
              {hembras.map(h => (
                <option key={h.id} value={h.chapeta}>{h.chapeta} - {h.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Número de Monta</label>
            <input type="number" required value={numeroMonta} onChange={e => setNumeroMonta(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Posible Fecha de Parto</label>
            <input type="date" required value={posibleFechaParto} onChange={e => setPosibleFechaParto(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
          <DialogDescription className="text-gray-500">
          Ingresa la información de la monta realizada.
        </DialogDescription>

          <DialogFooter className="md:col-span-2 flex justify-end mt-2 !border-t-0 !bg-transparent">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-gray-100 border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-gray-200 hover:border-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="bg-[#aff5af] border border-[#90a78f] text-black font-semibold px-8 py-3 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Guardar"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}