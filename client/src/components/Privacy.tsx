import {privacy} from "@/lib/constants";
import React from "react";

const Privacy = () => {
    return (
        <div className="mt-30 w-full flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold text-center">Your Privacy Matters</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mt-4">
                At Connectra, we take your privacy and security seriously. We use end-to-end encryption to ensure that
                your conversations remain private and secure. Your data is never shared with third parties, and you have
                full control over your information.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {privacy.map((item, index) => (
                    <div key={index} className="flex items-center flex-col gap-4 mt-4">
                        <item.icon className="w-12 h-12 text-primary" />
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Privacy;
