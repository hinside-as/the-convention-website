# Content strategy

Brand foundations for The Convention. Use this to judge whether new copy fits — tone, framing, what to avoid — before writing or editing anything in `src/data/`.

## Visjon

The Convention skal være den ultimate møteplassen for gamere og kreative talenter, hvor teknologi, kreativitet og fellesskap forenes. Vi streber etter å skape et inspirerende og trygt miljø hvor deltakere kan utforske sine interesser, utvikle nye ferdigheter, og bygge varige vennskap. Gjennom våre arrangementer vil vi fremme underholdning, konkurranse, læring og samarbeid – samt inspirere den neste generasjonen av teknologiske pionerer og kreative talenter.

## Misjon

Vår misjon er å samle gamere og kreative talenter til et årlig arrangement hvor de kan oppleve spennende konkurranser, engasjerende workshops og inspirerende fellesskap. Vi streber etter å fremme læring og utvikling innen teknologi og kreativitet, tilby en trygg og inkluderende arena for personlig vekst, og skape varige minner og forbindelser. Gjennom vårt fokus på innovasjon og samarbeid, ønsker vi å styrke og inspirere neste generasjon av teknologientusiaster og kreative pionerer.

## Kjerneverdier

**Fellesskap**
Vi verdsetter det sterke fellesskapet som oppstår når gamere og kreative individer kommer sammen for å dele sin lidenskap. Vi fremmer et inkluderende og støttende miljø der deltakerne kan bygge varige vennskap og samarbeide om å oppnå felles mål.

**Konkurranse og underholdning**
Vi tror på spenningen og gleden som oppstår når mennesker møtes i vennskapelig konkurranse og felles opplevelser. Vi tilbyr aktiviteter og turneringer på flere nivåer, der deltakerne kan utfordre seg selv, heie på andre og dele øyeblikkene sammen. Målet er å skape energi, mestring og minner som gjør at alle føler seg som en del av arrangementet.

**Læring og utvikling**
Vi skaper en arena der deltakere kan dele kunnskap, inspirere hverandre og utvikle ferdigheter gjennom praktiske aktiviteter. Vi legger til rette for lav terskel, nysgjerrighet og egeninitiert læring – både innen gaming, teknologi og kreativt arbeid. Ved å oppmuntre til samarbeid og utforsking, ønsker vi å bidra til at flere får tro på egne evner og lyst til å lære mer.

## Målgrupper

**Deltakere (barn, ungdom og unge voksne)**
The Convention samler gamere og kreative teknologiinteresserte som søker fellesskap, opplevelser og mestring. Gruppen omfatter både konkurranser, verksteder og lavterskel aktiviteter i et sosialt miljø.

**Foresatte**
Foresatte er en sentral beslutningstakergruppe. De vektlegger trygghet, tydelige rammer, trivsel og at arrangementet gir en positiv arena for læring og utvikling. → This is who `praktisk-info.astro` (especially Aldersgrenser og trygghet, Foreldrehjørnet) is written for.

**Voksne entusiaster og frivillige**
Voksne deltar som LAN-veteraner, ledsagere eller bidragsytere. De vektlegger kvalitet, struktur og et inkluderende fellesskap, og ønsker et arrangement med tydelig innhold og kultur.

**Sponsorer og samarbeidspartnere**
Sponsorer og samarbeidspartnere søker relevant synlighet, lokal forankring og tydelig samfunnsnytte. De forventer profesjonelle rammer, dokumenterbar rekkevidde og konkrete samarbeidsflater knyttet til aktiviteter og innhold. → This is who the sponsor section (`SponsorGrid`) and any future partner-facing copy should speak to.

## Språk og tone

**Beskrivelse**
The Convention snakker som en vennlig nerdete kompis – en som vet hva du liker, inviterer deg inn, og aldri dømmer. Språket er energisk, forståelig og fullt av kjærlighet for spill, teknologi og skaperglede. Det skal være inkluderende og tilgjengelig – her er det lav terskel og høy takhøyde. Samtidig kommuniserer vi med selvtillit og kompetanse, uten å være belærende eller pressende.

**Grunnprinsipper**
- Tydelig og rett fram – vi forklarer uten å overforklare
- Varm og inkluderende – alle skal føle seg velkomne, uansett alder eller erfaring
- Leken og engasjerende – men aldri barnslig eller stressende
- Nostalgisk og fremtidsrettet – vi elsker retro, men bygger noe nytt

**Unngå**
- FOMO, sosialt press eller "du må være med for å være kul"
- Overdreven bruk av hype-ord eller clickbait
- Nedlatende tone – vi snakker med publikum, ikke til
- For teknisk språk uten forklaring (spesielt mot yngre målgrupper)

## Applying this to the site

- Existing homepage copy (`src/data/site.ts`, `src/pages/index.astro`) already lands in this voice — use it as the reference example when writing new sections.
- Competition and program copy (`src/data/competitions.ts`, `src/data/program.ts`) is playful and inviting ("Klarer du å slå klokka?") — keep new entries in that same question-led, energetic style, not a dry results listing.
- Praktisk info copy is calmer and more direct, because its audience skews toward foresatte — don't import the hype tone of the competition cards into that page.
- When in doubt about a new line of copy: would a "vennlig nerdete kompis" say it, or does it read like marketing copy performing enthusiasm? Rewrite toward the former.
