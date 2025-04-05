import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-700 to-blue-700 text-white py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <motion.h4
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Stay Connected
            </motion.h4>
            <div className="flex justify-center md:justify-start space-x-8">
              <motion.a
                href="https://github.com"
                target="_blank"
                className="hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Github className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Twitter className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Linkedin className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                className="hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Instagram className="w-8 h-8" />
              </motion.a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end space-x-8 mt-8 md:mt-0">
            <motion.a
              href="#"
              className="text-lg hover:text-gray-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-lg hover:text-gray-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-lg hover:text-gray-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
