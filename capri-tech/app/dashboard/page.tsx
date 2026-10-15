"use client"

import { useEffect, useState } from "react"
import {
  PawPrint,
  Baby,
  Heart,
  Skull,
  Stethoscope,
  Eye,
  Users,
  UserCog,
  Milk,
  Calendar,
  TrendingUp,
} from "lucide-react"

interface DashboardData {
  totalAnimales: number
  nacimientosMes: number
  montasMes: number
  muertesMes: number
  mastitisActivas: number
  famachaGraves: number
  totalUsuarios: number
  totalResponsables: number
  produccionMes: number
  proximosPartos: any[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalAnimales: 0,
    nacimientosMes: 0,
    montasMes: 0,
    muertesMes: 0,
    mastitisActivas: 0,
    famachaGraves: 0,
    totalUsuarios: 0,
    totalResponsables: 0,
    produccionMes: 0,
    proximosPartos: [],
  })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarTodo() {
      try {
        const hoy = new Date()
        const mesActual = hoy.getMonth()
        const añoActual = hoy.getFullYear()

        const esDeEsteMes = (fechaISO: string) => {
          if (!fechaISO) return false
          const f = new Date(fechaISO)
          return f.getMonth() === mesActual && f.getFullYear() === añoActual
        }

        const [
          resAnimales,
          resNacimientos,
          resMontas,
          resMuertes,
          resMastitis,
          resFamacha,
          resUsuarios,
          resResponsables,
          resProduccion,
        ] = await Promise.all([
          fetch("http://localhost:3001/api/livestock/livestockAll?limit=1000&offset=0").then(r => r.json()),
          fetch("http://localhost:3001/api/births/birthsAll?limit=1000&offset=0").then(r => r.json()),
          fetch("http://localhost:3001/api/mounts/mountsAll?limit=1000&offset=0").then(r => r.json()),
          fetch("http://localhost:3001/api/mortality/mortalityAll?limit=1000&offset=0").then(r => r.json()),
          fetch("http://localhost:3001/api/mastitis/mastitisAll?limit=1000&offset=0").then(r => r.json()),
          fetch("http://localhost:3001/api/famacha/famachaAll?limit=1000&offset=0").then(r => r.json()),
          fetch("http://localhost:3001/api/user").then(r => r.json()),
          fetch("http://localhost:3001/api/responsible/responsibleAll?limit=1000&offset=0").then(r => r.json()),
          fetch("http://localhost:3001/api/production/productionAll?limit=1000&offset=0").then(r => r.json()),
        ])

        const animales = resAnimales?.data?.data || resAnimales?.data || []
        const nacimientos = resNacimientos?.data?.data || resNacimientos?.data || []
        const montas = resMontas?.data?.data || resMontas?.data || []
        const muertes = resMuertes?.data?.data || resMuertes?.data || []
        const mastitis = resMastitis?.data?.data || resMastitis?.data || []
        const famacha = resFamacha?.data?.data || resFamacha?.data || []
        const usuarios = resUsuarios?.data?.data || resUsuarios?.data || []
        const responsables = resResponsables?.data?.data || resResponsables?.data || []
        const produccion = resProduccion?.data?.data || resProduccion?.data || []

        const totalAnimales = Array.isArray(animales) ? animales.length : 0

        const nacimientosMes = Array.isArray(nacimientos)
          ? nacimientos.filter((n: any) => esDeEsteMes(n.fechaNacimiento)).length
          : 0

        const montasMes = Array.isArray(montas)
          ? montas.filter((m: any) => esDeEsteMes(m.fechaMonta)).length
          : 0

        const muertesMes = Array.isArray(muertes)
          ? muertes.filter((m: any) => esDeEsteMes(m.fecha)).length
          : 0

        const mastitisActivas = Array.isArray(mastitis)
          ? mastitis.filter((m: any) => m.resultado === "Positivo").length
          : 0

        const famachaGraves = Array.isArray(famacha)
          ? famacha.filter((f: any) => f.resultado === "4" || f.resultado === "5").length
          : 0

        const totalUsuarios = Array.isArray(usuarios) ? usuarios.length : 0
        const totalResponsables = Array.isArray(responsables) ? responsables.length : 0

        const produccionMes = Array.isArray(produccion)
          ? produccion
              .filter((p: any) => p.productionType === "leche" && esDeEsteMes(p.fecha))
              .reduce((sum: number, p: any) => sum + (Number(p.cantidad) || 0), 0)
          : 0

        const proximosPartos = Array.isArray(montas)
          ? montas
              .filter((m: any) => m.posibleFechaParto && new Date(m.posibleFechaParto) >= new Date())
              .sort((a: any, b: any) => new Date(a.posibleFechaParto).getTime() - new Date(b.posibleFechaParto).getTime())
              .slice(0, 5)
          : []

        setData({
          totalAnimales,
          nacimientosMes,
          montasMes,
          muertesMes,
          mastitisActivas,
          famachaGraves,
          totalUsuarios,
          totalResponsables,
          produccionMes,
          proximosPartos,
        })
      } catch (error) {
        console.error("Error cargando dashboard:", error)
      } finally {
        setCargando(false)
      }
    }
    cargarTodo()
  }, [])

  const nombreUsuario = "Tatiana"

  const hoyFormateado = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formatearFecha = (fechaISO: string) => {
    if (!fechaISO) return "—"
    return new Date(fechaISO).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const colorParto = (fechaISO: string) => {
    const dias = Math.ceil((new Date(fechaISO).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    if (dias <= 15) return "bg-red-100 text-red-700"
    if (dias <= 30) return "bg-yellow-100 text-yellow-700"
    return "bg-green-100 text-green-700"
  }

  return (
    <div className="px-6 md:px-10 py-10 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
          Hola, {nombreUsuario} 👋
        </h1>
        <p className="text-gray-500 mt-2 text-base">
          Bienvenida al panel de administración de CapriTech. Hoy es {hoyFormateado}.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">
          Resumen general
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <TarjetaResumen
            icono={<PawPrint className="h-6 w-6 text-[#844243]" />}
            numero={data.totalAnimales}
            label="Animales registrados"
          />
          <TarjetaResumen
            icono={<Baby className="h-6 w-6 text-[#844243]" />}
            numero={data.nacimientosMes}
            label="Nacimientos este mes"
          />
          <TarjetaResumen
            icono={<Heart className="h-6 w-6 text-[#844243]" />}
            numero={data.montasMes}
            label="Montas este mes"
          />
          <TarjetaResumen
            icono={<Skull className="h-6 w-6 text-[#844243]" />}
            numero={data.muertesMes}
            label="Muertes este mes"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        <div>
          <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">
            🩺 Salud
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TarjetaResumen
              icono={<Stethoscope className="h-6 w-6 text-red-600" />}
              iconoBg="bg-red-50"
              numero={data.mastitisActivas}
              label="Mastitis positivas"
            />
            <TarjetaResumen
              icono={<Eye className="h-6 w-6 text-red-600" />}
              iconoBg="bg-red-50"
              numero={data.famachaGraves}
              label="Famacha graves"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">
            👥 Administración
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TarjetaResumen
              icono={<UserCog className="h-6 w-6 text-blue-600" />}
              iconoBg="bg-blue-50"
              numero={data.totalUsuarios}
              label="Usuarios registrados"
            />
            <TarjetaResumen
              icono={<Users className="h-6 w-6 text-blue-600" />}
              iconoBg="bg-blue-50"
              numero={data.totalResponsables}
              label="Responsables"
            />
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#844243]/10 flex items-center justify-center">
              <Milk className="h-6 w-6 text-[#844243]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-gray-900 text-lg">
                Producción de leche
              </h3>
              <p className="text-gray-500 text-xs">Total del mes actual</p>
            </div>
          </div>

          <div className="text-center py-6">
            <p className="text-5xl font-heading font-extrabold text-[#844243]">
              {data.produccionMes}
            </p>
            <p className="text-gray-500 text-sm mt-2">litros producidos este mes</p>
          </div>

          <div className="flex items-end justify-around h-20 gap-2 mt-4">
            {[40, 65, 50, 80, 70, 90, 60].map((altura, i) => (
              <div
                key={i}
                className="w-full bg-[#844243]/20 hover:bg-[#844243]/40 rounded-t-md transition"
                style={{ height: `${altura}%` }}
              ></div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            Últimos 7 registros de producción
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#844243]/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-[#844243]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-gray-900 text-lg">
                Próximos partos
              </h3>
              <p className="text-gray-500 text-xs">Montas con fecha estimada pendiente</p>
            </div>
          </div>

          {data.proximosPartos.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">No hay partos pendientes 🎉</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.proximosPartos.map((parto: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {parto.nombreHembra} — {parto.chapetaHembra}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Monta #{parto.numeroMonta}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorParto(parto.posibleFechaParto)}`}>
                    {formatearFecha(parto.posibleFechaParto)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {cargando && (
        <div className="max-w-7xl mx-auto mt-8 text-center">
          <p className="text-gray-400 text-sm">Cargando datos del sistema...</p>
        </div>
      )}

    </div>
  )
}

function TarjetaResumen({
  icono,
  numero,
  label,
  iconoBg = "bg-[#844243]/10",
}: {
  icono: React.ReactNode
  numero: number
  label: string
  iconoBg?: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100 p-6">
      <div className={`w-12 h-12 rounded-full ${iconoBg} flex items-center justify-center mb-4`}>
        {icono}
      </div>
      <p className="text-3xl font-heading font-extrabold text-gray-900">{numero}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  )
}