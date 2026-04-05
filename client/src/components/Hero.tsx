import Link from "next/link";
import {Button} from "./ui/button";
import Image from "next/image";

const Hero = () => {
    return (
        <div>
            <div className="w-full h-[70vh] flex flex-col md:flex-row md:justify-around justify-center items-center">
                <div className="space-y-3 block">
                    <div className="space-y-1">
                        <h1 className="text-5xl font-semibold">Connect Instantly.</h1>
                        <h2 className="text-5xl font-semibold">Chat Smarter.</h2>
                    </div>

                    <p className="text-sm font-semibold">
                        The best way to stay connected with <br /> your friends and teams.
                    </p>

                    <div className="flex">
                        <Link href={"/chat"}>
                            <Button>Get Started</Button>
                        </Link>
                        <Link href={"/sign-in"}>
                            <Button
                                variant="outline"
                                className="ml-2 border-primary text-primary hover:bg-primary/10 transition duration-200"
                            >
                                Log In
                            </Button>
                        </Link>
                    </div>
                </div>

                <Image
                    src={"/assets/image2.jpeg"}
                    alt="Hero image"
                    width={500}
                    height={500}
                    className="rounded-lg w-auto h-auto"
                />
            </div>
        </div>
    );
};

export default Hero;
