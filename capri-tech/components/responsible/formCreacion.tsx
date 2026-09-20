"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function FormCreacionResponsibles() {
  const router = useRouter()

  const [nombre, setNombre] = useState("")
  const [tipoResponsable, setTipoResponsable] = useState("")
  const [documento, setDocumento] = useState("")
  const [actividad, setActividad] = useState("")
  const [frecuencia, setFrecuencia] = useState("")
  const [diaSemana, setDiaSemana] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)
    setError("")

    const nuevoResponsable = {
      nombre: nombre,
      tipoResponsable: tipoResponsable,
      documento: parseInt(documento),
      actividad: actividad,
      frecuencia: frecuencia,
      diaSemana: diaSemana,
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/responsible/responsible", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoResponsable),
      })

      const datos = await respuesta.json()
      console.log("Respuesta del backend:", datos)

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error al registrar el responsable"
        const erroresDetalle = datos.errors ? datos.errors.map((e: any) => e.mensaje).join(", ") : ""
        throw new Error(erroresDetalle || mensajeError)
      }

      alert("Responsable registrado correctamente")
      router.push("/dashboard/responsible/table")

    } catch (error: any) {
      console.error("Error al registrar el responsable:", error)
      setError(error.message || "No se pudo registrar el responsable")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Formulario de Responsables</h1>
          <p className="text-[#d7ccc8] mt-1">Ingresa la informacion del responsable</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Nombre *</label>
            <input 
              type="text" 
              required 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Tipo *</label>
            <select 
              required 
              value={tipoResponsable} 
              onChange={(e) => setTipoResponsable(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
            >
              <option value="">Selecciona un tipo</option>
              <option value="aprendiz">Aprendiz</option>
              <option value="sena_empresa">SENA Empresa</option>
              <option value="pasante">Pasante</option>
              <option value="gestor">Gestor</option>
              <option value="instructor">Instructor</option>
              <option value="veterinario">Veterinario</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Documento *</label>
            <input 
              type="number" 
              required 
              value={documento} 
              onChange={(e) => setDocumento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
              placeholder="Número de documento"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Actividad a Cargo *</label>
            <select 
              required 
              value={actividad} 
              onChange={(e) => setActividad(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
            >
              <option value="">Selecciona una actividad</option>
              <option value="ordeño">Ordeño</option>
              <option value="pesaje">Pesaje</option>
              <option value="montas">Montas</option>
              <option value="famacha">Prueba de famacha</option>
              <option value="mastitis">Prueba de mastitis</option>
              <option value="nacimientos">Nacimientos</option>
              <option value="alimentacion">Alimentacion</option>
              <option value="pastoreo">Pastoreo</option>
              <option value="vacunacion">Vacunacion</option>
              <option value="actividades_unidad">Actividades de la unidad</option>
              <option value="administracion">Administracion general</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Frecuencia *</label>
            <select 
              required 
              value={frecuencia} 
              onChange={(e) => setFrecuencia(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
            >
              <option value="">Selecciona una frecuencia</option>
              <option value="Diaria">Diaria</option>
              <option value="Semanal">Semanal</option>
              <option value="Quincenal">Quincenal</option>
              <option value="Mensual">Mensual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Dia de la Semana *</label>
            <select 
              required 
              value={diaSemana} 
              onChange={(e) => setDiaSemana(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
            >
              <option value="">Selecciona un dia</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miercoles">Miercoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sabado">Sabado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={enviando}
              className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Registrar Responsable"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreacionResponsibles;