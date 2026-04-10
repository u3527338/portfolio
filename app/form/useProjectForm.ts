import { useState, useEffect } from "react";

export function useProjectForm() {
  const [loading, setLoading] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "Work",
    source: "",
    tech: [] as string[],
    description: "",
  });

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        const flat = data.flatMap((g: any) => g.skills.map((s: any) => s.name));
        setAvailableSkills(flat);
      });
  }, []);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const toggleSkill = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.includes(name)
        ? prev.tech.filter((t) => t !== name)
        : [...prev.tech, name],
    }));
  };

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    availableSkills,
    selectedFile,
    imagePreview,
    handleFileChange,
    toggleSkill,
  };
}
