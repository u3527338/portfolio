import z from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    category: z.string().min(1, "Category is required"),
    type: z.string().min(1),
    experienceId: z.string().optional().or(z.literal("")),
    tech: z.array(z.string()),
    description: z.string(),
    githubLink: z.string().url().optional().or(z.literal("")),
    referenceLink: z.string().url().optional().or(z.literal("")),
    image: z.string(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
