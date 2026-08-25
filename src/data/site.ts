export const site = {
  name: "The Convention",
  tagline: "Der lidenskap og fellesskap møtes",
  event: {
    dayRange: "fredag—onsdag",
    dateRangeShort: "2—7 oktober 2026",
    doorsOpen: { label: "fredag 2. oktober", time: "17:00" },
    doorsClose: { label: "onsdag 7. oktober", time: "12:00" },
    /** ISO timestamp with explicit Europe/Oslo (CEST) offset for the countdown timer. */
    countdownTarget: "2026-10-02T17:00:00+02:00",
    /** ISO timestamp for doors-close, matching countdownTarget's format — used in the Event JSON-LD's endDate. */
    doorsCloseTarget: "2026-10-07T12:00:00+02:00",
  },
  venue: {
    name: "Braatthallen",
    city: "Kristiansund",
    addressLine: "Sankthanshaugen 1",
    postalCode: "6514",
    postalCity: "Kristiansund N",
    mapQuery: "Sankthanshaugen 1, 6514 Kristiansund N",
  },
  org: {
    addressLine: "Verkstedveien 13",
    postalCode: "6517",
    postalCity: "Kristiansund N",
    country: "Norge",
    mapQuery: "Verkstedveien 13, 6517 Kristiansund N",
    orgNumber: "988 177 180",
    phone: "99456634",
    phoneDisplay: "994 56 634",
    email: "admin@convention.no",
  },
  links: {
    shop: "https://shop.convention.no/",
    buyTicket: "https://shop.convention.no/",
    discordSignup: "https://discord.com/invite/hPf8kPM",
    instagramProfile: "https://www.instagram.com/_theconvention",
    grasrotandelen: "https://www.norsk-tipping.no/grasrotandelen/mottaker/988177180",
  },
  /**
   * SnapWidget (or similar) embed widget ID for the homepage Instagram feed.
   * Empty until the user creates a free account at https://snapwidget.com/
   * connected to @_theconvention and pastes the widget ID here — see SETUP.md.
   */
  instagramWidgetId: "",
  /** Google Analytics 4 measurement ID, carried over from the old Squarespace site. */
  gaMeasurementId: "G-6H1FDL8HNN",
} as const;
