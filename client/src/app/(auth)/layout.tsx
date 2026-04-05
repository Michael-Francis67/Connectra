import AppLogo from "@/components/AppLogo";
import React from "react";

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-3 overflow-auto px-4 py-8">
            <AppLogo />
            {children}
        </div>
    );
};

export default AuthLayout;
