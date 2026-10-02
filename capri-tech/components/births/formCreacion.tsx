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

function FormCreacionNacimiento() {
  const router = useRouter()

  const [chapeta, setChapeta] = useState("")
  const [nombreAnimal, setNombreAnimal] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [raza, setRaza] = useState("")
  const [sexo, setSexo] = useState("Macho")
  const [pesoNacer, setPesoNacer] = useState("")
  const [fichaMadre, setFichaMadre] = useState("")
  const [fichaPadre, setFichaPadre] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")
  const [erroresDetallados, setErroresDetallados] = useState<string[]>([])

  function limpiarFormulario() {
    setChapeta("")
    setNombreAnimal("")
    setFechaNacimiento("")
    setRaza("")
    setSexo("Macho")
    setPesoNacer("")
    setFichaMadre("")
    setFichaPadre("")
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)
    setError("")
    setErroresDetallados([])

    const validaciones = []
    if (!chapeta) validaciones.push("La chapeta es obligatoria")
    if (!nombreAnimal) validaciones.push("El nombre es obligatorio")
    if (!fechaNacimiento) validaciones.push("La fecha de nacimiento es obligatoria")
    if (!raza) validaciones.push("La raza es obligatoria")
    if (!pesoNacer) validaciones.push("El peso al nacer es obligatorio")
    if (!fichaMadre) validaciones.push("La chapeta de la madre es obligatoria")
    if (!fichaPadre) validaciones.push("La chapeta del padre es obligatoria")

    if (validaciones.length > 0) {
      setErroresDetallados(validaciones)
      setEnviando(false)
      return
    }

    const nuevoNacimiento = {
      chapeta: parseInt(chapeta),
      nombre: nombreAnimal,
      fechaNacimiento: fechaNacimiento,
      raza: raza,
      sexo: sexo,
      pesoNacimiento: parseFloat(pesoNacer),
      chapetaMadre: parseInt(fichaMadre),
      chapetaPadre: parseInt(fichaPadre),
    }

    console.log("Datos a enviar:", nuevoNacimiento)

    try {
      const respuesta = await fetch("http://localhost:3001/api/births/births", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoNacimiento),
      })

      const datos = await respuesta.json()
      console.log("Respuesta completa del backend:", datos)

      if (!respuesta.ok) {
        let mensajeError = "Error al registrar el nacimiento"

        if (datos.message) {
          mensajeError = datos.message
        }
        if (datos.errors && Array.isArray(datos.errors)) {
          const erroresMensajes = datos.errors.map((e: any) => e.mensaje || e.message || JSON.stringify(e))
          setErroresDetallados(erroresMensajes)
          throw new Error(mensajeError)
        }

        throw new Error(mensajeError)
      }
      alert("Nacimiento registrado correctamente")
      limpiarFormulario()
      router.push("/dashboard/births")

    } catch (error: any) {
      console.error("Error al registrar el nacimiento:", error)
      setError(error.message || "No se pudo registrar el nacimiento")
      if (erroresDetallados.length === 0) {
        setErroresDetallados([error.message || "Error desconocido al registrar el nacimiento"])
      }
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Parto
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Formulario de creación de partos
        </DialogHeader>
        <DialogDescription className="text-gray-500">
          Ingresa la información del nuevo parto.
        </DialogDescription>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2">
            <p className="text-red-700 font-semibold">Error:</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {erroresDetallados.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-2">
            <p className="text-yellow-700 font-semibold">Detalles del error:</p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-1">
              {erroresDetallados.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Chapeta *</label>
            <input
              type="number"
              value={chapeta}
              onChange={(e) => setChapeta(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nombre *</label>
            <input
              type="text"
              value={nombreAnimal}
              onChange={(e) => setNombreAnimal(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Fecha de parto *</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Raza *</label>
            <input
              type="text"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Sexo *</label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Peso al Nacer (Kg) *</label>
            <input
              type="number"
              step="0.01"
              value={pesoNacer}
              onChange={(e) => setPesoNacer(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Chapeta Madre *</label>
            <input
              type="number"
              value={fichaMadre}
              onChange={(e) => setFichaMadre(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Chapeta Padre *</label>
            <input
              type="number"
              value={fichaPadre}
              onChange={(e) => setFichaPadre(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#844243] transition bg-white"
            />
          </div>

          <DialogFooter className="md:col-span-2 flex justify-end mt-2 !border-t-0 !bg-transparent">
            <button
              type="submit"
              disabled={enviando}
              className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Registrar Parto"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormCreacionNacimiento