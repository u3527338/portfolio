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
  fromDate: string; // 對應後端數據
  toDate: string | null; // 對應後端數據
  isCurrent: boolean;
  shortDesc: string;
  bgImage: string;
  createdAt?: string;
  updatedAt?: string;
}

// --- 作品集相關 (Project) ---
export interface Project {
  _id: string;
  title: string;
  category: string;
  type: string;
  source?: string;       // 兼容舊數據 (例如 "HKSTP")
  experienceId?: string; // 關聯 Experience 的 ID
  size: "large" | "small";
  image: string;
  tech: string[];        // 儲存 Skill 的名稱或 Slug (例如 ["NextJS / ReactJS"])
  
  // 以下是可選欄位，用於 API Join 之後存儲豐富的關聯資料
  experience?: Experience;
  techDetails?: Skill[];
  github?: string;
  link?: string;
}


// --- 通用型別 ---
export type IconMapType = {
  [key: string]: ReactNode;
};
