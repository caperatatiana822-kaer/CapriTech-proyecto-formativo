"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function FormCreationMastitis() {
  const router = useRouter()

  const [animales, setAnimales] = useState<any[]>([])
  const [chapeta, setChapeta] = useState("")
  const [fecha, setFecha] = useState("")
  const [resultado, setResultado] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [responsable, setResponsable] = useState("")
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

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)
    setError("")

    if (!chapeta) {
      setError("Debe seleccionar un animal valido.")
      setEnviando(false)
      return
    }

    const chapetaNumero = parseInt(chapeta)

    const animal = todosAnimales.find(a => Number(a.chapeta) === chapetaNumero)
    
    if (!animal) {
      console.log("Animal no encontrado. Chapeta seleccionada:", chapeta)
      console.log("Animales disponibles:", todosAnimales)
      setError("Debe seleccionar un animal valido.")
      setEnviando(false)
      return
    }

    const nuevoCaso = {
      chapeta: chapetaNumero,
      fecha: fecha,
      resultado: resultado,
      observaciones: observaciones,
      responsable: responsable,
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/mastitis/mastitis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCaso),
      })

      const datos = await respuesta.json()
      console.log("Respuesta del backend:", datos)

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error al registrar el caso de mastitis"
        const erroresDetalle = datos.errors ? datos.errors.map((e: any) => e.mensaje).join(", ") : ""
        throw new Error(erroresDetalle || mensajeError)
      }

      alert("Caso de mastitis registrado correctamente")
      router.push("/dashboard/mastitis/table")

    } catch (error: any) {
      console.error("Error al registrar el caso de mastitis:", error)
      setError(error.message || "No se pudo registrar el caso de mastitis")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Formulario de Mastitis</h1>
          <p className="text-[#d7ccc8] mt-1">Ingresa la informacion del diagnostico de mastitis</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Chapeta del Animal *</label>
            <select 
              required 
              value={chapeta} 
              onChange={(e) => {
                console.log("Chapeta seleccionada:", e.target.value)
                setChapeta(e.target.value)
              }}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
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
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Fecha *</label>
            <input 
              type="date" 
              required 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Resultado *</label>
            <select 
              required 
              value={resultado} 
              onChange={(e) => setResultado(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
            >
              <option value="">Selecciona un resultado</option>
              <option value="Negativo">Negativo</option>
              <option value="Positivo">Positivo</option>
              <option value="Sospechoso">Sospechoso</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Responsable *</label>
            <input 
              type="text" 
              required 
              value={responsable} 
              onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              placeholder="Nombre del responsable"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Observaciones</label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              rows={3}
              placeholder="Observaciones adicionales (opcional)"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={enviando || cargandoAnimales}
              className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {enviando ? "Guardando..." : "Registrar mastitis"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreationMastitis;