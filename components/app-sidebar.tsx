"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconHome,
  IconUsersGroup,
  IconCalendarClock,
  IconHeartbeat,
  IconFileInvoice,
  IconCash,
  IconReport,
  IconSettings,
  IconTool,
  IconUserShield,
  IconFolder,
  IconHelp,
  IconSearch,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Dr. Koffi",
    email: "medecin@novus.ci",
    avatar: "/avatars/medecin.png",
  },
  navMain: [
    {
      title: "Accueil",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Enrôlement",
      url: "/patients/enrolement",
      icon: IconUsersGroup,
    },
    {
      title: "Prise de RDV",
      url: "/rendez-vous",
      icon: IconCalendarClock,
    },
    {
      title: "Actes médicaux",
      url: "/actes-medicaux",
      icon: IconHeartbeat,
    },
    {
      title: "Facturation",
      url: "/facturation",
      icon: IconFileInvoice,
    },
    {
      title: "Caisse",
      url: "/caisse",
      icon: IconCash,
    },
    {
      title: "Rapports",
      url: "/rapports",
      icon: IconReport,
    },
    {
      title: "Configuration",
      url: "/config",
      icon: IconTool,
    },
    {
      title: "Admin",
      url: "/admin",
      icon: IconUserShield,
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Aide",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Recherche",
      url: "/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Dossiers Patients",
      url: "/patients",
      icon: IconFolder,
    },
    {
      name: "Rapports",
      url: "/rapports",
      icon: IconReport,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="flex items-center gap-2">
                <Image
                  src="/medic.png"
                  alt="Novus Medic"
                  width={120}
                  height={120}
                  className="object-contain"
                  onError={() => {
                    console.log("Sidebar logo failed to load: /medic.png")
                  }}
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}