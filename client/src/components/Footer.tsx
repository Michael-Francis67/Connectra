import {FaTwitter, FaFacebook, FaLinkedin, FaInstagram} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="w-full px-8 py-4 mt-20 border-t border-muted flex items-center gap-4 bg-blue-800 text-white justify-between">
            <p className="text-sm font-light text-muted-foreground">
                Copyright &copy; 2023 Connectra. All rights reserved.
            </p>

            <div className="flex justify-center items-center gap-4">
                <p>About</p>
                <p>Privacy and Policy</p>
                <p>Terms of Service</p>
                <p>Contact Us</p>
            </div>

            <div className="flex justify-center items-center gap-4">
                <FaTwitter className="w-5 h-5" />
                <FaFacebook className="w-5 h-5" />
                <FaLinkedin className="w-5 h-5" />
                <FaInstagram className="w-5 h-5" />
            </div>
        </div>
    );
};

export default Footer;
