"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function FormCreacionProduction() {
  const router = useRouter()

  const [productionType, setProductionType] = useState("carne")
  const [fecha, setFecha] = useState("")
  const [descripcionElemento, setDescripcionElemento] = useState("")
  const [unidadMedida, setUnidadMedida] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [valorUnitario, setValorUnitario] = useState("")
  const [valorTotal, setValorTotal] = useState("")
  const [fechaVencimiento, setFechaVencimiento] = useState("")
  const [centroCosto, setCentroCosto] = useState("")
  const [nombreTraslada, setNombreTraslada] = useState("")
  const [nombreRecibe, setNombreRecibe] = useState("")
  const [instructorTecnico, setInstructorTecnico] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)

    const nuevaProduccion = {
      productionType: productionType,
      fecha: fecha,
      descripcionElemento: descripcionElemento,
      unidadMedida: unidadMedida,
      cantidad: cantidad,
      valorUnitario: valorUnitario,
      valorTotal: valorTotal,
      fechaVencimiento: fechaVencimiento,
      centroCosto: centroCosto,
      nombreTraslada: nombreTraslada,
      nombreRecibe: nombreRecibe,
      instructorTecnico: instructorTecnico,
      observaciones: observaciones,
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/production/production", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaProduccion),
      })

      if (!respuesta.ok) {
        throw new Error("El servidor respondió con un error")
      }

      router.push("/dashboard/production/table")
    } catch (error) {
      console.error("Error al registrar la producción:", error)
      alert("No se pudo registrar la producción. Intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#6d4c41] text-[#f5efe6] p-6">
          <h1 className="text-2xl font-bold">Formulario de Producción</h1>
          <p className="text-[#d7ccc8] mt-1">Ingresa la información de la producción registrada</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Tipo de Producción</label>
            <select required value={productionType} onChange={(e) => setProductionType(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]">
              <option value="carne">Carne</option>
              <option value="leche">Leche</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Fecha</label>
            <input type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Descripción</label>
            <input type="text" required value={descripcionElemento} onChange={(e) => setDescripcionElemento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Unidad de Medida</label>
            <input type="text" required value={unidadMedida} onChange={(e) => setUnidadMedida(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Cantidad</label>
            <input type="number" required value={cantidad} onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Valor Unitario</label>
            <input type="number" required value={valorUnitario} onChange={(e) => setValorUnitario(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Valor Total</label>
            <input type="number" required value={valorTotal} onChange={(e) => setValorTotal(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Fecha de Vencimiento</label>
            <input type="date" required value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Centro de Costo</label>
            <input type="text" required value={centroCosto} onChange={(e) => setCentroCosto(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Nombre de quien Traslada</label>
            <input type="text" required value={nombreTraslada} onChange={(e) => setNombreTraslada(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Nombre de quien Recibe</label>
            <input type="text" required value={nombreRecibe} onChange={(e) => setNombreRecibe(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Instructor Técnico</label>
            <input type="text" required value={instructorTecnico} onChange={(e) => setInstructorTecnico(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#4e342e] mb-2">Observaciones</label>
            <input type="text" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"/>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={enviando}
              className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-semibold px-8 py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Registrar Producción"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreacionProduction;