import { deleteSkill, upsertSkill } from "@/src/actions/skill";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSkills(initialData?: any[]) {
    const queryClient = useQueryClient();

    const { data: groups = [], isLoading } = useQuery({
        queryKey: ["skills"],
        queryFn: async () => {
            const res = await fetch("/api/skills");
            if (!res.ok) throw new Error("Failed to fetch skills");
            return res.json();
        },
        initialData,
    });

    const upsertMutation = useMutation({
        mutationFn: async ({ data, id }: { data: any; id?: string | null }) => {
            return upsertSkill(data, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });

    return {
        groups,
        isLoading,
        isPending: upsertMutation.isPending || deleteMutation.isPending,
        upsert: upsertMutation.mutateAsync,
        remove: deleteMutation.mutateAsync,
    };
}
