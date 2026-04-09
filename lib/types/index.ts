import { ReactNode } from "react";

// --- 技能相關 (Skills) ---
export interface Skill {
  name: string;
  level: number;
  iconName: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

// --- 經歷相關 (Experience) ---
export interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string; // ISO 格式 "YYYY-MM-DD"
  endDate: string | null;
  isCurrent: boolean;
  shortDesc: string;
  bgImage: string; // 圖片路徑字串
}

// --- 作品集相關 (Project) ---
export interface Project {
  _id: string;
  title: string;
  category: string;
  type: string;
  source?: string;
  size: "large" | "small";
  image: string;
  tech: string[];
}

// --- 通用型別 ---
export type IconMapType = {
  [key: string]: ReactNode;
};
