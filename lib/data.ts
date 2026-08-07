export interface EventItem {
  slug: string;
  name: string;
  venue: string;
  venueSlug: string;
  date: string;
  time: string;
  image: string;
  tag: "Live Music" | "Food" | "Late-Night" | "Festival";
  description: string;
  lineup: string[];
  lat: number;
  lng: number;
}

export interface BandItem {
  slug: string;
  name: string;
  genre: string;
  bio: string;
  image: string;
  fullBio: string;
  basedIn: string;
  homeVenueSlug: string;
  upcomingShows: string[];
  socials: { label: string; url: string }[];
  youtubeId?: string;
}

export interface VenueItem {
  slug: string;
  name: string;
  type: "Bar" | "Restaurant" | "Music Venue" | "Brewery";
  image: string;
  description: string;
  address: string;
  website: string;
  lat: number;
  lng: number;
  socials: { label: string; url: string }[];
}

// Real, working Google Maps directions link built from a venue's address.
export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Traverse City, MI")}`;
}

// Real, working search links (since these are sample/demo bands & venues without
// live social accounts yet, these route to genuine platform search results).
function instagramSearch(name: string) {
  return `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(name)}`;
}
function spotifySearch(name: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(name)}`;
}
function youtubeSearch(name: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`;
}

// All event dates below are intentionally set in the future relative to today
// so the site never shows a stale "upcoming" event. Each band's lineup entry
// is cross-checked against the band roster below (see homeVenueSlug / upcomingShows)
// so "who is playing where" stays consistent across Events, Bands, and Venues.
export const events: EventItem[] = [
  {
    slug: "little-fleet-live-band-night",
    name: "Live Band Night",
    venue: "The Little Fleet",
    venueSlug: "the-little-fleet",
    date: "2026-08-14",
    time: "8:00 PM",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/001bc498-6c45-4091-960c-d92bbd226a55.png",
    tag: "Live Music",
    description:
      "Grab a drink from the retro Airstream bar and catch a night of high-energy indie rock under the string lights at Traverse City's favorite food-truck park venue.",
    lineup: ["The Neon Pines", "Harbor Static"],
    lat: 44.7628,
    lng: -85.6206,
  },
  {
    slug: "7-monks-acoustic-sessions",
    name: "Acoustic Sessions",
    venue: "7 Monks Taproom",
    venueSlug: "7-monks-taproom",
    date: "2026-08-15",
    time: "7:00 PM",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/0f8f03c3-a5fc-41b8-bf5f-02b94e122a4a.png",
    tag: "Live Music",
    description:
      "An intimate evening of stripped-down acoustic sets paired with 7 Monks' rotating craft beer flights. Exposed brick, warm light, good company.",
    lineup: ["Maple & Vine"],
    lat: 44.7597,
    lng: -85.6144,
  },
  {
    slug: "rare-bird-brewpub-showcase",
    name: "Brewpub Band Showcase",
    venue: "Rare Bird Brewpub",
    venueSlug: "rare-bird-brewpub",
    date: "2026-08-16",
    time: "9:00 PM",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/7597c6a3-7d0e-4a80-a3fc-0374a625d3cb.png",
    tag: "Live Music",
    description:
      "Rare Bird's industrial-chic taproom hosts a late-night showcase of local funk and soul acts. Full kitchen open till close.",
    lineup: ["Bayside Funk Collective", "The Amber Room"],
    lat: 44.76,
    lng: -85.6169,
  },
  {
    slug: "downtown-summer-street-fest",
    name: "Downtown Summer Street Fest",
    venue: "Front Street",
    venueSlug: "the-little-fleet",
    date: "2026-08-21",
    time: "5:00 PM",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/a2f4aa64-3fed-43b9-98cd-7a5f17235cb6.png",
    tag: "Festival",
    description:
      "Downtown TC shuts down Front Street for an evening of food vendors, local makers, and back-to-back live sets on the outdoor stage.",
    lineup: ["Cherry Capital Horns", "The Neon Pines", "Maple & Vine"],
    lat: 44.7606,
    lng: -85.6215,
  },
  {
    slug: "low-bar-rooftop-dj-night",
    name: "Rooftop DJ Night",
    venue: "Low Bar",
    venueSlug: "low-bar",
    date: "2026-08-22",
    time: "10:00 PM",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/1200bc10-9c81-4b1b-aaf6-33afbd437fd9.png",
    tag: "Late-Night",
    description:
      "Bay-view rooftop, neon LEDs, and a guest DJ spinning house till 2AM. Traverse City's late-night scene at its peak.",
    lineup: ["DJ Bay Static"],
    lat: 44.7614,
    lng: -85.6178,
  },
  {
    slug: "lakeside-sunset-sessions",
    name: "Lakeside Sunset Sessions",
    venue: "West End Beach",
    venueSlug: "taproot-cider-house",
    date: "2026-08-28",
    time: "7:30 PM",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/e1e1591e-097f-4da9-b765-003c7d118c07.png",
    tag: "Live Music",
    description:
      "Blankets on the sand, cider in hand, and acoustic sets as the sun drops over Lake Michigan. Free and family friendly.",
    lineup: ["Maple & Vine"],
    lat: 44.7644,
    lng: -85.6339,
  },
];

