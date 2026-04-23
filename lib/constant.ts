import { Briefcase, FolderGit2, Home, Trophy } from "lucide-react";

export const workFallbackImage = "/image/fallback/work.png";
export const studyFallbackImage = "/image/fallback/study.jpeg";
export const officeFallbackImage = "/image/fallback/office.jpg";

export const githubProfile = "https://github.com/u3527338";
export const linkedInProfile = "https://www.linkedin.com/in/eric-cksiu";
export const gmail = "u3527338@gmail.com";

export const personalImage = "";
export const url = process.env.NEXT_PUBLIC_BASE_URL;

export const NAV_ITEMS = [
    { id: "home", href: "/", icon: Home },
    { id: "skills", href: "/skills", icon: Trophy },
    { id: "projects", href: "/projects", icon: FolderGit2 },
    { id: "experience", href: "/experience", icon: Briefcase },
];

export const projectCategory = [
    { label: "Work", value: "work" },
    { label: "Self Learning", value: "self_learning" },
];

export const skillCategory = [
    { label: "Frontend Mastery", value: "frontend_mastery" },
    { label: "Backend & Real-time", value: "backend_real-time" },
    { label: "Database & DevOps", value: "database_devops" },
    { label: "Business Automation", value: "business_automation" },
];
