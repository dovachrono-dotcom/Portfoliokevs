import { FEATURED_PROJECTS } from "./portfolio";
import PROFILE from "./profile.json";

export const RESUME_DATA = {
  profile: {
    name: PROFILE.name,
    role: PROFILE.role,
    bio: PROFILE.summary,
    about: PROFILE.about,
    approach: PROFILE.approach,
    interests: PROFILE.interests,
    leadership: PROFILE.leadership,
    avatar: "/portraits/kevin-light.png",
    social: [
      { label: "GitHub", url: "https://github.com/ultrakevin143" },
      { label: "Facebook", url: "https://www.facebook.com/osaka.kun.90" }
    ]
  },
  education: PROFILE.education,
  skillGroups: PROFILE.skillGroups,
  otherSkills: PROFILE.otherSkills,
  experience: [
    {
      id: "job-1",
      role: PROFILE.experience.role,
      company: PROFILE.experience.company,
      date: PROFILE.experience.period,
      description: PROFILE.experience.description,
      imageUrl: "/virt.jpg"
    },
  ],
  projects: FEATURED_PROJECTS.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      tech: project.tech,
      imageUrl: project.image,
      projectUrl: project.url,
    })),
  certificates: [
    {
      name: "Creative Web Design",
      issuer: "TESDA",
      date: "June 8, 2024",
      imageUrl: "/cert.jpg",
      certificateUrl: "/cert.jpg",
      fullCertificateUrl: "/cert.jpg"
    },
    {
      name: "Cookery NC II",
      issuer: "TESDA",
      date: "March 3, 2024",
      imageUrl: "/nc.jpg",
      certificateUrl: "/nc.jpg",
      fullCertificateUrl: "/nc.jpg"
    }
  ]
};