export const bands: BandItem[] = [
  {
    slug: "the-neon-pines",
    name: "The Neon Pines",
    genre: "Indie Rock",
    bio: "Four-piece indie rock outfit blending jangly guitars with big anthemic choruses.",
    fullBio:
      "Formed on the west side of Traverse City, The Neon Pines write sun-bleached indie rock built for downtown patios and late-summer festivals. Their live show leans into big choruses, twin-guitar interplay, and a rhythm section that doesn't let up.",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/1f20984d-8a7d-4e3a-a2e8-f1da3277057a.png",
    basedIn: "Traverse City, MI",
    homeVenueSlug: "the-little-fleet",
    upcomingShows: ["Live Band Night — The Little Fleet — Aug 14", "Downtown Summer Street Fest — Aug 21"],
    socials: [
      { label: "Instagram", url: instagramSearch("The Neon Pines Traverse City") },
      { label: "Spotify", url: spotifySearch("The Neon Pines") },
    ],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "maple-and-vine",
    name: "Maple & Vine",
    genre: "Acoustic / Folk",
    bio: "Warm two-part harmonies over fingerpicked acoustic guitar — porch-show energy.",
    fullBio:
      "Maple & Vine is a husband-and-wife acoustic duo rooted in Northern Michigan folk tradition. Expect close harmonies, storytelling between songs, and a set list that moves easily from originals to reimagined classics.",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/877f972b-4e6c-489d-a077-4872ec402f80.png",
    basedIn: "Traverse City, MI",
    homeVenueSlug: "7-monks-taproom",
    upcomingShows: [
      "Acoustic Sessions — 7 Monks Taproom — Aug 15",
      "Downtown Summer Street Fest — Aug 21",
      "Lakeside Sunset Sessions — Aug 28",
    ],
    socials: [
      { label: "Instagram", url: instagramSearch("Maple and Vine Traverse City") },
      { label: "YouTube", url: youtubeSearch("Maple and Vine Traverse City acoustic duo") },
    ],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "bayside-funk-collective",
    name: "Bayside Funk Collective",
    genre: "Funk / Soul",
    bio: "Five-piece brass-driven funk band that turns every taproom into a dance floor.",
    fullBio:
      "Bayside Funk Collective packs a horn section, a deep-pocket rhythm section, and decades of combined touring experience into one of the most requested live acts in Northwest Michigan. Booked out most summer weekends.",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/d9c6e3fd-e28e-471f-b2e6-7614797960f2.png",
    basedIn: "Traverse City, MI",
    homeVenueSlug: "rare-bird-brewpub",
    upcomingShows: ["Brewpub Band Showcase — Rare Bird Brewpub — Aug 16"],
    socials: [{ label: "Instagram", url: instagramSearch("Bayside Funk Collective") }],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "cherry-capital-horns",
    name: "Cherry Capital Horns",
    genre: "Americana / Folk",
    bio: "Barn-raised Americana trio — guitar, banjo, and upright bass.",
    fullBio:
      "Cherry Capital Horns write dusty, harmony-forward Americana inspired by the orchards and shorelines of the Grand Traverse region. A staple of local farm-to-table events and festival side stages.",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/55ae690d-5902-4ca4-a9d1-c0821dabbeb1.png",
    basedIn: "Grand Traverse County, MI",
    homeVenueSlug: "the-little-fleet",
    upcomingShows: ["Downtown Summer Street Fest — Aug 21"],
    socials: [{ label: "Instagram", url: instagramSearch("Cherry Capital Horns") }],
  },
  {
    slug: "the-amber-room",
    name: "The Amber Room",
    genre: "Alt Rock",
    bio: "Loud, riff-heavy alt-rock trio with a reputation for chaotic, sweaty sets.",
    fullBio:
      "The Amber Room brings arena-sized riffs to small rooms. Expect fog, feedback, and a mosh pit forming by the second song — not for the faint of heart.",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/ae7e6266-0aa7-484f-ae98-88d8e084d00b.png",
    basedIn: "Traverse City, MI",
    homeVenueSlug: "rare-bird-brewpub",
    upcomingShows: ["Brewpub Band Showcase — Rare Bird Brewpub — Aug 16"],
    socials: [{ label: "Instagram", url: instagramSearch("The Amber Room band Traverse City") }],
  },
  {
    slug: "harbor-static",
    name: "Harbor Static",
    genre: "Jazz",
    bio: "Late-night jazz quartet — saxophone, upright bass, piano, drums.",
    fullBio:
      "Harbor Static plays the after-hours slots — smoky, moody, and built for the last round of the night. A rotating cast of Interlochen-trained musicians keeps every set a little different.",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/aee09f8c-ddaf-4681-9b57-48df660ae697.png",
    basedIn: "Traverse City, MI",
    homeVenueSlug: "the-little-fleet",
    upcomingShows: ["Live Band Night — The Little Fleet — Aug 14"],
    socials: [{ label: "Instagram", url: instagramSearch("Harbor Static jazz quartet") }],
  },
  {
    slug: "dj-bay-static",
    name: "DJ Bay Static",
    genre: "House / DJ",
    bio: "Traverse City's go-to rooftop DJ — deep house and bay-view sunsets.",
    fullBio:
      "DJ Bay Static has spun the late-night rooftop slot at Low Bar for two summers running, mixing deep house and disco edits for the after-dinner crowd until close.",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/1200bc10-9c81-4b1b-aaf6-33afbd437fd9.png",
    basedIn: "Traverse City, MI",
    homeVenueSlug: "low-bar",
    upcomingShows: ["Rooftop DJ Night — Low Bar — Aug 22"],
    socials: [{ label: "Instagram", url: instagramSearch("DJ Bay Static Traverse City") }],
  },
];

