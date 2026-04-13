export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">{children}</div>
        </div>
    );
}
