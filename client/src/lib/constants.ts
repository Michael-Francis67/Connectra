import {
    DatabaseIcon,
    FileIcon,
    MessageCircleIcon,
    ShieldCheckIcon,
    ShieldIcon,
    ShieldPlusIcon,
    UsersIcon,
} from "lucide-react";

export const NAV = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Chat",
        href: "/chat",
    },
    {
        name: "Group",
        href: "/group",
    },
    {
        name: "Profile",
        href: "/profile",
    },
    {
        name: "Settings",
        href: "/settings",
    },
];

export const features = [
    {
        icon: MessageCircleIcon,
        title: "Real-time Messaging",
        description:
            "Experience seamless communication with our real-time messaging feature, allowing you to chat instantly with friends and teams.",
    },
    {
        icon: ShieldIcon,
        title: "Secure Encryption",
        description:
            "Your privacy is our priority. Connectra uses end-to-end encryption to ensure that your conversations remain secure and private.",
    },
    {
        icon: UsersIcon,
        title: "Group Chats",
        description:
            "Create and manage group chats with ease, allowing you to communicate with multiple people at once.",
    },
    {
        icon: FileIcon,
        title: "File Sharing",
        description: "Easily share files with your contacts and groups, supporting various file types and sizes.",
    },
];

export const connectraFor = [
    {
        image: "/assets/teams.jpg",
        title: "For Teams",
    },
    {
        image: "/assets/friends.jpg",
        title: "For Friends",
    },
    {
        image: "/assets/collaborations.jpg",
        title: "For Communities",
    },
];

export const privacy = [
    {
        icon: ShieldCheckIcon,
        title: "Secure & Private",
        description:
            "Connectra uses end-to-end encryption to ensure that your conversations remain private and secure. Your data is never shared with third parties, and you have full control over your information.",
    },
    {
        icon: DatabaseIcon,
        title: "Data Protection",
        description:
            "We take data protection seriously. Connectra is built with robust security measures to safeguard your information and ensure that it remains confidential.",
    },
    {
        icon: ShieldPlusIcon,
        title: "Always Encrypted",
        description:
            "Your messages and files are always encrypted, both in transit and at rest, ensuring that only you and your intended recipients can access them.",
    },
];
