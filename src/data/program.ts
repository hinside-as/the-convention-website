/** Crew/team names — the controlled vocabulary for ProgramEvent.crew. */
export type CrewName =
  | "Core"
  | "Cosplay"
  | "Design"
  | "Game"
  | "Laser tag"
  | "Media"
  | "Scene"
  | "Security"
  | "Shop"
  | "Support"
  | "Technical";

export interface ProgramEvent {
  time: string;
  /** Omit for instantaneous events (e.g. doors opening). */
  endTime?: string;
  /** Which crew owns the activity — not a physical location, see STYLE.md. */
  crew: CrewName | "Hele arrangementet";
  title: string;
  /** Platform(s) it's played on — Game entries only, e.g. "PC" or "Xbox, PC". */
  system?: string;
}

export interface ProgramDay {
  weekday: string;
  dateLabel: string;
  events: ProgramEvent[];
}

/**
 * Full 2026 master schedule per Jan Elling (2026-08-03), confirmed dates
 * fre 2–ons 7 oktober. Game-track entries (Conventions Beste Gamer,
 * Fortnite – Duo Build, Smash Bros. Ultimate, Minecraft Creative, Counter
 * Strike 2: Wingman) correspond 1:1 to entries in competitions.ts — times
 * are kept in sync between the two files manually. See STYLE.md.
 */
export const programDays: ProgramDay[] = [
  {
    weekday: "Fredag",
    dateLabel: "2. oktober",
    events: [
      { time: "17:00", crew: "Hele arrangementet", title: "Dørene åpner" },
      { time: "19:30", endTime: "20:30", crew: "Scene", title: "Åpningsshow?" },
      { time: "20:00", endTime: "22:00", crew: "Laser tag", title: "Laser tag åpent" },
    ],
  },
  {
    weekday: "Lørdag",
    dateLabel: "3. oktober",
    events: [
      { time: "13:00", endTime: "14:00", crew: "Scene", title: "Quizvention" },
      { time: "14:00", endTime: "15:30", crew: "Laser tag", title: "Laser tag åpent" },
      { time: "15:00", endTime: "17:30", crew: "Game", title: "Conventions Beste Gamer" },
      { time: "15:30", endTime: "17:30", crew: "Laser tag", title: "Compo" },
      { time: "17:30", endTime: "20:30", crew: "Game", title: "Fortnite – Duo Build", system: "Alle kompatible enheter" },
      { time: "21:00", endTime: "23:30", crew: "Laser tag", title: "Laser tag åpent" },
    ],
  },
  {
    weekday: "Søndag",
    dateLabel: "4. oktober",
    events: [
      { time: "14:00", endTime: "18:00", crew: "Game", title: "Smash Bros. Ultimate", system: "Nintendo Switch 2" },
      { time: "15:00", endTime: "17:30", crew: "Game", title: "Conventions Beste Gamer" },
      { time: "15:00", endTime: "17:30", crew: "Laser tag", title: "Laser tag åpent" },
      { time: "17:30", endTime: "18:30", crew: "Laser tag", title: "Compo" },
      { time: "19:00", endTime: "20:00", crew: "Cosplay", title: "Catwalk" },
      { time: "19:30", endTime: "20:30", crew: "Laser tag", title: "Finale" },
      { time: "21:00", endTime: "22:30", crew: "Laser tag", title: "Laser tag åpent" },
    ],
  },
  {
    weekday: "Mandag",
    dateLabel: "5. oktober",
    events: [
      { time: "13:00", endTime: "16:00", crew: "Game", title: "Minecraft Creative", system: "PC, Xbox, Nintendo Switch, telefon" },
      { time: "14:00", endTime: "15:30", crew: "Scene", title: "Pillow Fight Night" },
      { time: "14:00", endTime: "16:00", crew: "Laser tag", title: "Laser tag åpent" },
      { time: "16:00", endTime: "17:00", crew: "Cosplay", title: "Beste kostyme" },
      { time: "16:30", endTime: "22:30", crew: "Game", title: "Counter Strike 2: Wingman", system: "PC" },
      { time: "19:30", endTime: "22:00", crew: "Laser tag", title: "Laser tag åpent" },
    ],
  },
  {
    weekday: "Tirsdag",
    dateLabel: "6. oktober",
    events: [
      { time: "15:00", endTime: "16:00", crew: "Game", title: "Mulig «For Fun»" },
      { time: "16:30", endTime: "17:30", crew: "Scene", title: "Pillow Fight Night" },
      { time: "17:30", endTime: "19:30", crew: "Cosplay", title: "Cosplay à la Laser tag" },
      { time: "23:00", endTime: "08:30 (onsdag)", crew: "Laser tag", title: "Laser tag åpent hele natten" },
    ],
  },
  {
    weekday: "Onsdag",
    dateLabel: "7. oktober",
    events: [{ time: "12:00", crew: "Hele arrangementet", title: "Dørene lukkes" }],
  },
];
