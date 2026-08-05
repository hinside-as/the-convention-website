import type { ImageMetadata } from "astro";

import conventionsBesteGamer from "../assets/competitions/conventions-beste-gamer.webp";
import laserTag from "../assets/competitions/laser-tag.webp";
import counterStrike2Wingman from "../assets/competitions/counter-strike-2-wingman-2026.webp";
import fortniteDuoBuild from "../assets/competitions/fortnite-duo-build.webp";
import smashBrosUltimate from "../assets/competitions/smash-bros-ultimate.webp";
import minecraftCreative from "../assets/competitions/minecraft-creative.webp";

export interface CompetitionFacts {
  tidspunkt: string;
  varighet?: string;
  spillmodus?: string;
  enhet?: string;
  sted?: string;
  /** One or more sign-up options (e.g. a Discord link and an in-person option). URL-shaped entries auto-link. */
  pameldng: string[];
  note?: string;
}

/** Standard sign-up options shared by every 2026 competition so far. */
const standardSignup = ["discord.gg/hPf8kPM"];

export interface Competition {
  slug: string;
  title: string;
  heading: string;
  body: string;
  image: ImageMetadata;
  /** Attribution for third-party promotional art (Valve/Epic/Nintendo etc.), shown as a small caption. */
  imageCredit?: string;
  facts: CompetitionFacts;
  /** Empty when prizes for this competition aren't confirmed yet. */
  premier: string[];
}

/**
 * 2026 competition line-up, per Jan Elling's notes (2026-08-03). Only the
 * games confirmed so far — last year's remaining games (Lynsjakk,
 * Simultansjakk, F1 2025, Mario Kart World, the other Fortnite modes) were
 * dropped until Jan sends updated notes for them. See STYLE.md.
 */
export const competitions: Competition[] = [
  {
    slug: "conventions-beste-gamer",
    title: "Conventions Beste Gamer",
    heading: "Har du det som skal til for å bli The Conventions Beste Gamer?",
    body: "I denne konkurransen kan du bli testet på flere spill og sjangre. Fra raske reflekser til taktisk tenking – her teller alt. Du samler poeng gjennom ulike spill, og til slutt kåres én mester: Conventions Beste Gamer. Den regjerende mesteren har forsvart tittelen to år på rad. Er du den som endelig vipper ham av tronen?",
    image: conventionsBesteGamer,
    facts: {
      tidspunkt: "Lørdag 15:00–17:30 og søndag 15:00–17:30",
      varighet: "Varierer per spill",
      spillmodus: "Solo",
      sted: "Beste Gamer-konkurranseområdet",
      enhet: "The Conventions eget utstyr",
      pameldng: standardSignup,
    },
    premier: [],
  },
  {
    slug: "laser-tag",
    title: "Laser tag",
    heading: "Er du klar for å se om skillsa fra skytespill også gjelder i virkeligheten?",
    body: "Bli med i 4v4 laser tag-turneringen! Her handler det om presisjon, samarbeid og raske avgjørelser. Du og laget ditt kjemper mot motstanderne i vår egen spesialbygde laser tag-arena. Det er fysisk, taktisk og brutalt gøy. Bare ett lag står igjen som mestere – er du en av de som står igjen?",
    image: laserTag,
    facts: {
      tidspunkt: "Lørdag 15:00–18:00, søndag 18:00–19:00 og 20:00–21:00",
      varighet: "10 minutter per runde",
      spillmodus: "4v4",
      sted: "Laser tag-arenaen",
      pameldng: standardSignup,
    },
    premier: [],
  },
  {
    slug: "counter-strike-2-wingman",
    title: "Counter Strike 2: Wingman",
    heading: "Hvem er byens råeste duo?",
    body: "I Wingman møtes to mot to på små kart med korte runder. Det er intenst, brutalt og nervepirrende, og bare de mest samspilte lagene går videre. Skarpe skudd, taktisk spill og nerver av stål avgjør. Er dere duoen som kan gå hele veien?",
    image: counterStrike2Wingman,
    imageCredit: "Bilde: Valve",
    facts: {
      tidspunkt: "Mandag 16:30–22:30",
      varighet: "6 timer",
      spillmodus: "Duo",
      enhet: "PC",
      pameldng: standardSignup,
    },
    premier: [],
  },
  {
    slug: "fortnite-duo-build",
    title: "Fortnite – Duo Build",
    heading: "Klar for å bevise hvem som er best i Fortnite?",
    body: "Bli med på årets Fortnite Duo Build-turnering! Gjør dere klare for tøffe fights, raske roteringer og høyt tempo. Her kreves det en kombinasjon av rå byggehastighet, presist sikte og god kommunikasjon. Har dere det som skal til for å ta seieren? Finn deg en partner og bli med i kampen!",
    image: fortniteDuoBuild,
    imageCredit: "Bilde: Epic Games",
    facts: {
      tidspunkt: "Lørdag 17:30–20:30",
      varighet: "3 timer",
      spillmodus: "Duo",
      enhet: "Alle kompatible enheter",
      pameldng: standardSignup,
    },
    premier: [],
  },
  {
    slug: "smash-bros-ultimate",
    title: "Smash Bros. Ultimate",
    heading: "Klar for å bevise hvem som er best i Smash?",
    body: "Bli med på årets Super Smash Bros. Ultimate-turnering! Gjør deg klar for alt fra tighte matchups til intense 1v1-fights. Her gjelder det å kjenne karakteren ut og inn, holde nervene kalde og treffe motstanderen når det gjelder. Har du det som skal til for å ta seieren?",
    image: smashBrosUltimate,
    imageCredit: "Bilde: Nintendo",
    facts: {
      tidspunkt: "Søndag 14:00–18:00",
      varighet: "4 timer",
      spillmodus: "Solo",
      enhet: "Nintendo Switch 2 (i konsollområdet)",
      pameldng: standardSignup,
    },
    premier: [],
  },
  {
    slug: "minecraft-creative",
    title: "Minecraft Creative",
    heading: "Er du en mesterbygger i skjul?",
    body: "Du får tre timer i Creative Mode til å bygge noe episk innenfor et hemmelig tema. Med ubegrensede ressurser og full frihet handler alt om å imponere dommerne. Kreativitet og originalitet belønnes – klarer du å bygge deg helt til toppen?",
    image: minecraftCreative,
    facts: {
      tidspunkt: "Mandag 13:00–16:00",
      varighet: "3 timer",
      spillmodus: "Solo",
      enhet: "PC, Xbox, Nintendo Switch, telefon (ikke PlayStation)",
      pameldng: standardSignup,
    },
    premier: [],
  },
];

export interface OtherActivity {
  slug: string;
  title: string;
  image: ImageMetadata;
  body: string[];
}

/**
 * Non-competitive activities (Scene, Cosplay) from last year are dropped
 * for now, pending updated notes from Jan — see STYLE.md.
 */
export const otherActivities: OtherActivity[] = [];

export const closingNote =
  "Uansett hva du liker, har vi en konkurranse for deg. Grip sjansen til å vinne kule premier og skape minner med venner!";
