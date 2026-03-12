import { AppSidebar } from "@/src/components/dashboard/app-sidebar"
import Header from "@/src/components/dashboard/header"
import { SidebarProvider } from "@/src/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full bg-slate-50">

        {/* Sidebar */}
        <AppSidebar />

        {/* Contenedor derecho */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Header */}
          <Header />

          {/* Main */}
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="max-w-screen-2xl mx-auto w-full px-6 py-4">
              {children}
            </div>
          </main>

        </div>
      </div>
    </SidebarProvider>
  )
}