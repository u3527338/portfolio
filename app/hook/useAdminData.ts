import { useState, useEffect, useCallback } from "react";

export function useAdminData(apiPath: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        const res = await fetch(apiPath);
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
    }, [apiPath]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const upsert = async (payload: any, id?: string | null) => {
        setLoading(true);
        const method = id ? "PUT" : "POST";
        const url = id ? `${apiPath}/${id}` : apiPath;
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) await fetchData();
        setLoading(false);
        return res.ok;
    };

    const remove = async (id: string) => {
        if (!confirm("Confirm delete?")) return;
        const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
        if (res.ok) await fetchData();
    };

    const uploadImage = async (selectedFile: File, folder: string) => {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        uploadData.append("folder", folder);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
        });
        const { url } = await res.json();
        if (url) return url;
    };

    return { data, loading, upsert, uploadImage, remove, refresh: fetchData };
}
