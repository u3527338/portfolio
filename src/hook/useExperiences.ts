import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertExperience, deleteExperience } from "@/src/actions/experience";

export function useExperiences(initialData?: any[]) {
    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({
        queryKey: ["experiences"],
        queryFn: async () => {
            const res = await fetch("/api/experiences");
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
        initialData,
    });

    const upsertMutation = useMutation({
        mutationFn: async ({ data, file }: { data: any; file?: File | null }) => {
            return upsertExperience(data, file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["experiences"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["experiences"] });
        },
    });

    return {
        exps: data,
        isLoading,
        isPending: upsertMutation.isPending || deleteMutation.isPending,
        upsert: upsertMutation.mutateAsync,
        remove: deleteMutation.mutateAsync,
    };
}