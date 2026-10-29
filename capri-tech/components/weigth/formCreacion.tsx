"use client"

import { useState, useEffect } from "react"
import { CirclePlus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

function FormCreationWeight() {
  const [animales, setAnimales] = useState<any[]>([])
  const [responsables, setResponsables] = useState<any[]>([]) 
  const [chapeta, setChapeta] = useState("")
  const [fecha, setFecha] = useState("")
  const [peso, setPeso] = useState("")
  const [responsable, setResponsable] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")
  const [cargandoAnimales, setCargandoAnimales] = useState(true)
  const [cargandoResponsables, setCargandoResponsables] = useState(true) 
  const [open, setOpen] = useState(false)

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

  useEffect(() => {
    async function cargarResponsables() {
      try {
        setCargandoResponsables(true)
        const respuesta = await fetch("http://localhost:3001/api/responsible/responsibleAll")
        const datos = await respuesta.json()

        if (!respuesta.ok) {
          throw new Error(datos.message || "Error al cargar responsables")
        }

        const listaResponsables = datos?.data?.data ?? datos?.data ?? datos
        setResponsables(Array.isArray(listaResponsables) ? listaResponsables : [])
      } catch (error) {
        console.error("Error al cargar responsables:", error)
        setError("No se pudieron cargar los responsables")
      } finally {
        setCargandoResponsables(false)
      }
    }
    cargarResponsables()
  }, [])

  const todosAnimales = Array.isArray(animales) ? animales : []

  function limpiarFormulario() {
    setChapeta("")
    setFecha("")
    setPeso("")
    setResponsable("")
    setError("")
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)
    setError("")

    if (!chapeta) {
      setError("Debe seleccionar un animal valido.")
      setEnviando(false)
      return
    }

    const animal = todosAnimales.find(a => String(a.chapeta) === String(chapeta))

    if (!animal) {
      setError("Debe seleccionar un animal valido.")
      setEnviando(false)
      return
    }

    const nuevoPesaje = {
      chapeta: parseInt(chapeta),
      fechaPesaje: fecha,
      peso: parseFloat(peso),
      responsable: responsable,
      active: true, // 👈 FORZAMOS EL ESTADO ACTIVO
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/weigth/weigth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPesaje),
      })

      const datos = await respuesta.json()
      console.log("Respuesta del backend:", datos)

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error al registrar el pesaje"
        const erroresDetalle = datos.errors ? datos.errors.map((e: any) => e.mensaje).join(", ") : ""
        throw new Error(erroresDetalle || mensajeError)
      }

      limpiarFormulario()
      setOpen(false)
      window.dispatchEvent(new Event("weigth:created"))

    } catch (error: any) {
      console.error("Error al registrar el pesaje:", error)
      setError(error.message || "No se pudo registrar el pesaje")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#aff5af] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Pesaje
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Formulario de Pesaje
        </DialogHeader>

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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              disabled={cargandoAnimales}
            >
              <option value="">
                {cargandoAnimales ? "Cargando animales..." : "Selecciona una chapeta"}
              </option>
              {todosAnimales.map((animal) => (
                <option key={animal.id} value={String(animal.chapeta)}>
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
            <label className="block text-sm font-semibold text-[#000000] mb-2">Fecha de Pesaje *</label>
            <input
              type="date"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Ganancia de Peso *</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0"
                required
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Ej: 25.5"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                kg
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Responsable *</label>
            <select
              required
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              disabled={cargandoResponsables}
            >
              <option value="">
                {cargandoResponsables ? "Cargando responsables..." : "Selecciona un responsable"}
              </option>
              {responsables.map((item) => (
                <option key={item.id} value={item.nombre}>
                  {item.nombre}
                </option>
              ))}
            </select>
            {responsables.length === 0 && !cargandoResponsables && (
              <p className="text-sm text-yellow-600 mt-1">
                No hay responsables registrados en el sistema.
              </p>
            )}
          </div>
          
          <DialogDescription className="text-gray-500 md:col-span-2">
            Ingresa la informacion del pesaje realizado.
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
              disabled={enviando || cargandoAnimales || cargandoResponsables}
              className="bg-[#aff5af] text-black font-semibold px-8 py-3 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Registrar Pesaje"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormCreationWeight