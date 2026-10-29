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

function FormCreacionFeeding() {
  const [responsables, setResponsables] = useState<any[]>([])
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [responsable, setResponsable] = useState("")
  const [alimento, setAlimento] = useState("")
  const [cantidad, setCantidad] = useState("")
  
  // Eliminamos la variable de estado 'active' y su setter
  
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")
  const [cargandoResponsables, setCargandoResponsables] = useState(true)

  const [open, setOpen] = useState(false)

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

  function limpiarFormulario() {
    setFecha("")
    setHora("")
    setResponsable("")
    setAlimento("")
    setCantidad("")
    setError("")
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)
    setError("")

    const nuevaAlimentacion = {
      fecha: fecha,
      hora: hora,
      responsable: responsable,
      alimento: alimento,
      cantidad: parseFloat(cantidad),
      active: true,
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/feeding/feedings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaAlimentacion),
      })

      const datos = await respuesta.json()
      console.log("Respuesta del backend:", datos)

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error al registrar la alimentacion"
        const erroresDetalle = datos.errors ? datos.errors.map((e: any) => e.mensaje).join(", ") : ""
        throw new Error(erroresDetalle || mensajeError)
      }

      limpiarFormulario()
      setOpen(false)
      window.dispatchEvent(new Event("feeding:created"))
      toast.add({
        title: "Éxito",
        description: "La alimentación se registró correctamente",
        type: "success",
      });
      return;
    } catch (error: any) {
      console.error("Error al registrar la alimentacion:", error)
      toast.add({
        title: "Corregir",
        description: "No se pudo registrar la alimentacion. Intenta de nuevo.",
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
          Agregar alimentacion
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Crear Alimentacion
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Hora *</label>
            <input
              type="time"
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Responsable *</label>
            <select
              required
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Alimento *</label>
            <input
              type="text"
              required
              value={alimento}
              onChange={(e) => setAlimento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Tipo de alimento"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Cantidad (Kg) *</label>
            <input
              type="number"
              step="0.01"
              required
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Ej: 5.5"
            />
          </div>

          <DialogDescription className="text-gray-500">
          Ingresa la informacion de la alimentacion suministrada.
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
              disabled={enviando || cargandoResponsables}
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

export default FormCreacionFeeding