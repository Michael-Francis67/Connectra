import React from "react";
import Image from "next/image";
import Link from "next/link";

const AppLogo = () => {
    return (
        <Link href="/" className="flex justify-center items-center gap-2">
            <Image src={"/assets/logo.svg"} alt="Connectra logo" width={32} height={32} className="rounded-full" />
            <span className="text-xl font-bold text-primary hidden md:block">Connectra</span>
        </Link>
    );
};

export default AppLogo;
