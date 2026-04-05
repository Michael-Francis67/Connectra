import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="h-full max-w-7xl mx-auto w-full p-4 my-20">{children}</main>
            <Footer />
        </div>
    );
};

export default RootLayout;
