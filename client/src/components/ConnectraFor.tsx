import {connectraFor} from "@/lib/constants";
import Image from "next/image";
import React from "react";

const ConnectraFor = () => {
    return (
        <div className="mt-20 w-full flex flex-col items-center gap-4">
            <h2 className="text-3xl font-semibold text-center">Who is Connectra For?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectraFor.map((item, index) => (
                    <div key={index} className="w-full flex flex-col justify-center items-center">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={300}
                            height={300}
                            className="rounded-lg size-80 object-cover"
                        />
                        <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConnectraFor;
