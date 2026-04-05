import {features} from "@/lib/constants";
import React from "react";

const KeyFeatures = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-3 mt-12">
            <h2 className="text-3xl font-semibold">Key Features</h2>
            <p className="text-sm text-muted-foreground text-center max-w-2xl">
                Connectra offers a range of powerful features designed to enhance your communication experience. From
                real-time messaging to secure encryption, our platform is built to keep you connected with your friends
                and teams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4">
                        <feature.icon className="w-12 h-12 text-primary mb-2" />
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeyFeatures;
