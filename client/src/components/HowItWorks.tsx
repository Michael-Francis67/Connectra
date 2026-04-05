import React from "react";

const HowItWorks = () => {
    return (
        <div className="mt-20">
            <h2 className="text-3xl font-bold text-center">How It Works</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mt-4">
                Connectra is designed to be simple and intuitive. Here&apos;s how it works:
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center">
                        1
                    </div>
                    <h3 className="text-lg font-semibold">Create an Account</h3>
                    <p className="text-sm text-muted-foreground text-center">
                        Sign up for a Connectra account to start connecting with your friends and teams.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center">
                        2
                    </div>
                    <h3 className="text-lg font-semibold">Connect with Friends and Teams</h3>
                    <p className="text-sm text-muted-foreground text-center">
                        Start chatting with your friends and teams using Connectra&apos;s secure messaging system.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center">
                        3
                    </div>
                    <h3 className="text-lg font-semibold">Send and Receive Messages</h3>
                    <p className="text-sm text-muted-foreground text-center">
                        Send messages, share files, and create group chats to stay connected with your contacts.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center">
                        4
                    </div>
                    <h3 className="text-lg font-semibold">Stay Connected</h3>
                    <p className="text-sm text-muted-foreground text-center">
                        Connectra keeps you connected with your friends and teams, even when you&apos;re not online.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
