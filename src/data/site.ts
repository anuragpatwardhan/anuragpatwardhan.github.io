export const site = {
  name: "Anurag Patwardhan",
  title: "ANURAG.DEV",
  role: "Full-Stack Software Dev & Product Designer",
  location: "Boston",
  email: "patwardhan.an@northeastern.edu",
  phone: "+1 (857) 426 4288",
  links: {
    github: "https://github.com/anuragpatwardhan",
    linkedin: "https://www.linkedin.com/in/anuragpatwardhan/",
    instagram: "https://www.instagram.com/",
    calendly: "https://calendly.com/anuragpatwardhan",
    medium: "https://medium.com/@anuragpatwardhan",
    linkedinArticles: "https://www.linkedin.com/in/anuragpatwardhan/recent-activity/articles/",
  },
};

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Awards", href: "/awards" },
  { label: "Contact", href: "/contact" },
];

const F = "/images/framer";

export const highlights = [
  { name: "Syncspace", subtitle: "Real-Time Collaboration Platform",   image: `${F}/Gnud6kEeH5LqtjY2UTnA7dw.jpg`,           slug: null },
  { name: "PulseIQ",   subtitle: "KPI Monitoring & Forecasting System", image: `${F}/4440doxTZiDmWK8ISNhCuT2O3EU.jpg`,      slug: "pulseiq" },
  { name: "HuskyAI",   subtitle: "University Support Platform",         image: `${F}/5edTIs0ZbSRO53PN7jildnb5474.jpg`,      slug: null },
];

export const projects = [
  { name: "OpsCanvas",   tags: "PRODUCT, ENGINEERING",     image: `${F}/EbVTwBl2zlrq59jCraQRfnBJ5w.jpg`, slug: "opscanvas" },
  { name: "InsightFlow", tags: "DATA, FULL-STACK",         image: `${F}/SeHCjIgw4p9tEWYF6WQnDflHm4.png`, slug: "insightflow" },
  { name: "Husky AI",    tags: "UI DESIGN, DEVELOPMENT",   image: `${F}/J5hUuVSmRNsB2heOQvu8E8BBIE.webp`, slug: null },
  { name: "Pulse IQ",    tags: "DATA, SYSTEMS",            image: `${F}/EmYkJ0GAsJLRjpzNmsG8YUrzwRI.jpg`, slug: "pulseiq" },
];

export const images = {
  portrait:    `/images/portrait.jpeg`,
  profile:     `${F}/IQ32aylUcBaWdL1gx06DJoLZZM.jpeg`,
  aboutDesk:   `/images/photo.jpeg`,
  boston:      `${F}/hivzsx6GcSuG1Z9oUITmYHpdoW8.jpg`,
  heroOverlay: `${F}/JGg5KjTeGFwN7ZTVdwXdIpA13No.png`,
  codeBanner:  `${F}/wX1i3zP7gVYfF74iIUMpitW2OU.png`,
};

export const techIcons = [
  { name: "Javascript", src: `${F}/z1kAPd5M6VIM53qPpRFdCj6s.svg` },
  { name: "NextJS",     src: `${F}/pU1kltsoJB9R0LjTGsQLjMxtE.svg` },
  { name: "ReactJS",    src: `${F}/AKMGYYaRXLylckQkJvtOH6M7nk.svg` },
  { name: "TypeScript", src: `${F}/2d4VbBu85lu7yEmxTre5UeNhBGM.svg` },
  { name: "Github",     src: `${F}/8GQTAEbeIGauLuv5XTh4vrNM0.svg` },
  { name: "Gatsby",     src: `${F}/CKE5T0V43lc7PnJ5Yx1RyUcTas.svg` },
  { name: "VS Code",    src: `${F}/dLAfRH3Slyn3ANjAFyjTm0K924.svg` },
  { name: "Notion",     src: `${F}/1nW17nUPjHloZ88bSdAvYlA7c.svg` },
];

export const skills = [
  "Java", "JavaScript", "TypeScript", "C#", ".NET Framework",
  "SQL", "MongoDB", "Python", "C++", "Angular",
  "React", "SpringBoot", "Hibernate", "LangChain",
];

export const competencies = ["Frontend", "UI/UX", "Backend", "Database"];

export const experience = [
  { role: "Full-Stack Developer", company: "Flex", dates: "Feb 2023 to Aug 2025" },
  { role: "R&D Associate, Intern", company: "ECode", dates: "Jan 2018 to Jan 2020" },
  { role: "QA Engineer", company: "GlobalStep LLC", dates: "Oct 2022 to Dec 2022" },
];

export const testimonials = [
  {
    quote:
      "Anurag is a dependable full stack developer who significantly improved our system performance. His command of Angular, C# .NET, and SQL is impressive.",
    name: "Sathish Janakiraman",
    title: "Product Designer @flex",
  },
  {
    quote:
      "Anurag single-handedly managed and delivered our entire project as a QA Engineer, well beyond what was expected. Exceptional ownership, communication, and attention to detail throughout.",
    name: "Barkat Khetani",
    title: "Project Manager @Globalstep",
  },
  {
    quote:
      "Anurag's SQL optimization caught bottlenecks the rest of us missed. His Angular migration work was thorough and well-documented. Great developer to have on any team.",
    name: "Amruta Palande",
    title: "Senior Developer @flex",
  },
];

export const awards = [
  {
    year: "2024",
    name: "Flex Lyve Award",
    desc: "Awarded for excellence in web-app optimisation, showcasing my talent in enhancing user experience.",
  },
  {
    year: "2023",
    name: "Flex Bounty",
    desc: "Recognized for outstanding work in a community coding competition, highlighting innovation.",
  },
  {
    year: "2023",
    name: "Epurge Optimization",
    desc: "Recognized for database enhancement work that significantly improved query performance.",
  },
  {
    year: "2023",
    name: "Epurge Migration",
    desc: "Recognized for leading framework migration that modernized the application stack.",
  },
];
