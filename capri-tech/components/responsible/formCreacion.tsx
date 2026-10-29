"use client"

import { useState } from "react"
import { CirclePlus } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Toaster, toast } from "@/components/ui/toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

function FormCreacionResponsibles() {
  const [nombre, setNombre] = useState("")
  const [tipoResponsable, setTipoResponsable] = useState("")
  const [documento, setDocumento] = useState("")
  const [frecuencia, setFrecuencia] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")

  const [open, setOpen] = useState(false)
  const actividades = [
    { value: "ordeño", label: "Ordeño" },
    { value: "pesaje", label: "Pesaje" },
    { value: "montas", label: "Montas" },
    { value: "famacha", label: "Prueba de famacha" },
    { value: "mastitis", label: "Prueba de mastitis" },
    { value: "nacimientos", label: "Nacimientos" },
    { value: "alimentacion", label: "Alimentacion" },
    { value: "pastoreo", label: "Pastoreo" },
    { value: "vacunacion", label: "Vacunacion" },
    { value: "actividades_unidad", label: "Actividades de la unidad" },
    { value: "administracion", label: "Administracion general" },
  ]
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<string[]>([])
  const diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([])

  function limpiarFormulario() {
    setNombre("")
    setTipoResponsable("")
    setDocumento("")
    setFrecuencia("")
    setActividadesSeleccionadas([])
    setDiasSeleccionados([])
    setError("")
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault()
    
    // Validación manual por si acaso, ya que quitamos los textos visuales
    if (actividadesSeleccionadas.length === 0) {
      setError("Por favor, selecciona al menos una actividad.")
      return
    }
    if (diasSeleccionados.length === 0) {
      setError("Por favor, selecciona al menos un día.")
      return
    }

    setEnviando(true)
    setError("")

    const nuevoResponsable = {
      nombre: nombre,
      tipoResponsable: tipoResponsable,
      documento: parseInt(documento),
      actividad: actividadesSeleccionadas,
      frecuencia: frecuencia,
      diaSemana: diasSeleccionados,
      active: true // 👈 FORZAMOS EL ESTADO ACTIVO
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/responsible/responsible", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoResponsable)
      })

      const datos = await respuesta.json()
      console.log("Respuesta del backend:", datos)

      if (!respuesta.ok) {
        const mensajeError = datos.message || "Error al registrar el responsable"
        const erroresDetalle = datos.error
          ? datos.error.map((e: any) => typeof e === "string" ? e : e.mensaje).join(", ")
          : ""
        throw new Error(erroresDetalle || mensajeError)
      }

      limpiarFormulario()
      setOpen(false)
      window.dispatchEvent(new Event("responsible:created"))
      toast.add({
        title: "Éxito",
        description: "El responsable se registró correctamente",
        type: "success",
      });
      return;
    } catch (error: any) {
      console.error("Error al registrar el responsable:", error)
      setError(error.message || "No se pudo registrar el responsable")
      toast.add({
        title: "Corregir",
        description: "No se pudo registrar el responsable. Intenta de nuevo.",
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
        <button className="bg-[#aff5af] text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          Agregar responsable
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-2xl font-bold text-[#000000]">
          Crear Responsable
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          {/* Fila 1: Nombre y Tipo */}
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Nombre *</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Tipo *</label>
            <select
              required
              value={tipoResponsable}
              onChange={(e) => setTipoResponsable(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

          {/* Fila 2: Documento y Frecuencia (Los juntamos para que no queden descolgados) */}
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Documento *</label>
            <input
              type="number"
              required
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Número de documento"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">Frecuencia *</label>
            <select
              required
              value={frecuencia}
              onChange={(e) => setFrecuencia(e.target.value)}
              className="w-full border border-[#d7ccc8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Selecciona una frecuencia</option>
              <option value="Diaria">Diaria</option>
              <option value="Semanal">Semanal</option>
              <option value="Quincenal">Quincenal</option>
              <option value="Mensual">Mensual</option>
            </select>
          </div>

          {/* Fila 3: Actividades (Ocupa todo el ancho) */}
          <div className="md:col-span-2 space-y-3 mt-2">
            <label className="block text-sm font-semibold text-[#000000] mb-1">Actividades a Cargo *</label>
            <ToggleGroup
              type="multiple"
              value={actividadesSeleccionadas}
              onValueChange={setActividadesSeleccionadas}
              className="flex flex-wrap gap-2"
            >
              {actividades.map((actividad) => (
                <ToggleGroupItem
                  key={actividad.value}
                  value={actividad.value}
                  aria-label={actividad.label}
                  className="rounded-lg border border-[#d7ccc8] px-4 py-2 text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {actividad.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Fila 4: Días (Ocupa todo el ancho) */}
          <div className="md:col-span-2 space-y-3 mt-2">
            <label className="block text-sm font-semibold text-[#000000] mb-1">Selecciona los días *</label>
            <ToggleGroup  
              type="multiple"
              value={diasSeleccionados}
              onValueChange={setDiasSeleccionados}
              className="flex flex-wrap gap-2"
            >
              {diasSemana.map((dia) => (
                <ToggleGroupItem
                  key={dia}
                  value={dia}
                  aria-label={dia}
                  className="rounded-lg border border-[#d7ccc8] px-4 py-2 text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {dia}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          <DialogDescription className="text-gray-500 md:col-span-2 mt-2">
            Ingresa la informacion del responsable.
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
              className="bg-[#aff5af] text-black font-semibold px-8 py-3 rounded-lg shadow-sm hover:bg-[#ccf0bc] hover:border-[#E2EFE2] transition disabled:opacity-50"
            >
              {enviando ? "Registrando..." : "Guardar"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormCreacionResponsibles