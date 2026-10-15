"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import FormCreacionFeeding from "@/components/feeding/formCreacion"
import TablaFeeding from "@/components/feeding/tablaFeeding"

function FeedingPage() {
  const [busqueda, setBusqueda] = useState("")

  return (
    <div className="w-full h-full">
      <TablaFeeding 
        busqueda={busqueda} 
        headerExtra={
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
        
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3E2723]" />
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full border border-[#844243] rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#E8D9C5] text-sm"
              />
            </div>
            <FormCreacionFeeding />
          </div>
        }
      />
    </div>
  )
}

export default FeedingPage