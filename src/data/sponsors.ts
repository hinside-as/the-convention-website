import type { ImageMetadata } from "astro";

import blakladerDark from "../assets/sponsors/dark/sponsor-blaklader.svg";
import crewTaxiDark from "../assets/sponsors/dark/sponsor-crew-taxi.svg";
import elkjopDark from "../assets/sponsors/dark/sponsor-elkjop.svg";
import flematecDark from "../assets/sponsors/dark/sponsor-flematec.svg";
import hinsideDark from "../assets/sponsors/dark/sponsor-hinside.svg";
import hthDark from "../assets/sponsors/dark/sponsor-hth.svg";
import jacobsenDark from "../assets/sponsors/dark/sponsor-jacobsen-reklameagentur.svg";
import spillklubbDark from "../assets/sponsors/dark/sponsor-kristiansund-spillklubb.svg";
import multicomDark from "../assets/sponsors/dark/sponsor-multicom.svg";
import neasDark from "../assets/sponsors/dark/sponsor-neas.svg";
import omega365Dark from "../assets/sponsors/dark/sponsor-omega-365.svg";
import sameyDark from "../assets/sponsors/dark/sponsor-samey-robotics.svg";
import soudalDark from "../assets/sponsors/dark/sponsor-soudal.svg";
import sparebankenDark from "../assets/sponsors/dark/sponsor-sparebanken-more.svg";
import srGroupDark from "../assets/sponsors/dark/sponsor-sr-group.svg";
import vardeDark from "../assets/sponsors/dark/sponsor-varde-catering.svg";

import blakladerLight from "../assets/sponsors/light/sponsor-blaklader.svg";
import crewTaxiLight from "../assets/sponsors/light/sponsor-crew-taxi.svg";
import elkjopLight from "../assets/sponsors/light/sponsor-elkjop.svg";
import flematecLight from "../assets/sponsors/light/sponsor-flematec.svg";
import hinsideLight from "../assets/sponsors/light/sponsor-hinside.svg";
import hthLight from "../assets/sponsors/light/sponsor-hth.svg";
import jacobsenLight from "../assets/sponsors/light/sponsor-jacobsen-reklameagentur.svg";
import spillklubbLight from "../assets/sponsors/light/sponsor-kristiansund-spillklubb.svg";
import multicomLight from "../assets/sponsors/light/sponsor-multicom.svg";
import neasLight from "../assets/sponsors/light/sponsor-neas.svg";
import omega365Light from "../assets/sponsors/light/sponsor-omega-365.svg";
import sameyLight from "../assets/sponsors/light/sponsor-samey-robotics.svg";
import soudalLight from "../assets/sponsors/light/sponsor-soudal.svg";
import sparebankenLight from "../assets/sponsors/light/sponsor-sparebanken-more.svg";
import srGroupLight from "../assets/sponsors/light/sponsor-sr-group.svg";
import vardeLight from "../assets/sponsors/light/sponsor-varde-catering.svg";

export interface Sponsor {
  name: string;
  url: string;
  logoDark: ImageMetadata;
  logoLight: ImageMetadata;
}

/**
 * 16 confirmed sponsors. Tess was removed 2026-08-04 at the client's
 * request. `sponsor-nettstudio.svg` exists in the asset folders but is
 * intentionally excluded — not a current sponsor (see STYLE.md).
 */
export const sponsors: Sponsor[] = [
  { name: "Hinside", url: "https://www.hinside.as/", logoDark: hinsideDark, logoLight: hinsideLight },
  { name: "Sparebanken Møre", url: "https://www.sbm.no/", logoDark: sparebankenDark, logoLight: sparebankenLight },
  { name: "Blåkläder", url: "https://www.blaklader.no/", logoDark: blakladerDark, logoLight: blakladerLight },
  { name: "Multicom", url: "http://www.multicom.no/", logoDark: multicomDark, logoLight: multicomLight },
  { name: "Neas", url: "https://www.neas.no/", logoDark: neasDark, logoLight: neasLight },
  { name: "Flematec", url: "https://www.flematec.no/", logoDark: flematecDark, logoLight: flematecLight },
  { name: "Samey Robotics", url: "https://www.samey.is/no/", logoDark: sameyDark, logoLight: sameyLight },
  { name: "Soudal", url: "https://www.soudal.no/", logoDark: soudalDark, logoLight: soudalLight },
  { name: "Omega 365", url: "https://omega365.com/", logoDark: omega365Dark, logoLight: omega365Light },
  { name: "Varde Catering", url: "https://www.vardecatering.no/", logoDark: vardeDark, logoLight: vardeLight },
  { name: "Kristiansund Spillklubb", url: "https://www.krsundspillklubb.no/", logoDark: spillklubbDark, logoLight: spillklubbLight },
  { name: "HTH", url: "https://www.hth.no/butikker/hth-kristiansund", logoDark: hthDark, logoLight: hthLight },
  { name: "Elkjøp", url: "https://www.elkjop.no/", logoDark: elkjopDark, logoLight: elkjopLight },
  { name: "SR Group", url: "https://www.sr-group.no/", logoDark: srGroupDark, logoLight: srGroupLight },
  { name: "Jacobsen Reklameagentur", url: "https://www.jacobsen-reklame.no/", logoDark: jacobsenDark, logoLight: jacobsenLight },
  { name: "Crew Taxi", url: "https://www.crewtaxi.no/", logoDark: crewTaxiDark, logoLight: crewTaxiLight },
];
