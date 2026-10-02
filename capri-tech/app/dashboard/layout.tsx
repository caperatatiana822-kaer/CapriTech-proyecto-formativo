import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar"
import { TooltipProvider } from "@/components/ui/tooltip"  
import Image from "next/image"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>        
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <header className="h-21 bg-white border-b flex items-center px-6 shadow-sm">
            <SidebarTrigger />
            <Image
              src="/logo.jpg.png"
              alt="Logo CapriTech"
              width={32}
              height={32}
              className="ml-4"
            />
            <h1 className="ml-4 text-xl font-bold text-[#000000]">CapriTech</h1>
          </header>
        
          <div className="p-0 bg-[#faf8f5] min-h-screen">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}