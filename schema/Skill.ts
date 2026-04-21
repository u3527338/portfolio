import z from "zod";

export const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    iconName: z.string().min(1, "Icon name is required"),
    category: z.enum([
        "Frontend Mastery",
        "Backend & Real-time",
        "Database & DevOps",
        "Business Automation",
    ]),
    level: z.number().min(0).max(100),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
