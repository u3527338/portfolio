import { ReactNode } from "react";

export interface Skill {
    name: string;
    level: number;
    iconName: string;
}

export interface SkillGroup {
    category: string;
    skills: Skill[];
}

export interface Experience {
    _id: string;
    title: string;
    company: string;
    abbrev: string;
    location: string;
    fromDate: string;
    toDate?: string;
    isCurrent: boolean;
    shortDesc: string;
    bgImage: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Project {
    _id: string;
    title: string;
    category: string;
    type: string;
    source?: string;
    experienceId?: string;
    size: "large" | "small";
    image: string;
    tech: string[];
    experience?: Experience;
    techDetails?: Skill[];
    github?: string;
    link?: string;
}

export type IconMapType = {
    [key: string]: ReactNode;
};
