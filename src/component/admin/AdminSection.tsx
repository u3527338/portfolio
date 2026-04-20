export const AdminSection = ({
    title,
    form,
    list,
}: {
    title: string;
    form: React.ReactNode;
    list: React.ReactNode;
}) => {
    return <div className="space-y-12">
        <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/10">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
            </h2>
            {form}
        </div>
        <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/10">
            <h3 className="text-xl font-bold mb-6 italic opacity-50">
                Management List
            </h3>
            {list}
        </div>
    </div>
};
