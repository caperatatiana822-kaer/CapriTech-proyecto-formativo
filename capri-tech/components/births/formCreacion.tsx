"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
      router.push("/dashboard/births/table")

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
    <div className="py-10 px-6 min-h-screen w-full m-0 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-[#e8e0d8]">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Formulario de creación de partos</h1>
          <p className="text-[#d7ccc8] mt-1">Ingresa la información del nuevo parto</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
            <p className="text-red-700 font-semibold">Error:</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {erroresDetallados.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mx-6 mt-4">
            <p className="text-yellow-700 font-semibold">Detalles del error:</p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-1">
              {erroresDetallados.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Chapeta *</label>
            <input 
              type="number" 
              value={chapeta} 
              onChange={(e) => setChapeta(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Nombre *</label>
            <input 
              type="text" 
              value={nombreAnimal} 
              onChange={(e) => setNombreAnimal(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Fecha de parto *</label>
            <input 
              type="date" 
              value={fechaNacimiento} 
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Raza *</label>
            <input 
              type="text" 
              value={raza} 
              onChange={(e) => setRaza(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Sexo *</label>
            <select 
              value={sexo} 
              onChange={(e) => setSexo(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Peso al Nacer (Kg) *</label>
            <input 
              type="number" 
              step="0.01"
              value={pesoNacer} 
              onChange={(e) => setPesoNacer(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Chapeta Madre *</label>
            <input 
              type="number" 
              value={fichaMadre} 
              onChange={(e) => setFichaMadre(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Chapeta Padre *</label>
            <input 
              type="number" 
              value={fichaPadre} 
              onChange={(e) => setFichaPadre(e.target.value)}
              required
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] transition bg-white"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={enviando}
              className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50 border border-[#8d6e63]"
            >
              {enviando ? "Registrando..." : "Registrar Parto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreacionNacimiento;