"use client"
import { usePathname } from "next/navigation"
import { ChevronDown, PawPrint, Milk, Scale, Eye, Heart, Baby, Wheat, Cross, Stethoscope, Syringe, HeartPulse, Users, UserCog, LogOut } from "lucide-react"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,

} from "@/components/ui/collapsible";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export function AppSidebar() {
  const pathname = usePathname()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const usuarioActual = {
    nombre: "Tatiana Capera",
    correo: "tatiana@capritech.com",
    inicial: "T",
  }
  function handleConfirmarCierreSesion() {
    setLogoutDialogOpen(false)
  }
  return (
    <Sidebar className="bg-[#f5efe6] shadow-lg">
      <SidebarHeader className="bg-[#ede4d4] p-4 border-b border-[#d7ccc8]">
        <h2 className="text-base font-bold text-[#4e342e]">
          Gestión de Caprinos
        </h2>
        <p className="text-xs text-[#6d4c41] mt-1">
          Panel de administración
        </p>
      </SidebarHeader>
      <SidebarContent className="bg-[#f5efe6] px-2 py-3">
        <SidebarGroup>
          <SidebarMenu>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/livestock")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-[#4e342e]" />
                      Inventario</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/livestock">Crear inventario</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/livestock/table">Listar inventarios</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/production")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Milk className="h-4 w-4 text-[#4e342e]" />
                      Produccion</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/production">Crear Produccion</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/production/table">Listar producciones</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/weigth")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-[#4e342e]" />
                      Pesaje</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/weigth">Crear pesaje</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/weigth/table">Listar pesajes</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/mounts")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-[#4e342e]" />
                      Montas</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/mounts">Crear monta</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/mounts/table">Listar montas</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/births")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Baby className="h-4 w-4 text-[#4e342e]" />
                      Partos</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/births">Crear Parto</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/births/table">Listar Partos</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/feeding")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Wheat className="h-4 w-4 text-[#4e342e]" />
                      Alimentacion</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/feeding">Crear alimentacion</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/feeding/table">Listar alimentaciones</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/mortality")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Cross className="h-4 w-4 text-[#4e342e]" />
                      Mortalidad</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/mortality">Crear mortalidad</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/mortality/table">Listar mortalidades</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/vaccination") || pathname.startsWith("/dashboard/mastitis")}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-[#4e342e]" />
                      Sanidad</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <Collapsible defaultOpen={pathname.startsWith("/dashboard/vaccination")}>
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger asChild>
                          <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                            <span className="flex items-center gap-2">
                              <Syringe className="h-4 w-4 text-[#4e342e]" />
                              Vacunación</span>
                            <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                                <a href="/dashboard/vaccination">Crear vacunación</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                                <a href="/dashboard/vaccination/table">Listar vacunaciones</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuSubItem>
                    </Collapsible>
                    <Collapsible defaultOpen={pathname.startsWith("/dashboard/mastitis")}>
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger asChild>
                          <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                            <span className="flex items-center gap-2">
                              <HeartPulse className="h-4 w-4 text-[#4e342e]" />
                              Mastitis</span>
                            <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                                <a href="/dashboard/mastitis">Crear mastitis</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                                <a href="/dashboard/mastitis/table">Listar mastitis</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuSubItem>
                    </Collapsible>
                    <Collapsible defaultOpen={pathname.startsWith("/dashboard/famacha")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-[#4e342e]" />
                      Famacha</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/famacha">Crear famacha</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/famacha/table">Listar famachas</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#4e342e]" />
                      Responsables</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/responsible">Crear responsables</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/responsible/table">Listar responsables</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-[#4e342e] flex items-center justify-between w-full hover:text-[#6d4c41] transition-colors">
                    <span className="flex items-center gap-2">
                      <UserCog className="h-4 w-4 text-[#4e342e]" />
                      Usuarios</span>
                    <ChevronDown className="h-4 w-4 text-[#6d4c41]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    
                    <SidebarMenuSubButton asChild className="
              hover:text-[#4e342e] rounded-lg hover:bg-[#ede4d4] transition-all duration-200 px-3 py-2 text-[#6d4c41]">
                      <a href="/dashboard/user/table">Listar Usuarios</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#d7ccc8] px-3 py-3 bg-[#ede4d4]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4e342e] text-sm font-semibold text-[#f5efe6]">
            {usuarioActual.inicial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#4e342e]">
              {usuarioActual.nombre}
            </p>
            <p className="truncate text-xs text-[#6d4c41]">
              {usuarioActual.correo}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLogoutDialogOpen(true)}
            className="shrink-0 rounded-lg p-2 text-[#6d4c41] hover:bg-[#d7ccc8] hover:text-[#4e342e] transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>

      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Cerrar sesión?</DialogTitle>
            <DialogDescription>
              Vas a salir de tu cuenta. ¿Estás seguro de que quieres cerrar sesión?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setLogoutDialogOpen(false)}
              className="rounded-lg border border-[#d7ccc8] px-4 py-2 text-sm font-medium text-[#6d4c41] hover:bg-[#f5efe6]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmarCierreSesion}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sí, cerrar sesión
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  )
};