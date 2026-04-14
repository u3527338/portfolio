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

export interface InputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export interface SelectFieldProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: (string | { label: string; value: any })[];
    error?: string;
}

export interface ImageUploadProps {
    preview: string | null;
    onFileChange: (f: File | null) => void;
}

export interface TechStackProps {
    tech: any[];
}

export interface ActionButtonProps {
    href: string;
    icon: ReactNode;
    variant?: "primary" | "secondary";
    title?: string;
}

export interface TreeProps {
    experiences: Experience[];
    activeId: string;
    onHover: (exp: Experience) => void;
}
