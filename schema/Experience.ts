import z from "zod";

export const experienceSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    abbrev: z.string().min(1, "Abbrev required").max(15),
    location: z.string().min(1, "Location is required"),
    fromDate: z.string().min(1, "Start date required"),
    toDate: z.string(),
    isCurrent: z.boolean(),
    shortDesc: z.string(),
    bgImage: z.string(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
