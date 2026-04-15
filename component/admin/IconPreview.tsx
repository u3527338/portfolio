import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { HelpCircle } from "lucide-react";

export const IconPreview = ({ iconName, size = 24 }: { iconName: string; size?: number }) => {
  const getIcon = (name: string) => {
    if (!name) return null;
    if (name.startsWith("Si")) return (SiIcons as any)[name];
    if (name.startsWith("Fa")) return (FaIcons as any)[name];
    if (name.startsWith("Ai")) return (AiIcons as any)[name];
    return null;
  };

  const IconComponent = getIcon(iconName);

  if (!IconComponent) {
    return <HelpCircle size={size} className="text-slate-600" />;
  }

  return <IconComponent size={size} />;
};