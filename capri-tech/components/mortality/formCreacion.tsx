"use client"

import { useState, useEffect } from "react"
import { CirclePlus } from "lucide-react"
import { Toaster, toast } from "@/components/ui/toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

function FormCreacionMortality() {
  const [animales, setAnimales] = useState<any[]>([])
  const [chapeta, setChapeta] = useState("")
  const [fecha, setFecha] = useState("")
  const [diagnostico, setDiagnostico] = useState("")
  
  // Ya no necesitamos el estado 'active' ni 'setActive'
  
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")
  const [cargandoAnimales, setCargandoAnimales] = useState(true)

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

  const todosAnimales = Array.isArray(animales) ? animales : []

  function limpiarFormulario() {
    setChapeta("")
    setFecha("")
    setDiagnostico("")
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

    const nuevaMortalidad = {
      chapeta: parseInt(chapeta),
      fecha: fecha,
      diagnosticopresuntivo: diagnostico,
      active: true, // 👈 FORZAMOS EL ESTADO ACTIVO
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/mortality/mortality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaMortalidad),
      })

      const datos = await respuesta.json()
      console.log("Respuesta del backend:", datos)

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error al registrar la mortalidad"
        const erroresDetalle = datos.errors ? datos.errors.map((e: any) => e.mensaje).join(", ") : ""
        throw new Error(erroresDetalle || mensajeError)
      }

      limpiarFormulario()
      setOpen(false)
      window.dispatchEvent(new Event("mortality:created"))
      toast.add({
        title: "Éxito",
        description: "La mortalidad se registró correctamente",
        type: "success",
      });
      return; 

    } catch (error: any) {
      console.error("Error al registrar la mortalidad:", error)
      toast.add({
        title: "Corregir",
        description: "No se pudo registrar la mortalidad. Intenta de nuevo.",
        type: "error",
      });
      return;
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#aff5af] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Mortalidad
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Crear Mortalidad
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
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            <label className="block text-sm font-semibold text-[#000000] mb-2">Fecha *</label>
            <input
              type="date"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Diagnostico Presuntivo *</label>
            <input
              type="text"
              required
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Ej: Neumonia, Parasitosis, etc."
            />
          </div>

          <DialogDescription className="text-gray-500">
          Ingresa la informacion del registro de mortalidad.
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
              disabled={enviando || cargandoAnimales}
              className="bg-[#aff5af] text-black font-semibold px-8 py-3 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Guardar"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormCreacionMortality