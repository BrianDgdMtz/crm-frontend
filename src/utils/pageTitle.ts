export function resolvePageTitle(pathname: string): string {
  // Orden importa: primero paths más específicos
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/empresas/")) return "Empresa";
  if (pathname === "/empresas") return "Empresas";
  if (pathname.startsWith("/contactos/")) return "Contacto";
  if (pathname === "/contactos") return "Contactos";
  if (pathname.startsWith("/deals/")) return "Deal";
  if (pathname === "/deals") return "Deals";
  if (pathname.startsWith("/actividades/")) return "Actividad";
  if (pathname === "/actividades") return "Actividades";
  return "CRM";
}