"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, CirclePlus } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

function FormCreacionLivestock() {
  const [nombre, setNombre] = useState("")
  const [chapeta, setChapeta] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>(undefined)
  const [raza, setRaza] = useState("")
  const [sexo, setSexo] = useState("Macho")
  const [etapaProduccion, setEtapaProduccion] = useState("carne")
  const [observaciones, setObservaciones] = useState("")
  const [enviando, setEnviando] = useState(false)

  const [open, setOpen] = useState(false)

  function limpiarFormulario() {
    setNombre("")
    setChapeta("")
    setFechaNacimiento(undefined)
    setRaza("")
    setSexo("Macho")
    setEtapaProduccion("carne")
    setObservaciones("")
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)

    const nuevoAnimal = {
      nombre: nombre,
      chapeta: chapeta,
      fechaNacimiento: fechaNacimiento ? format(fechaNacimiento, "yyyy-MM-dd") : null,
      raza: raza,
      sexo: sexo,
      etapaProduccion: etapaProduccion,
      observaciones: observaciones,
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/livestock/livestock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAnimal),
      })

      if (!respuesta.ok) {
        throw new Error("El servidor respondió con un error")
      }

      limpiarFormulario()
      setOpen(false)
    } catch (error) {
      console.error("Error al registrar el animal:", error)
      alert("No se pudo registrar el animal. Intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#aff5af] border border-[#90a78f] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[bg-[#E2EFE2]] transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Caprino
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Formulario de Inventario
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nombre</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Chapeta</label>
            <input
              type="text"
              required
              value={chapeta}
              onChange={(e) => setChapeta(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Fecha de nacimiento
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between border border-[#d7ccc8] rounded-lg p-3 text-left focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <span className={fechaNacimiento ? "text-gray-900" : "text-gray-400"}>
                    {fechaNacimiento
                      ? format(fechaNacimiento, "dd/MM/yyyy", { locale: es })
                      : "Selecciona una fecha"}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fechaNacimiento}
                  onSelect={setFechaNacimiento}
                  locale={es}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Raza</label>
            <select
              required
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Selecciona una raza</option>
              <option value="Alpina">Alpina</option>
              <option value="Boer">Boer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Sexo</label>
            <select
              required
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Etapa de Producción
            </label>
            <select
              required
              value={etapaProduccion}
              onChange={(e) => setEtapaProduccion(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="carne">Carne</option>
              <option value="lechera">Lechera</option>
              <option value="cabrito">Cabrito</option>
              <option value="macho_reproductor">Macho reproductor</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Observaciones</label>
            <textarea
              rows={4}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Escribe alguna observación sobre el animal (opcional)"
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
            />
          </div>
          <DialogDescription className="text-gray-500">
          Ingresa la información del caprino.
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

export default FormCreacionLivestock