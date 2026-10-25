import PROFILE from "./profile.json";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
] as const;

export const PORTFOLIO = {
  name: PROFILE.name,
  role: PROFILE.role,
  email: PROFILE.email,
  phone: PROFILE.phone,
  location: PROFILE.location,
  cv: "/Kevin_Mercado_CV.pdf",
  social: [
    { label: "GitHub", url: "https://github.com/ultrakevin143" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mercado-kevin-5957713b2/" },
    { label: "Facebook", url: "https://www.facebook.com/osaka.kun.90" },
  ],
} as const;

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  tech: string[];
  image: string;
  imageAlt: string;
  url: string;
  host: string;
  stage: "herbalStage" | "pormaStage" | "digicamStage" | "fcfsStage";
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "herbalai", title: "HerbalAI", category: "Capstone thesis project · Full-stack platform",
    description: "Capstone thesis project: A Philippine medicinal-plant library with a source-grounded AI assistant and community features.",
    summary: "A Philippine medicinal-plant library with a source-grounded AI assistant.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Gemini AI"],
    image: "/projects/herbalai.webp",
    imageAlt: "The live HerbalAI homepage, showing its Philippine medicinal-plant library and educational Dr. Ai assistant.",
    url: "https://www.herbalai.site/", host: "herbalai.site", stage: "herbalStage",
  },
  {
    id: "porma-studio", title: "Porma Studio", category: "Side project · Photo & print tools",
    description: "Side project: A browser-based ID photo editor for fitting formal attire and creating print-ready sheets, with processing kept on your device.",
    summary: "An ID photo editor for formal attire and print-ready sheets, with processing kept on your device.",
    tech: ["React", "TypeScript", "Vite", "PWA"],
    image: "/projects/porma-studio.webp",
    imageAlt: "The live Porma Studio photo editor and print-sheet preview. The example portrait is labeled as an AI-generated demo.",
    url: "https://porma-studio.vercel.app/", host: "porma-studio.vercel.app", stage: "pormaStage",
  },
  {
    id: "digicam", title: "Digicam", category: "Side project · Android beta & web edition",
    description: "Side project: A nostalgic camera and photo editor with film-inspired looks and local projects, available as an Android beta and web edition.",
    summary: "A pocket camera and photo editor with film-inspired looks, for Android and the web.",
    tech: ["Flutter", "Kotlin", "CameraX"],
    image: "/projects/digicam.webp",
    imageAlt: "The live Digicam website showing its pocket-camera interface and clearly labeled sample photography.",
    url: "https://digicam-pocket.vercel.app/", host: "digicam-pocket.vercel.app", stage: "digicamStage",
  },
  {
    id: "fcfs-sim", title: "FCFS Scheduler", category: "School project · Scheduling visualizer",
    description: "School project: A process scheduling visualizer demonstrating First-Come-First-Serve algorithms with real-time Gantt charts.",
    summary: "A First-Come-First-Serve scheduling visualizer with real-time Gantt charts.",
    tech: ["Next.js", "React", "Tailwind"],
    image: "/fcfs.jpg",
    imageAlt: "FCFS Scheduler showing a process input stream, execution timeline, and scheduling results.",
    url: "https://fcfs-nine.vercel.app/", host: "fcfs-nine.vercel.app", stage: "fcfsStage",
  },
];
