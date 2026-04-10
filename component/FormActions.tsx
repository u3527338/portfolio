export const FormActions = ({ loading, editingId, onCancel }: any) => (
    <div className="md:col-span-2 flex gap-4">
        <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50"
        >
            {loading
                ? "Processing..."
                : editingId
                ? "Update Item"
                : "Save Item"}
        </button>
        {editingId && (
            <button
                type="button"
                onClick={onCancel}
                className="px-8 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all"
            >
                Cancel
            </button>
        )}
    </div>
);
