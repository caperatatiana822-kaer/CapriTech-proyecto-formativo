"use client"
import { usePathname } from "next/navigation"
import { ChevronDown, PawPrint, Milk, Scale, Eye, Heart, Baby, Wheat, Cross, Stethoscope, Syringe, HeartPulse, Users, UserCog, Home } from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarGroup,
  SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuSub,
  SidebarMenuSubItem, SidebarMenuSubButton, SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
  collapsible="icon"
  className="border-r-0"
  style={{
    "--sidebar": "#F5EDE4",
    "--sidebar-foreground": "#3E2723",
    "--sidebar-accent": "#E8D9C5",
    "--sidebar-accent-foreground": "#3E2723",
    "--sidebar-border": "#E8D9C5"
  } as React.CSSProperties}
>

  <SidebarHeader className="p-4 border-b border-[#E8D9C5] group-data-[collapsible=icon]:hidden">
    <h2 className="text-base font-bold text-black tracking-tight text-center">Gestión de Caprinos</h2>
    <p className="text-xs text-black mt-1 text-center">Panel de administración</p>
  </SidebarHeader>

  <SidebarContent className="px-2 py-3 overflow-y-auto group-data-[collapsible=icon]:pt-20">

    <SidebarMenuItem className="mb-1">
      <SidebarMenuButton asChild tooltip="Inicio" className={pathname === "/dashboard" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
        <a href="/dashboard" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
          <Home className="h-4 w-4 !text-[#3E2723]" /> 
          <span className="group-data-[collapsible=icon]:hidden">Inicio</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>

    <SidebarGroup>
      <p className="text-[10px] font-bold text-[#844243] uppercase px-3 mb-2 group-data-[collapsible=icon]:hidden">
        General
      </p>
      <SidebarMenu>
        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Inventario" className={pathname === "/dashboard/livestock" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/livestock" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <PawPrint className="h-4 w-4 !text-[#3E2723]" />
              <span className="group-data-[collapsible=icon]:hidden">Caprinos</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>

    <SidebarGroup>
      <p className="text-[10px] font-bold text-[#844243] uppercase px-3 mb-2 mt-3 group-data-[collapsible=icon]:hidden">
        Producción
      </p>
      <SidebarMenu>
        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Produccion" className={pathname === "/dashboard/production" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/production" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <Milk className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Produccion</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Pesaje" className={pathname === "/dashboard/weigth" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/weigth" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <Scale className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Pesaje</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>

    <SidebarGroup>
      <p className="text-[10px] font-bold text-[#844243] uppercase px-3 mb-2 mt-3 group-data-[collapsible=icon]:hidden">
        Reproducción
      </p>
      <SidebarMenu>
        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Montas" className={pathname === "/dashboard/mounts" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/mounts" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <Heart className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Montas</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Partos" className={pathname === "/dashboard/births" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/births" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <Baby className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Partos</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>

    <SidebarGroup>
      <p className="text-[10px] font-bold text-[#844243] uppercase px-3 mb-2 mt-3 group-data-[collapsible=icon]:hidden">
        Salud
      </p>
      <SidebarMenu>
        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Alimentacion" className={pathname === "/dashboard/feeding" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/feeding" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <Wheat className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Alimentacion</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Mortalidad" className={pathname === "/dashboard/mortality" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/mortality" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <Cross className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Mortalidad</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <Collapsible defaultOpen={pathname === "/dashboard/vaccination" || pathname === "/dashboard/mastitis" || pathname === "/dashboard/famacha"}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Sanidad" className="font-semibold text-[#000000] flex items-center justify-between w-full rounded-lg px-3 py-2 hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0">
                <span className="flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
                  <Stethoscope className="h-4 w-4 !text-[#3E2723]" /> 
                  <span className="group-data-[collapsible=icon]:hidden">Sanidad</span>
                </span>
                <ChevronDown className="h-4 w-4 text-[#3E2723] group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={pathname === "/dashboard/vaccination" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                    <a href="/dashboard/vaccination" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
                      <Syringe className="h-4 w-4 !text-[#3E2723]" /> 
                      <span className="group-data-[collapsible=icon]:hidden">Vacunación</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={pathname === "/dashboard/mastitis" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                    <a href="/dashboard/mastitis" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
                      <HeartPulse className="h-4 w-4 !text-[#3E2723]" /> 
                      <span className="group-data-[collapsible=icon]:hidden">Mastitis</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className={pathname === "/dashboard/famacha" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                    <a href="/dashboard/famacha" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
                      <Eye className="h-4 w-4 !text-[#3E2723]" /> 
                      <span className="group-data-[collapsible=icon]:hidden">Famacha</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>

    <SidebarGroup>
      <p className="text-[10px] font-bold text-[#844243] uppercase px-3 mb-2 mt-3 group-data-[collapsible=icon]:hidden">
        Administración
      </p>
      <SidebarMenu>
        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Responsables" className={pathname === "/dashboard/responsible" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/responsible" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <Users className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Responsables</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="mb-1">
          <SidebarMenuButton asChild tooltip="Usuarios" className={pathname === "/dashboard/user" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723] group-data-[collapsible=icon]:!justify-center" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723] group-data-[collapsible=icon]:!justify-center"}>
            <a href="/dashboard/user" className="font-semibold flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
              <UserCog className="h-4 w-4 !text-[#3E2723]" /> 
              <span className="group-data-[collapsible=icon]:hidden">Usuarios</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>

    <div className="h-6"></div>

  </SidebarContent>

</Sidebar>
  )
};