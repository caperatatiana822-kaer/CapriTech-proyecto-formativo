"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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
      router.push("/dashboard/feeding/table")

    } catch (error: any) {
      console.error("Error al registrar la alimentacion:", error)
      setError(error.message || "No se pudo registrar la alimentacion")
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
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {enviando ? "Registrando..." : "Registrar Alimentacion"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">Formulario de Alimentacion</h1>
          <p className="text-green-100 mt-1">
            Ingresa la informacion de la alimentacion suministrada
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha *</label>
            <input 
              type="date" 
              required 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hora *</label>
            <input 
              type="time" 
              required 
              value={hora} 
              onChange={(e) => setHora(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Alimento *</label>
            <input 
              type="text" 
              required 
              value={alimento} 
              onChange={(e) => setAlimento(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Tipo de alimento"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cantidad (Kg) *</label>
            <input 
              type="number" 
              step="0.01"
              required 
              value={cantidad} 
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ej: 5.5"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreacionFeeding;