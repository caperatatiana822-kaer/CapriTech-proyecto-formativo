"use client"

import { useState } from "react"
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

function FormCreacionFeeding() {
  const router = useRouter()

  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [responsable, setResponsable] = useState("")
  const [alimento, setAlimento] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")

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

      alert("Alimentacion registrada correctamente")
      router.push("/dashboard/feeding")

    } catch (error: any) {
      console.error("Error al registrar la alimentacion:", error)
      setError(error.message || "No se pudo registrar la alimentacion")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Alimentacion
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Formulario de Alimentacion
        </DialogHeader>
        <DialogDescription className="text-gray-500">
          Ingresa la informacion de la alimentacion suministrada.
        </DialogDescription>

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
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Hora *</label>
            <input
              type="time"
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
            />
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

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Alimento *</label>
            <input
              type="text"
              required
              value={alimento}
              onChange={(e) => setAlimento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
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
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243]"
              placeholder="Ej: 5.5"
            />
          </div>

          <DialogFooter className="md:col-span-2 flex justify-end mt-2 !border-t-0 !bg-transparent">
            <button
              type="submit"
              disabled={enviando}
              className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Registrar Alimentacion"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormCreacionFeeding