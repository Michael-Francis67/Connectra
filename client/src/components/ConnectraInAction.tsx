import Image from "next/image";
import React from "react";

const ConnectraInAction = () => {
    return (
        <div className="py-8 w-full flex flex-col items-center gap-4 mt-20">
            <h2 className="text-3xl font-bold">See Connectra in Action</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl">
                See how Connectra brings people together with its intuitive interface and powerful features.
            </p>
            <Image
                src={"/assets/image1.jpeg"}
                alt="Connectra in action"
                width={1200}
                height={300}
                className="rounded-lg w-auto h-auto object-cover mt-8"
            />
        </div>
    );
};

export default ConnectraInAction;
