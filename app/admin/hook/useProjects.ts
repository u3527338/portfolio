import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertProject, deleteProject } from "@/app/admin/actions/project";

export function useProjects(initialData?: any[]) {
    const queryClient = useQueryClient();

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await fetch("/api/projects");
            return res.json();
        },
        initialData,
    });

    const upsertMutation = useMutation({
        mutationFn: async ({ data, file }: { data: any; file?: File | null }) => {
            return upsertProject(data, file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        projects,
        isLoading,
        isPending: upsertMutation.isPending,
        upsert: upsertMutation.mutateAsync,
        remove: (id: string) => deleteProject(id).then(() => queryClient.invalidateQueries({ queryKey: ["projects"] })),
    };
}