import Providers from "@/providers/providers";
import "./globals.css";

export const metadata = {
    title: "Fitness Studio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