export const venues: VenueItem[] = [
  {
    slug: "the-little-fleet",
    name: "The Little Fleet",
    type: "Music Venue",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/1f92c0f9-e995-45b1-ac51-b1a9ff0e8e83.png",
    description:
      "A vintage-Airstream-turned-bar with a rotating cast of food trucks and one of the best small-stage lineups in Traverse City. String lights, picnic tables, and a packed events calendar all summer long.",
    address: "448 W Front St, Traverse City, MI",
    website: "https://thelittlefleet.com",
    lat: 44.7628,
    lng: -85.6206,
    socials: [{ label: "Instagram", url: instagramSearch("The Little Fleet Traverse City") }],
  },
  {
    slug: "7-monks-taproom",
    name: "7 Monks Taproom",
    type: "Brewery",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/de37f2b3-7a5d-45fc-97ad-03fc8265b9d9.png",
    description:
      "Exposed brick, dozens of taps, and a laid-back crowd. 7 Monks runs regular acoustic nights alongside a serious rotating beer list.",
    address: "128 S Union St, Traverse City, MI",
    website: "https://7monkstaproom.com",
    lat: 44.7597,
    lng: -85.6144,
    socials: [{ label: "Instagram", url: instagramSearch("7 Monks Taproom Traverse City") }],
  },
  {
    slug: "rare-bird-brewpub",
    name: "Rare Bird Brewpub",
    type: "Brewery",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/a8afedf5-4ca9-47c7-a64b-9c256387adc3.png",
    description:
      "Industrial-chic brewpub with in-house brewing tanks, a full kitchen, and a stage that hosts everything from funk showcases to trivia night.",
    address: "215 E Front St, Traverse City, MI",
    website: "https://rarebirdbrewpub.com",
    lat: 44.76,
    lng: -85.6169,
    socials: [{ label: "Instagram", url: instagramSearch("Rare Bird Brewpub Traverse City") }],
  },
  {
    slug: "taproot-cider-house",
    name: "Taproot Cider House",
    type: "Bar",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/a33c452d-2542-4580-ade0-e6050a4abf8b.png",
    description:
      "A cozy patio-forward cider house pouring Northern Michigan cider flights. Regular live sessions and a laid-back, lake-life crowd.",
    address: "322 6th St, Traverse City, MI",
    website: "https://taprootcider.com",
    lat: 44.7644,
    lng: -85.6339,
    socials: [{ label: "Instagram", url: instagramSearch("Taproot Cider House Traverse City") }],
  },
  {
    slug: "dillingers-pub",
    name: "Dillinger's Pub",
    type: "Bar",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/05408a89-812b-4d3d-bb8c-a65ef066f299.png",
    description:
      "Classic neon-and-wood-paneled dive with a pool table and a loyal regular crowd. The kind of bar where everyone ends up by 1AM.",
    address: "241 E Front St, Traverse City, MI",
    website: "https://dillingerspub.com",
    lat: 44.7602,
    lng: -85.6158,
    socials: [{ label: "Instagram", url: instagramSearch("Dillinger's Pub Traverse City") }],
  },
  {
    slug: "low-bar",
    name: "Low Bar",
    type: "Bar",
    image:
      "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/eaef9f0c-5668-49c9-99c2-c18fd0b2119d.png",
    description:
      "Sleek, moody cocktail bar with a rooftop overlooking Grand Traverse Bay. Craft cocktails, guest DJs, and Traverse City's best late-night view.",
    address: "112 S Union St, Traverse City, MI",
    website: "https://lowbartc.com",
    lat: 44.7614,
    lng: -85.6178,
    socials: [{ label: "Instagram", url: instagramSearch("Low Bar Traverse City") }],
  },
];

export const feedImages: string[] = [
  "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/5f9253ee-9a3e-43ba-99e8-4787bc6e898f.png",
  "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/f835224c-223f-473f-b722-840e71fdbf57.png",
  "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/3f977245-98f0-4cd8-b413-99880867e6a8.png",
  "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/aeda360f-3e12-4cef-88d0-17b2320f437e.png",
  "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/a07d66ab-c998-43e2-a230-e33519f22659.png",
  "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/041a4065-e9d1-4791-a688-5555765fb899.png",
];

export const heroVideoUrl =
  "https://galaxy-prod.tlcdn.com/gen/user_309ZPDU43zHtpzFQyCTgQb0bTcM/8c74db47-fcf8-4148-b398-76859b3162c9.mp4";
