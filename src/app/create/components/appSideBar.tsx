import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar";
  
export function AppSidebar() {
return (
    <Sidebar>
    <SidebarHeader />
    <SidebarContent className="bg-black border-r-white border-r-2">
        <SidebarGroup />
        <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
    </Sidebar>
)
};  