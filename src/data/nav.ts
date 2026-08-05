import { site } from "./site";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const primaryNav: NavLink[] = [
  { label: "Program", href: "/program" },
  { label: "Konkurranser", href: "/konkurranser" },
  { label: "Info", href: "/info" },
  { label: "Støtte", href: "/stotte" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Shop", href: site.links.shop, external: true },
];

export const ticketCta: NavLink = {
  label: "Kjøp billett",
  href: site.links.buyTicket,
  external: true,
};

export const footerNavColumn: NavLink[] = [
  ticketCta,
  { label: "Konkurranser", href: "/konkurranser" },
  { label: "Info", href: "/info" },
  { label: "Støtte", href: "/stotte" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Shop", href: site.links.shop, external: true },
];
