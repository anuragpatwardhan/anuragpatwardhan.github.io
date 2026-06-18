export type Interest = {
  title: string;
  tagline: string;
  body: string;
  tags: string[];
  accent: string;
};

export const personalIntro = {
  title: "Off the clock",
  tagline:
    "The non-technical side of me. Things I do when I'm not shipping code or reading docs.",
  pitch:
    "I think great engineers tend to be curious about more than just engineering. Below are the things that keep me grounded and recharged outside of work.",
};

// Placeholder content. Swap titles and body text whenever you want.
export const interests: Interest[] = [
  {
    title: "Photography",
    tagline: "Quiet moments, mostly Boston",
    body:
      "I carry a camera around Boston and the campuses I work out of. Sunrise on the Charles, side streets in Cambridge, late-night editing sessions. I also help shoot Northeastern events on the side.",
    tags: ["Street", "Travel", "Event"],
    accent: "#f4e87a",
  },
  {
    title: "Sports & Intramurals",
    tagline: "On the field, on the whistle",
    body:
      "I officiate intramural games at Northeastern. Off-campus I play pickup whenever I can find a court. Sports keep my decision-making sharp in ways that desk work cannot.",
    tags: ["Officiating", "Pickup", "Fitness"],
    accent: "#d8ff3a",
  },
  {
    title: "Travel & Boston",
    tagline: "Exploring my new city, one neighborhood at a time",
    body:
      "Moving from India to Boston was its own software upgrade. I spend weekends walking new neighborhoods, riding the T to its end stations, and trying every cafe that opens within a mile of campus.",
    tags: ["Boston", "Walks", "Cafés"],
    accent: "#ff7676",
  },
  {
    title: "Music · Reading · Coffee",
    tagline: "The slow loop",
    body:
      "Music keeps me in flow. Books I actually finish: anything by Atul Gawande, the Stripe Press shelf, the occasional sci-fi. Coffee is part of the workflow, not a hobby. Pourover at home, espresso when I'm in the wild.",
    tags: ["Lo-fi", "Non-fiction", "Pour-over"],
    accent: "#9aa0ff",
  },
];

export const communitySnapshot = [
  "Northeastern Data Club — active member",
  "Husky Systers Code — member",
  "Northeastern Events — photography & on-site volunteer",
];
