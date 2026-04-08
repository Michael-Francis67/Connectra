"use client";

import AppLogo from "./AppLogo";
import {NAV} from "@/lib/constants";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {ModeToggle} from "./ModeToggle";
import {Show, UserButton} from "@clerk/nextjs";
import {PhoneIcon, VideoIcon} from "lucide-react";

const Navbar = () => {
    const location = usePathname();

    return (
        <div className="fixed top-0 left-0 right-0 h-16 w-full z-50 bg-gray-200 shadow-lg backdrop-blur-2xl px-8">
            <div className="w-full max-w-7xl mx-auto h-full flex justify-between items-center">
                <AppLogo />

                <ul className="w-full h-full hidden md:flex justify-center items-center gap-3">
                    {NAV.map((page) => {
                        const currentPage = location.toLowerCase() === page.href;

                        return (
                            <li
                                key={page.name}
                                className={cn(
                                    "text-sm font-semibold hover:text-primary px-2 transition-all duration-200 hover:border-b-2 hover:border-teal-700 scale-3d",
                                    currentPage && "border-b-2 border-primary"
                                )}
                            >
                                <Link href={page.href} className="dark:text-black/80">
                                    {page.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center justify-around gap-3">
                    <ModeToggle />
                    <Show when={"signed-in"}>
                        <UserButton />
                    </Show>
                    <Show when={"signed-in"}>
                        <Link href={"/call-audio"}>
                            <PhoneIcon className="size-5 text-gray-600 hover:text-primary transition-colors duration-200" />
                        </Link>
                    </Show>
                    <Show when={"signed-in"}>
                        <Link href={"/call-video"}>
                            <VideoIcon className="size-5 text-gray-600 hover:text-primary transition-colors duration-200" />
                        </Link>
                    </Show>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
