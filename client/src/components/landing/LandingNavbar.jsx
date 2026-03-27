import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

const LandingNavbar = () => {
  const navigate = useNavigate(); 

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')} 
          className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent cursor-pointer"
        >
          Bitezy
        </motion.div>

        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Explore</a>
          <a href="#" className="hover:text-white transition-colors">Restaurants</a>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/login')} 
            className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Login
          </button>
          
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-shadow"
          >
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
};

export default LandingNavbar;