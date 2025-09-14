import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Header />
            <main className="flex-grow">{children}</main>
        <Footer></Footer>
        </>
    );
}
