"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function FormCreacionLivestock() {
  const router = useRouter()

  const [nombre, setNombre] = useState("")
  const [chapeta, setChapeta] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>(undefined)
  const [raza, setRaza] = useState("")
  const [sexo, setSexo] = useState("Macho")
  const [etapaProduccion, setEtapaProduccion] = useState("carne")
  const [observaciones, setObservaciones] = useState("")
  const [enviando, setEnviando] = useState(false)

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

      router.push("/dashboard/livestock/table")
    } catch (error) {
      console.error("Error al registrar el animal:", error)
      alert("No se pudo registrar el animal. Intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button 
          type="submit" 
          disabled={enviando}
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50">
          {enviando ? "Registrando..." : "+ Agregar Caprino"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Formulario de Inventario</h1>
          <p className="text-green-100 mt-1">Ingresa la información del caprino</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Chapeta</label>
            <input type="text" required value={chapeta} onChange={(e) => setChapeta(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de nacimiento</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-3 text-left focus:outline-none focus:ring-2 focus:ring-green-600"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Raza</label>
            <select required value={raza} onChange={(e) => setRaza(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="">Selecciona una raza</option>
              <option value="Alpina">Alpina</option>
              <option value="Boer">Boer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sexo</label>
            <select required value={sexo} onChange={(e) => setSexo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Etapa de Producción</label>
            <select required value={etapaProduccion} onChange={(e) => setEtapaProduccion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="carne">Carne</option>
              <option value="lechera">Lechera</option>
              <option value="cabrito">Cabrito</option>
              <option value="macho_reproductor">Macho reproductor</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Observaciones</label>
            <textarea
              rows={4}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Escribe alguna observación sobre el animal (opcional)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreacionLivestock;