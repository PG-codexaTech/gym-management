import LayoutContent from "@/layout/LayoutContent";
import SidebarProvider from "@/provider/SidebarProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </>
  );
}
