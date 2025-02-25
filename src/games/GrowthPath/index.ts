export const classicPath: PathCell[] = [
  {
    title: "Green Field",
    description: "A good place to build a farm.",
    type: "property",
    value: 300,
    position: 1,
    media: {
      image: "",
      fallback: "🛖",
      color: "#45a",
    },
  },
  {
    title: "Dragon's Lair",
    description: "Beware! A fierce dragon guards its treasure.",
    type: "event",
    value: 0,
    position: 2,
    media: {
      image: "",
      fallback: "🐉",
      color: "#d33",
    },
  },
  {
    title: "Golden City",
    description: "A bustling city full of opportunities and wealth.",
    type: "property",
    value: 500,
    position: 3,
    media: {
      image: "",
      fallback: "🏙️",
      color: "#fd0",
    },
  },
  {
    title: "Enchanted Forest",
    description: "A mystical forest where magic is in the air.",
    type: "event",
    value: 0,
    position: 4,
    media: {
      image: "",
      fallback: "🌳",
      color: "#0a5",
    },
  },
  {
    title: "Bandit Camp",
    description: "A dangerous place where bandits lurk.",
    type: "challenge",
    value: -100,
    position: 5,
    media: {
      image: "",
      fallback: "🏕️",
      color: "#a22",
    },
  },
  {
    title: "Crystal Caverns",
    description: "A cave filled with precious gems and rare minerals.",
    type: "property",
    value: 400,
    position: 6,
    media: {
      image: "",
      fallback: "💎",
      color: "#6af",
    },
  },
  {
    title: "Wizard's Tower",
    description: "A towering structure where a powerful wizard resides.",
    type: "event",
    value: 0,
    position: 7,
    media: {
      image: "",
      fallback: "🏰",
      color: "#a0f",
    },
  },
  {
    title: "Haunted Mansion",
    description: "A spooky mansion haunted by restless spirits.",
    type: "property",
    value: 350,
    position: 8,
    media: {
      image: "",
      fallback: "👻",
      color: "#555",
    },
  },
  {
    title: "Treasure Island",
    description: "A remote island rumored to hold untold riches.",
    type: "event",
    value: 0,
    position: 9,
    media: {
      image: "",
      fallback: "🏝️",
      color: "#fa0",
    },
  },
  {
    title: "Ancient Ruins",
    description: "The remains of a lost civilization, full of secrets.",
    type: "challenge",
    value: -50,
    position: 10,
    media: {
      image: "",
      fallback: "🏛️",
      color: "#964",
    },
  },
  {
    title: "Frozen Tundra",
    description: "A harsh, icy landscape where survival is key.",
    type: "property",
    value: 250,
    position: 11,
    media: {
      image: "",
      fallback: "❄️",
      color: "#aef",
    },
  },
  {
    title: "Market Square",
    description: "A lively marketplace where goods are traded.",
    type: "event",
    value: 0,
    position: 12,
    media: {
      image: "",
      fallback: "🛒",
      color: "#f80",
    },
  },
  {
    title: "Dark Dungeon",
    description: "A perilous dungeon filled with traps and monsters.",
    type: "challenge",
    value: -150,
    position: 13,
    media: {
      image: "",
      fallback: "⚔️",
      color: "#333",
    },
  },
  {
    title: "Sunken Ship",
    description: "A shipwreck at the bottom of the ocean, hiding treasures.",
    type: "event",
    value: 0,
    position: 14,
    media: {
      image: "",
      fallback: "🚢",
      color: "#08c",
    },
  },
  {
    title: "Mystic Lake",
    description: "A serene lake with magical properties.",
    type: "property",
    value: 200,
    position: 15,
    media: {
      image: "",
      fallback: "🌊",
      color: "#0af",
    },
  },
  {
    title: "Castle of Kings",
    description: "The grand castle of the realm's rulers.",
    type: "property",
    value: 600,
    position: 16,
    media: {
      image: "",
      fallback: "🏯",
      color: "#f00",
    },
  },
  {
    title: "Cursed Swamp",
    description: "A dangerous swamp filled with dark magic.",
    type: "challenge",
    value: -75,
    position: 17,
    media: {
      image: "",
      fallback: "🌫️",
      color: "#5a5",
    },
  },
  {
    title: "Rainbow Falls",
    description: "A beautiful waterfall with a rainbow arching over it.",
    type: "event",
    value: 0,
    position: 18,
    media: {
      image: "",
      fallback: "🌈",
      color: "#f0f",
    },
  },
  {
    title: "Volcanic Crater",
    description: "A fiery crater with molten lava and rare minerals.",
    type: "property",
    value: 450,
    position: 19,
    media: {
      image: "",
      fallback: "🌋",
      color: "#f50",
    },
  },
  {
    title: "Endless Desert",
    description: "A vast desert where the sun never sets.",
    type: "property",
    value: 300,
    position: 20,
    media: {
      image: "",
      fallback: "🏜️",
      color: "#fc0",
    },
  },
];

export interface PathCell {
  /** The title or name of the cell. */
  title: string;

  /** A short description of the cell's purpose or theme. */
  description: string;

  /** The type of cell, which determines its behavior. */
  type: "property" | "expense" | "income" | "event" | "challenge" | "special";

  /** The monetary value associated with the cell (e.g., cost, reward, penalty). */
  value: number;

  /** The position of the cell on the board. */
  position: number;

  /** Media properties for displaying the cell visually. */
  media: {
    /** URL of an image representing the cell. */
    image: string;

    /** A fallback emoji or text if the image is unavailable. */
    fallback: string;

    /** A color theme for the cell (e.g., background or border color). */
    color: string;
  };

  /** Optional: Additional metadata for special cells (e.g., event details). */
  metadata?: {
    /** A unique identifier for the cell. */
    id?: string;

    /** Indicates if the cell is owned by a player. with The player ID who owns the cell (if applicable). */
    ownerId?: string | null;

    /** Additional data for events or challenges (e.g., effects, rewards). */
    data?: Record<string, unknown>;
  };
}
