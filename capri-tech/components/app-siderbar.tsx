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
          <SidebarMenuButton asChild tooltip="Inicio" className={pathname === "/dashboard" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
            <a href="/dashboard" className="font-semibold flex items-center gap-2">
              <Home className="h-4 w-4 !text-[#3E2723]" /> Inicio
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarGroup>
          <p className="text-[10px] font-bold text-[#844243] uppercase px-3 mb-2 group-data-[collapsible=icon]:hidden">
            General
          </p>
          <SidebarMenu>
            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton asChild tooltip="Inventario" className={pathname === "/dashboard/livestock" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/livestock" className="font-semibold flex items-center gap-2">
                  <PawPrint className="h-4 w-4 !text-[#3E2723]" /> Caprinos
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
              <SidebarMenuButton asChild tooltip="Produccion" className={pathname === "/dashboard/production" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/production" className="font-semibold flex items-center gap-2">
                  <Milk className="h-4 w-4 !text-[#3E2723]" /> Produccion
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton asChild tooltip="Pesaje" className={pathname === "/dashboard/weigth" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/weigth" className="font-semibold flex items-center gap-2">
                  <Scale className="h-4 w-4 !text-[#3E2723]" /> Pesaje
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
              <SidebarMenuButton asChild tooltip="Montas" className={pathname === "/dashboard/mounts" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/mounts" className="font-semibold flex items-center gap-2">
                  <Heart className="h-4 w-4 !text-[#3E2723]" /> Montas
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton asChild tooltip="Partos" className={pathname === "/dashboard/births" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/births" className="font-semibold flex items-center gap-2">
                  <Baby className="h-4 w-4 !text-[#3E2723]" /> Partos
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
              <SidebarMenuButton asChild tooltip="Alimentacion" className={pathname === "/dashboard/feeding" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/feeding" className="font-semibold flex items-center gap-2">
                  <Wheat className="h-4 w-4 !text-[#3E2723]" /> Alimentacion
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton asChild tooltip="Mortalidad" className={pathname === "/dashboard/mortality" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/mortality" className="font-semibold flex items-center gap-2">
                  <Cross className="h-4 w-4 !text-[#3E2723]" /> Mortalidad
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Collapsible defaultOpen={pathname === "/dashboard/vaccination" || pathname === "/dashboard/mastitis" || pathname === "/dashboard/famacha"}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Sanidad" className="font-semibold text-[#000000] flex items-center justify-between w-full rounded-lg px-3 py-2 hover:bg-[#E8D9C5] hover:text-[#3E2723]">
                    <span className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 !text-[#3E2723]" /> Sanidad
                    </span>
                    <ChevronDown className="h-4 w-4 text-[#3E2723]" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className={pathname === "/dashboard/vaccination" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                        <a href="/dashboard/vaccination" className="font-semibold flex items-center gap-2">
                          <Syringe className="h-4 w-4 !text-[#3E2723]" /> Vacunación
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className={pathname === "/dashboard/mastitis" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                        <a href="/dashboard/mastitis" className="font-semibold flex items-center gap-2">
                          <HeartPulse className="h-4 w-4 !text-[#3E2723]" /> Mastitis
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className={pathname === "/dashboard/famacha" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                        <a href="/dashboard/famacha" className="font-semibold flex items-center gap-2">
                          <Eye className="h-4 w-4 !text-[#3E2723]" /> Famacha
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
              <SidebarMenuButton asChild tooltip="Responsables" className={pathname === "/dashboard/responsible" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/responsible" className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 !text-[#3E2723]" /> Responsables
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton asChild tooltip="Usuarios" className={pathname === "/dashboard/user" ? "rounded-lg px-3 py-2 font-bold !bg-[#E8D9C5] !text-[#3E2723]" : "rounded-lg px-3 py-2 text-[#000000] hover:bg-[#E8D9C5] hover:text-[#3E2723]"}>
                <a href="/dashboard/user" className="font-semibold flex items-center gap-2">
                  <UserCog className="h-4 w-4 !text-[#3E2723]" /> Usuarios
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