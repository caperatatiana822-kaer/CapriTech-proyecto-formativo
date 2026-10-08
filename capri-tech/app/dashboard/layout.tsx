"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Settings, LogOut, User, Key } from "lucide-react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/");
    }
  }, [router]);

  const handleConfirmarCierreSesion = () => {
    localStorage.removeItem("token");
    setLogoutDialogOpen(false);
    router.push("/");
  };

  const usuario = {
    nombre: "Tatiana Capera",
    correo: "tatiana@capritech.com"
  };

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <header className="h-21 bg-white border-b flex items-center justify-between px-6 shadow-sm">

            <div className="flex items-center">
              <SidebarTrigger />
              <Image
                src="/logo.jpg.png"
                alt="Logo CapriTech"
                width={32}
                height={32}
                className="ml-4"
              />
              <h1 className="ml-4 text-xl font-bold text-[#000000]">CapriTech</h1>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-gray-800">{usuario.nombre}</p>
                    <p className="text-xs text-gray-500">{usuario.correo}</p>
                  </div>
                  <div className="bg-[#844243] p-2 rounded-full text-white">
                    <Settings size={20} />
                  </div>
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-lg rounded-xl">
                <DropdownMenuLabel className="text-gray-800 font-semibold">Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer text-gray-700 hover:bg-gray-100">
                  <User className="mr-2 h-4 w-4" />
                  <span>Actualizar perfil</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer text-gray-700 hover:bg-gray-100">
                  <Key className="mr-2 h-4 w-4" />
                  <span>Actualizar contraseña</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => setLogoutDialogOpen(true)}
                  className="cursor-pointer text-[#844243] hover:bg-red-50 hover:text-red-700 font-medium"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>¿Cerrar sesión?</DialogTitle>
                  <DialogDescription>
                    Vas a salir de tu cuenta. ¿Estás seguro de que quieres cerrar sesión?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 flex gap-2 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setLogoutDialogOpen(false)} 
                    className="rounded-lg border border-[#d7ccc8] px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    onClick={handleConfirmarCierreSesion} 
                    className="rounded-lg bg-[#844243] px-4 py-2 text-sm font-medium text-white hover:bg-[#6E3536] transition-colors"
                  >
                    Sí, cerrar sesión
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </header>

          <div className="p-0 bg-[#faf8f5] min-h-screen">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}