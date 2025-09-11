import PrivateRouteProvider from "@/providers/PrivateRouteProvider";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRouteProvider>
      {/* Здесь можно добавить общий приватный layout (header, sidebar и т.п.) */}
      {children}
    </PrivateRouteProvider>
  );
}