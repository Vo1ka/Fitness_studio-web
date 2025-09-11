export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {/* Тут может быть гостевой header/навигация */}
            {children}
        </div>
    );
}
