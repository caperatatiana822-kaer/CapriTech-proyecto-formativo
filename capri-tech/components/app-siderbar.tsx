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
    // Aquí después vamos a limpiar el token y redirigir al login.
    // Por ahora solo cerramos el diálogo.
    setLogoutDialogOpen(false)
  }
  return (
    <Sidebar className="bg-white shadow-lg">
      <SidebarHeader className="bg-green-50 p-1 border-b border-green-200">
        <h2 className="text-base font-bold text-green-900">
          Gestión de Caprinos
        </h2>
        <p className="text-xs text-green-600 mt-1">
          Panel de administración
        </p>
      </SidebarHeader>
      <SidebarContent className="bg-white px-2 py-3">
        <SidebarGroup>
          <SidebarMenu>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/livestock")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4" />
                      Inventario</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/livestock">Crear inventario</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/livestock/table">Listar inventarios</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/production")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Milk className="h-4 w-4" />
                      Produccion</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/production">Crear Produccion</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/production/table">Listar producciones</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/weigth")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      Pesaje</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/weigth">Crear pesaje</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/weigth/table">Listar pesajes</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/mounts")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Montas</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/mounts">Crear monta</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/mounts/table">Listar montas</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/births")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Baby className="h-4 w-4" />
                      Partos</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/births">Crear Parto</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/births/table">Listar Partos</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/feeding")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Wheat className="h-4 w-4" />
                      Alimentacion</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/feeding">Crear alimentacion</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/feeding/table">Listar alimentaciones</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/mortality")}>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Cross className="h-4 w-4" />
                      Mortalidad</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/mortality">Crear mortalidad</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/mortality/table">Listar mortalidades</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible defaultOpen={pathname.startsWith("/dashboard/vaccination") || pathname.startsWith("/dashboard/mastitis")}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Sanidad</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <Collapsible defaultOpen={pathname.startsWith("/dashboard/vaccination")}>
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger asChild>
                          <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                            <span className="flex items-center gap-2">
                              <Syringe className="h-4 w-4" />
                              Vacunación</span>
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                                <a href="/dashboard/vaccination">Crear vacunación</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
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
                          <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                            <span className="flex items-center gap-2">
                              <HeartPulse className="h-4 w-4" />
                              Mastitis</span>
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                                <a href="/dashboard/mastitis">Crear mastitis</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
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
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Famacha</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/famacha">Crear famacha</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
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
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Responsables</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/responsible">Crear responsables</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/responsible/table">Listar responsables</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible>
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <button className="font-semibold text-green-800 flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <UserCog className="h-4 w-4" />
                      Usuarios</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2" >
                      <a href="/dashboard/user">Crear Usuario</a>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="
              hover:text-green-700 rounded-lg trhover:bg-green-100 ansition-all duration-200 px-3 py-2">
                      <a href="/dashboard/user/table">Listar Usuarios</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-800 text-sm font-semibold text-white">
            {usuarioActual.inicial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-green-900">
              {usuarioActual.nombre}
            </p>
            <p className="truncate text-xs text-green-600">
              {usuarioActual.correo}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLogoutDialogOpen(true)}
            className="shrink-0 rounded-lg p-2 text-green-700 hover:bg-red-50 hover:text-red-600 transition-colors"
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
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
