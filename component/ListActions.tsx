import { Edit3, Trash2 } from "lucide-react";

export const ListActions = ({ onEdit, onDelete }: any) => (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <button
            onClick={onEdit}
            className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors"
        >
            <Edit3 size={18} />
        </button>
        <button
            onClick={onDelete}
            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
        >
            <Trash2 size={18} />
        </button>
    </div>
);
