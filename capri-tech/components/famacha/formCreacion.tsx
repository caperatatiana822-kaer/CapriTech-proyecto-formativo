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

export default function FormCreacionFamacha() {
  const router = useRouter()

  const [animales, setAnimales] = useState<any[]>([])
  const [chapeta, setChapeta] = useState("")
  const [responsable, setResponsable] = useState("")
  const [resultado, setResultado] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")
  const [cargandoAnimales, setCargandoAnimales] = useState(true)

  useEffect(() => {
    async function cargarAnimales() {
      try {
        setCargandoAnimales(true)
        setError("")
        const res = await fetch("http://localhost:3001/api/livestock/livestockAll")
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.message || "Error al cargar animales")
        }

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
      } catch (e: any) {
        console.error(e)
        setError(e.message || "No se pudieron cargar los animales")
      } finally {
        setCargandoAnimales(false)
      }
    }
    cargarAnimales()
  }, [])

  const todosAnimales = Array.isArray(animales) ? animales : []

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)
    setError("")

    const animal = todosAnimales.find(a => a.chapeta === parseInt(chapeta))
    if (!animal) {
      setError("Debe seleccionar un animal valido.")
      setEnviando(false)
      return
    }

    const nuevaFamacha = {
      chapeta: parseInt(chapeta),
      responsable: responsable,
      resultado: resultado,
      observaciones: observaciones
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/famacha/famacha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaFamacha),
      })

      const datos = await respuesta.json()
      console.log("Respuesta del backend:", datos)

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error al registrar la prueba FAMACHA"
        const erroresDetalle = datos.errors ? datos.errors.map((e: any) => e.mensaje).join(", ") : ""
        throw new Error(erroresDetalle || mensajeError)
      }

      alert("Prueba FAMACHA registrada correctamente")
      router.push("/dashboard/famacha")

    } catch (error: any) {
      console.error("Error al registrar la prueba FAMACHA:", error)
      setError(error.message || "No se pudo registrar la prueba FAMACHA")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Famacha
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Formulario de Creacion FAMACHA
        </DialogHeader>
        <DialogDescription className="text-gray-500">
          Ingresa la informacion de la prueba FAMACHA.
        </DialogDescription>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Chapeta del Animal *</label>
            <select
              required
              value={chapeta}
              onChange={(e) => setChapeta(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              disabled={cargandoAnimales}
            >
              <option value="">
                {cargandoAnimales ? "Cargando animales..." : "Selecciona una chapeta"}
              </option>
              {todosAnimales.map((animal) => (
                <option key={animal.id} value={animal.chapeta}>
                  {animal.chapeta} - {animal.nombre} ({animal.sexo})
                </option>
              ))}
            </select>
            {todosAnimales.length === 0 && !cargandoAnimales && (
              <p className="text-sm text-yellow-600 mt-1">
                No hay animales registrados. Registra un animal primero.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Responsable *</label>
            <input
              type="text"
              required
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              placeholder="Nombre del responsable"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Resultado de la Prueba *</label>
            <select
              required
              value={resultado}
              onChange={(e) => setResultado(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
            >
              <option value="">Selecciona un resultado</option>
              <option value="1">1 - Rojo (sin anemia)</option>
              <option value="2">2 - Rojo rosado (sin anemia)</option>
              <option value="3">3 - Rosado (anemia leve)</option>
              <option value="4">4 - Rosado palido (anemia moderada)</option>
              <option value="5">5 - Blanco (anemia severa)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Observaciones</label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              rows={3}
              placeholder="Observaciones adicionales (opcional)"
            />
          </div>

          <DialogFooter className="md:col-span-2 flex justify-end mt-2 !border-t-0 !bg-transparent">
            <button
              type="submit"
              disabled={enviando || cargandoAnimales}
              className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {enviando ? "Guardando..." : "Registrar famacha"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}