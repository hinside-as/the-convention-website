import type { ImageMetadata } from "astro";

import type { CrewName } from "./program";

import andreaHaga from "../assets/crew/andrea-haga.webp";
import camillaMyrset from "../assets/crew/camilla-myrset.webp";
import endreGustad from "../assets/crew/endre-gustad.webp";
import gabrielMarholm from "../assets/crew/gabriel-marholm.webp";
import janEllingHolstad from "../assets/crew/jan-elling-holstad.webp";
import marenoSteira from "../assets/crew/mareno-steira.webp";
import martinKippervik from "../assets/crew/martin-kippervik.webp";
import martiniusTelsto from "../assets/crew/martinius-telsto.webp";
import runeStene from "../assets/crew/rune-stene.webp";
import sindreDahl from "../assets/crew/sindre-dahl.webp";
import sveinOskarSmevag from "../assets/crew/svein-oskar-smevag.webp";
import tirilSkjolsvik from "../assets/crew/tiril-skjolsvik.webp";
import tomSverreWarvikJoo from "../assets/crew/tom-sverre-warvik-joo.webp";
import torEgilBaeverfjord from "../assets/crew/tor-egil-baeverfjord.webp";
import vidarSmevag from "../assets/crew/vidar-smevag.webp";

export interface Person {
  name: string;
  photo: ImageMetadata;
  phoneDisplay: string;
  email: string;
}

export interface CrewMember extends Person {
  role: CrewName;
}

/** Styret has 6 seats; unfilled ones fall back to a placeholder PersonCard. */
export const styret: Person[] = [
  {
    name: "Vidar Smevåg",
    photo: vidarSmevag,
    phoneDisplay: "454 58 822",
    email: "vidar.smevag@convention.no",
  },
  {
    name: "Rune Stene",
    photo: runeStene,
    phoneDisplay: "974 19 908",
    email: "rune.stene@convention.no",
  },
  {
    name: "Mareno Steira",
    photo: marenoSteira,
    phoneDisplay: "994 56 634",
    email: "mareno.steira@convention.no",
  },
  {
    name: "Endre Gustad",
    photo: endreGustad,
    phoneDisplay: "992 81 628",
    email: "endre.gustad@convention.no",
  },
  {
    name: "Tiril Skjølsvik",
    photo: tirilSkjolsvik,
    phoneDisplay: "947 87 027",
    email: "tiril.skjolsvik@convention.no",
  },
];

/** One entry per crew lead with a submitted photo; a crew with no entry here falls back to a placeholder PersonCard. */
export const crew: CrewMember[] = [
  {
    name: "Andrea Haga",
    role: "Core",
    photo: andreaHaga,
    phoneDisplay: "948 98 146",
    email: "andrea.haga@convention.no",
  },
  {
    name: "Gabriel Marholm",
    role: "Core",
    photo: gabrielMarholm,
    phoneDisplay: "400 54 991",
    email: "gabriel.marholm@convention.no",
  },
  {
    name: "Jan Elling Holstad",
    role: "Game",
    photo: janEllingHolstad,
    phoneDisplay: "978 65 148",
    email: "jan.elling.holstad@convention.no",
  },
  {
    name: "Martinius Telstø",
    role: "Game",
    photo: martiniusTelsto,
    phoneDisplay: "413 84 360",
    email: "martinius.telsto@convention.no",
  },
  {
    name: "Sindre Dahl",
    role: "Design",
    photo: sindreDahl,
    phoneDisplay: "466 61 240",
    email: "sindre.dahl@convention.no",
  },
  {
    name: "Mareno Steira",
    role: "Scene",
    photo: marenoSteira,
    phoneDisplay: "994 56 634",
    email: "mareno.steira@convention.no",
  },
  {
    name: "Martin Kippervik",
    role: "Cosplay",
    photo: martinKippervik,
    phoneDisplay: "400 57 876",
    email: "martin.kippervik@convention.no",
  },
  {
    name: "Svein Oskar Smevåg",
    role: "Shop",
    photo: sveinOskarSmevag,
    phoneDisplay: "481 34 407",
    email: "sveinoskar.smevag@convention.no",
  },
  {
    name: "Tor-Egil Bæverfjord",
    role: "Support",
    photo: torEgilBaeverfjord,
    phoneDisplay: "454 43 777",
    email: "tor-egil.baeverfjord@convention.no",
  },
  {
    name: "Tiril Skjølsvik",
    role: "Cosplay",
    photo: tirilSkjolsvik,
    phoneDisplay: "947 87 027",
    email: "tiril.skjolsvik@convention.no",
  },
  {
    name: "Tom Sverre Warvik Joø",
    role: "Security",
    photo: tomSverreWarvikJoo,
    phoneDisplay: "980 55 359",
    email: "tom-sverre.joo@convention.no",
  },
  {
    name: "Camilla Myrset",
    role: "Media",
    photo: camillaMyrset,
    phoneDisplay: "979 76 092",
    email: "camilla.myrset@convention.no",
  },
];
