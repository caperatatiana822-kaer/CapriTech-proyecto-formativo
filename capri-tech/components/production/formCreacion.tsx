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

  const [open, setOpen] = useState(false)

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

      setOpen(false)
      router.push("/dashboard/production")
    } catch (error) {
      console.error("Error al registrar la producción:", error)
      alert("No se pudo registrar la producción. Intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#aff5af] border border-[#90a78f] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[bg-[#E2EFE2]] transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Produccion
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Formulario de Producción
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Tipo de Producción</label>
            <select required value={productionType} onChange={(e) => setProductionType(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option value="carne">Carne</option>
              <option value="leche">Leche</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Fecha</label>
            <input type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Descripción</label>
            <input type="text" required value={descripcionElemento} onChange={(e) => setDescripcionElemento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Unidad de Medida</label>
            <input type="text" required value={unidadMedida} onChange={(e) => setUnidadMedida(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Cantidad</label>
            <input type="number" required value={cantidad} onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Valor Unitario</label>
            <input type="number" required value={valorUnitario} onChange={(e) => setValorUnitario(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Valor Total</label>
            <input type="number" required value={valorTotal} onChange={(e) => setValorTotal(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Fecha de Vencimiento</label>
            <input type="date" required value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Centro de Costo</label>
            <input type="text" required value={centroCosto} onChange={(e) => setCentroCosto(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nombre de quien Traslada</label>
            <input type="text" required value={nombreTraslada} onChange={(e) => setNombreTraslada(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nombre de quien Recibe</label>
            <input type="text" required value={nombreRecibe} onChange={(e) => setNombreRecibe(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Instructor Técnico</label>
            <input type="text" required value={instructorTecnico} onChange={(e) => setInstructorTecnico(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#000000] mb-2">Observaciones</label>
            <input type="text" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"/>
          </div>
          <DialogDescription className="text-gray-500">
          Ingresa la información de la producción.
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

export default FormCreacionProduction