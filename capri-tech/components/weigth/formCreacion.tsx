"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function FormCreationWeight() {
  const router = useRouter()

  const [animales, setAnimales] = useState<any[]>([])
  const [chapeta, setChapeta] = useState("")
  const [fecha, setFecha] = useState("")
  const [peso, setPeso] = useState("")
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
      setError("Debe seleccionar un animal valido.")
      setEnviando(false)
      return
    }

    const nuevoPesaje = {
      chapeta: chapetaNumero,
      fechaPesaje: fecha,
      peso: parseFloat(peso),
      responsable: responsable,
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

      alert("Pesaje registrado correctamente")
      router.push("/dashboard/weigth/table")

    } catch (error: any) {
      console.error("Error al registrar el pesaje:", error)
      setError(error.message || "No se pudo registrar el pesaje")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button 
          type="submit" 
          disabled={enviando || cargandoAnimales}
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {enviando ? "Registrando..." : "Registrar Pesaje"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Formulario de Pesaje</h1>
          <p className="text-green-100 mt-1">Ingresa la informacion del pesaje realizado</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Chapeta del Animal *</label>
            <select 
              required 
              value={chapeta} 
              onChange={(e) => setChapeta(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Pesaje *</label>
            <input 
              type="date" 
              required 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ganancia de Peso *</label>
            <div className="relative">
              <input 
                type="number" 
                step="0.1" 
                min="0" 
                required 
                value={peso} 
                onChange={(e) => setPeso(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Ej: 25.5"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                kg
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Responsable *</label>
            <input 
              type="text" 
              required 
              value={responsable} 
              onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Nombre del responsable"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreationWeight;