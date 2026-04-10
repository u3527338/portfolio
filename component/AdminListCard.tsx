export const AdminListCard = ({
    image,
    title,
    subtitle,
    children,
    actions,
}: any) => (
    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl group border border-transparent hover:border-white/10 transition-all">
        <div className="flex items-center gap-4">
            {image && (
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                    {image}
                </div>
            )}
            <div>
                <h4 className="font-bold">{title}</h4>
                {subtitle && (
                    <p className="text-slate-400 text-xs mt-1">{subtitle}</p>
                )}
                {children}
            </div>
        </div>
        {actions}
    </div>
);
