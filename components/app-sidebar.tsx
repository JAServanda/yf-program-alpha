"use client"

import { ArrowLeftRight, Home, Users } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Sample navigation links
const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Debtors", url: "/dashboard/debtors", icon: Users },
  { title: "Transactions", url: "/dashboard/transactions/history", icon: ArrowLeftRight },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" >
      <SidebarContent>
        <SidebarGroup >
          
          <SidebarGroupContent className="p-2 gap-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon className="w-8 h-8" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
