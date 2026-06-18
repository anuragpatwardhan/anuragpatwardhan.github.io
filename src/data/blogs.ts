export type Blog = {
  slug: string;            // used for /blogs/[slug]; ignored when external is set
  title: string;
  excerpt: string;
  date: string;            // "Mar 2026" or similar
  readTime: string;        // "5 min read"
  tags: string[];
  external?: string;       // if set, the card links out instead of opening an internal page
  body?: string;           // markdown-ish content for internal expand
};

// Sample posts. Replace title, excerpt, body, date with your real writing whenever you want.
export const blogs: Blog[] = [
  {
    slug: "shipping-without-a-dashboard",
    title: "Shipping without a dashboard",
    excerpt:
      "Why I keep building decision-support tools instead of yet another chart grid, and what that means for the people using them.",
    date: "Mar 2026",
    readTime: "6 min read",
    tags: ["Product", "Data"],
    body: `
I have spent too many hours staring at dashboards that answered the wrong question.

The shift that worked for me was simple: stop showing what changed, start explaining why. That sentence sounds obvious until you try to ship it. Designing for explanation forces you to confront the messy parts of your data, the things you cannot wave away with a chart axis.

This is the long form of the idea behind InsightFlow and PulseIQ. Both started as "we need a dashboard" and ended up as "we need a feed of decisions." That reframing changed everything about how I model data, write copy, and pick what to ignore.

More to come. This is a placeholder body that you can fully replace.
`,
  },
  {
    slug: "the-interpretation-gap",
    title: "The interpretation gap",
    excerpt:
      "Most analytics tools stop one step short of being useful. Here is what bridging that last step actually looks like in code.",
    date: "Feb 2026",
    readTime: "8 min read",
    tags: ["Engineering", "Analytics"],
    body: `
This is a placeholder body. Replace this with your actual writing. The point of the post is to walk through the engineering side of turning raw metric streams into narrative explanations: schema design, change detection thresholds, narrative templating, and the small decisions that make the difference between trustworthy and noisy.
`,
  },
  {
    title: "From Pune to Boston, six months in",
    excerpt: "Field notes from my first semester at Northeastern. Cold weather, warm community, expensive coffee.",
    date: "Jan 2026",
    readTime: "4 min read",
    tags: ["Personal", "Boston"],
    slug: "pune-to-boston",
    body: `
Placeholder. Drop your real reflection in here. Or delete this card.
`,
  },
  {
    title: "A short note on accessibility I keep forgetting",
    excerpt:
      "WCAG focus indicators are not optional. Here is a 60-second pattern I now apply to every project I build.",
    date: "Nov 2025",
    readTime: "3 min read",
    tags: ["A11y", "Frontend"],
    external: "https://medium.com/@anuragpatwardhan",
    slug: "accessibility-focus",
  },
];
