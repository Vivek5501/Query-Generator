import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import DataWiseLogo from '/DataWiseLogo.png';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
        <footer className="w-full px-8 py-8 bg-gradient-to-t from-black to-gray-900 text-white shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Logo and Tagline */}
            <div className="flex flex-col items-center md:items-start">
            {/* <img src={DataWiseLogo} alt="DataWise Logo" className="w-32 hover:opacity-90 transition-opacity duration-300" /> */}
            <p className="mt-2 text-sm text-gray-400">Your Trusted Business Analytics Partner</p>
            </div>
            
            {/* Footer Navigation */}
            <nav className="flex space-x-8">
            <button
                onClick={() => navigate("/about")}
                className="text-white font-semibold hover:text-gray-300 transition-colors duration-300"
            >
                About Us
            </button>
            <button
                onClick={() => navigate("/services")}
                className="text-white font-semibold hover:text-gray-300 transition-colors duration-300"
            >
                Services
            </button>
            <button
                onClick={() => navigate("/contact")}
                className="text-white font-semibold hover:text-gray-300 transition-colors duration-300"
            >
                Contact
            </button>
            </nav>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
            <FaFacebookF className="text-white hover:text-gray-400 w-6 h-6 cursor-pointer transition-colors duration-300" />
            <FaTwitter className="text-white hover:text-gray-400 w-6 h-6 cursor-pointer transition-colors duration-300" />
            <FaLinkedinIn className="text-white hover:text-gray-400 w-6 h-6 cursor-pointer transition-colors duration-300" />
            <FaGithub className="text-white hover:text-gray-400 w-6 h-6 cursor-pointer transition-colors duration-300" />
            </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 All Rights Reserved.</p>
            <p className="mt-2">
            <button
                onClick={() => navigate("/privacy-policy")}
                className="hover:text-gray-300 transition-colors duration-300"
            >
                Privacy Policy
            </button>{" "}
            |{" "}
            <button
                onClick={() => navigate("/terms")}
                className="hover:text-gray-300 transition-colors duration-300"
            >
                Terms of Service
            </button>
            </p>
        </div>
        </footer>
    );
};

export default Footer;
