import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 mix-blend-difference text-white"
    >
      <div className="text-2xl font-display font-bold tracking-widest">
        JOTAEMI<span className="text-gray-500">.</span>DEV
      </div>
      <ul className="hidden md:flex space-x-8 text-sm font-semibold tracking-wider uppercase">
        {['Work', 'About', 'Contact'].map((item) => (
          <li key={item} className="cursor-pointer hover:text-gray-400 transition-colors relative group">
             <a href={`#${item.toLowerCase()}`}>{item}</a>
             <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;