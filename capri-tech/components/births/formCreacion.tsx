"use client"
import { useState, useEffect } from "react"
import { CirclePlus } from "lucide-react"
import { Toaster, toast } from "@/components/ui/toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

function FormCreacionNacimiento() {
  const [montas, setMontas] = useState<any[]>([])
  const [responsables, setResponsables] = useState<any[]>([])
  
  const [idMonta, setIdMonta] = useState("")
  const [fechaParto, setFechaParto] = useState("")
  const [razas, setRazas] = useState("")
  const [nacidosVivos, setNacidosVivos] = useState("")
  const [nacidosMuertos, setNacidosMuertos] = useState("")
  const [machos, setMachos] = useState("")
  const [hembras, setHembras] = useState("")
  const [responsable, setResponsable] = useState("")
  
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")
  const [erroresDetallados, setErroresDetallados] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const resMontas = await fetch("http://localhost:3001/api/mounts/mountsAll?limit=100")
        const jsonMontas = await resMontas.json()
        const listaMontas = jsonMontas?.data?.data || jsonMontas?.data || []
        setMontas(listaMontas)

        const resResp = await fetch("http://localhost:3001/api/responsible/responsibleAll")
        const jsonResp = await resResp.json()
        const listaResp = jsonResp?.data?.data || jsonResp?.data || []
        setResponsables(listaResp)
      } catch (e) {
        console.error("Error cargando datos:", e)
      }
    }
    if (open) cargarDatos()
  }, [open])

  function limpiarFormulario() {
    setIdMonta("")
    setFechaParto("")
    setRazas("")
    setNacidosVivos("")
    setNacidosMuertos("")
    setMachos("")
    setHembras("")
    setResponsable("")
    setError("")
    setErroresDetallados([])
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    setEnviando(true)
    setError("")
    setErroresDetallados([])

    const nuevoParto = {
      idMonta: parseInt(idMonta),
      fechaParto,
      razas,
      nacidosVivos: parseInt(nacidosVivos),
      nacidosMuertos: parseInt(nacidosMuertos),
      machos: parseInt(machos),
      hembras: parseInt(hembras),
      responsable,
      active: true 
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/births/births", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoParto),
      })

      const datos = await respuesta.json().catch(() => ({}))

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error en la creación del parto"
        if (datos.errors && Array.isArray(datos.errors)) {
          setErroresDetallados(datos.errors.map((e: any) => e.mensaje || e.message))
        } else {
          setErroresDetallados([mensajeError])
        }
        throw new Error(mensajeError)
      }

      limpiarFormulario()
      setOpen(false)
      window.dispatchEvent(new Event("Births:created"))
      toast.add({
              title: "Éxito",
              description: "El parto se registró correctamente",
              type: "success",
            });
    } catch (error: any) {
      setError(error.message || "No se pudo registrar el parto")
      setErroresDetallados((prev) => prev.length > 0 ? prev : [error.message])
      toast.add({
        title: "Corregir",
        description: "No se pudo registrar el parto. Intenta de nuevo.",
        type: "error",
      });
       return;
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#aff5af] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar Parto
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Crear Parto
        </DialogHeader>
      
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2">
            <p className="text-red-700 font-semibold">Error:</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {erroresDetallados.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-2">
            <p className="text-yellow-700 font-semibold">Detalles:</p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-1">
              {erroresDetallados.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Monta (Número) *</label>
            <select required value={idMonta} onChange={e => setIdMonta(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3">
              <option value="">Selecciona una monta</option>
              {montas.map(m => (
                <option key={m.id} value={m.id}>Monta #{m.numeroMonta} - {m.fechaMonta.split('T')[0]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Fecha de Parto *</label>
            <input type="date" required value={fechaParto} onChange={e => setFechaParto(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Raza *</label>
            <input type="text" required value={razas} onChange={e => setRazas(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Responsable *</label>
            <select required value={responsable} onChange={e => setResponsable(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3">
              <option value="">Selecciona un responsable</option>
              {responsables.map(r => (
                <option key={r.id} value={r.nombre}>{r.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nacidos Vivos *</label>
            <input type="number" min="0" required value={nacidosVivos} onChange={e => setNacidosVivos(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nacidos Muertos *</label>
            <input type="number" min="0" required value={nacidosMuertos} onChange={e => setNacidosMuertos(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Cantidad Machos *</label>
            <input type="number" min="0" required value={machos} onChange={e => setMachos(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Cantidad Hembras *</label>
            <input type="number" min="0" required value={hembras} onChange={e => setHembras(e.target.value)} className="w-full border border-[#d7ccc8] rounded-lg p-3" />
          </div>
          
          <DialogDescription className="text-gray-500">
            Ingresa los resultados del parto.
          </DialogDescription>

          <DialogFooter className="md:col-span-2 flex justify-end mt-2 !border-t-0 !bg-transparent">
            <button type="button" onClick={() => setOpen(false)} className="bg-gray-100 border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200">Cancelar</button>
            <button type="submit" disabled={enviando} className="bg-[#aff5af] text-black font-semibold px-8 py-3 rounded-lg hover:bg-[#ccf0bc] disabled:opacity-50">
              {enviando ? "Registrando..." : "Guardar"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormCreacionNacimiento