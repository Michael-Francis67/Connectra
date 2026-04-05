import type {Metadata} from "next";
import {Sanchez, Noto_Sans, Ubuntu} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "sonner";

const sanchez = Sanchez({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400"],
});
const noto_sans = Noto_Sans({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ubuntu = Ubuntu({
    subsets: ["latin"],
    variable: "--font-ubuntu",
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    title: "Connectra",
    description: "A modern, open-source, self-hosted chat application built with Next.js and TypeScript.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider
            appearance={{
                elements: {
                    formButtonPrimary: {
                        backgroundColor: "#193cb8",
                        color: "white",
                        border: "none",
                        outline: "none",
                        borderColor: "transparent",
                        "&:hover": {backgroundColor: "#193cb8"},
                        borderRadius: "8px",
                    },
                },
            }}
        >
            <html
                lang="en"
                className={`${sanchez.variable} ${noto_sans.variable} ${ubuntu.variable} h-full antialiased`}
                suppressHydrationWarning
            >
                <body className="min-h-full flex flex-col">
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
