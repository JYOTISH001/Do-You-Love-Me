/**
 * LOVE_CONFIG
 * Central configuration for the romantic microsite.
 * You can easily customize names, dates, memories, photos, reasons, and music here!
 */

// Clearly marked placeholder photo URLs. Replace these with your own photo URLs!
export const PHOTO_1_URL = "https://tse3.mm.bing.net/th/id/OIP.zf4CfZLI7n4ZizL60qkf0gHaJh?r=0&pid=Apissoooooooooooooooooooooooooooooooooo"; // Sunset couple / romance
export const PHOTO_2_URL = "https://tse2.mm.bing.net/th/id/OIP.asqZaZCmTModfobKBEe-IwHaHa?r=0&pid=Api"; // Holding hands
export const PHOTO_3_URL = "https://tse4.mm.bing.net/th/id/OIP.5Anfsu5MR9FQ668XRUKfewHaFj?r=0&pid=Api"; // Warm cozy coffee moment
export const PHOTO_4_URL = "https://tse1.mm.bing.net/th/id/OIP.loawZX7rlbsmrDoGP2aXbwHaHa?r=0&pid=Api"; // Stargazing / twilight
export const PHOTO_5_URL = "https://tse2.mm.bing.net/th/id/OIP.cw8WT95nK7TVOz3zPdo3iwHaHa?r=0&pid=Api"; // Laughing together
export const PHOTO_6_URL = "https://tse4.mm.bing.net/th/id/OIP.DSwGxgPK1F4OEr9uCcgBmgHaHa?r=0&pid=Api"; // Beach sunset walk

export interface MemoryItem {
  id: string;
  photoUrl: string;
  caption: string;
  date: string;
  note?: string;
  rotation?: number;
}

export interface ReasonItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface TimelineItem {
  phase: string;
  title: string;
  description: string;
  badge: string;
}

export interface LoveConfig {
  personName: string;
  yourName: string;
  question: string;
  questionSubtitle: string;
  loveLetter: {
    greeting: string;
    paragraphs: string[];
    highlight: string;
    closing: string;
    signature: string;
  };
  photos: string[];
  memories: MemoryItem[];
  reasons: ReasonItem[];
  timeline: TimelineItem[];
  musicUrl: string; // Leave empty to use the built-in romantic Web Audio synthesizer
}

export const DEFAULT_LOVE_CONFIG: LoveConfig = {
  personName: "MY LOVE",
  yourName: "Yours Always",
  question: "Do You Love Me? ❤️",
  questionSubtitle: "Be honest... 👀❤️",
  loveLetter: {
    greeting: "Dear You,",
    paragraphs: [
      "I don't know exactly when you became such an important part of my life, but somehow, you became one of the most beautiful parts of it.",
      "You make ordinary moments feel special. Your smile can change my entire mood. Your presence makes everything feel a little better.",
      "I may not always have the perfect words to explain what I feel, but one thing will always be simple:",
      "Thank you for being you. Thank you for every smile, every conversation, every little moment and every memory.",
      "If I could choose one person to make countless beautiful memories with, I would choose you again and again.",
      "Always you. Always us. ❤️"
    ],
    highlight: "I LOVE YOU. ❤️",
    closing: "With all my heart,",
    signature: "Yours ❤️"
  },
  photos: [
    PHOTO_1_URL,
    PHOTO_2_URL,
    PHOTO_3_URL,
    PHOTO_4_URL,
    PHOTO_5_URL,
    PHOTO_6_URL
  ],
  memories: [
    {
      id: "mem-1",
      photoUrl: PHOTO_1_URL,
      caption: "Our first beautiful moment ❤️",
      date: "Day One",
      note: "The moment everything felt right.",
      rotation: -2
    },
    {
      id: "mem-2",
      photoUrl: PHOTO_2_URL,
      caption: "A memory I'll never forget.",
      date: "Golden Hour",
      note: "Holding your hand, wishing time stood still.",
      rotation: 1.5
    },
    {
      id: "mem-3",
      photoUrl: PHOTO_3_URL,
      caption: "Your smile >>> everything.",
      date: "That Cozy Afternoon",
      note: "The way you laugh makes my whole day brighter.",
      rotation: -1.2
    },
    {
      id: "mem-4",
      photoUrl: PHOTO_4_URL,
      caption: "Just us. ❤️",
      date: "Under The Stars",
      note: "Talking about everything and nothing.",
      rotation: 2.2
    },
    {
      id: "mem-5",
      photoUrl: PHOTO_5_URL,
      caption: "One of my favorite moments.",
      date: "Spontaneous Adventures",
      note: "Every second with you is pure happiness.",
      rotation: -2.5
    },
    {
      id: "mem-6",
      photoUrl: PHOTO_6_URL,
      caption: "Forever worth remembering.",
      date: "By The Shore",
      note: "Walking beside you, grateful for you always.",
      rotation: 1
    }
  ],
  reasons: [
    {
      id: "reason-1",
      title: "Your smile 😊",
      subtitle: "It instantly lights up even my heaviest days.",
      icon: "Smile"
    },
    {
      id: "reason-2",
      title: "Your kindness ❤️",
      subtitle: "The genuine warmth and gentleness in how you treat others.",
      icon: "Heart"
    },
    {
      id: "reason-3",
      title: "The way you care.",
      subtitle: "Always checking in, noticing little details without saying a word.",
      icon: "Sparkles"
    },
    {
      id: "reason-4",
      title: "The way you make me laugh.",
      subtitle: "Nobody else shares our goofy humor and inside jokes.",
      icon: "Laugh"
    },
    {
      id: "reason-5",
      title: "Your little habits.",
      subtitle: "All the cute quirks that make you unmistakably YOU.",
      icon: "Flame"
    },
    {
      id: "reason-6",
      title: "Your beautiful heart.",
      subtitle: "Pure, sincere, forgiving, and endlessly lovable.",
      icon: "ShieldHeart"
    },
    {
      id: "reason-7",
      title: "The way you make ordinary days special.",
      subtitle: "Even just sitting quietly next to you feels like magic.",
      icon: "Sun"
    },
    {
      id: "reason-8",
      title: "Simply because you're YOU. ❤️",
      subtitle: "I wouldn't change a single thing about you.",
      icon: "Crown"
    }
  ],
  timeline: [
    {
      phase: "Then",
      title: "We met.",
      description: "A regular day that turned out to be the start of something truly magical.",
      badge: "The Beginning ✨"
    },
    {
      phase: "Then",
      title: "We started talking.",
      description: "Hours felt like minutes as we shared stories, thoughts, and endless laughter.",
      badge: "First Spark 💬"
    },
    {
      phase: "Then",
      title: "We created our first memories.",
      description: "Every coffee run, late night chat, and shared smile became a treasure.",
      badge: "Unforgettable 📸"
    },
    {
      phase: "Then",
      title: "We became closer.",
      description: "Finding peace, trust, and our favorite safe place in each other.",
      badge: "Closer Than Ever 🤍"
    },
    {
      phase: "Now",
      title: "You mean so much to me.",
      description: "My favorite person, my greatest comfort, and my brightest light.",
      badge: "Present Day ❤️"
    },
    {
      phase: "Next",
      title: "More memories, more laughs, more love. ❤️",
      description: "A lifetime of adventures, cozy mornings, and endless love ahead.",
      badge: "Forever & Always ♾️"
    }
  ],
  musicUrl: ""
};
