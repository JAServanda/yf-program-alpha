import { AppSidebar } from "@/components/app-sidebar";
import { requireSession } from "@/lib/auth-helpers";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="glass-panel">
        {/* <header className="glass-header sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 px-3 sm:px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <span className="truncate text-xs text-muted-foreground sm:text-sm">
              {session.user?.email}
            </span>
            <span className="glass-subtle shrink-0 px-2.5 py-1 text-xs font-medium capitalize">
              {session.user?.role}
            </span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-5 p-4 sm:gap-6 sm:p-6">
          {children}
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
