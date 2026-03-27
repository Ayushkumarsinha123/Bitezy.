// src/components/landing/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShoppingBag, Zap } from 'lucide-react';

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const Hero = () => {
  return(
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-neutral-950">
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
  
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center md:text-left pt-12 md:pt-0">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-sm font-medium mb-6">
            <Zap size={16} /> Welcome to the future of food
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Scroll. <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Crave.</span> <br />
            Order.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg mx-auto md:mx-0">
            Discover mouth-watering food through short, addictive videos and get it delivered instantly to your door.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              <ShoppingBag size={20} /> Order Now
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md transition-all">
              <Play size={20} /> Explore Reels
            </button>
          </motion.div>
        </motion.div>
  
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center relative"
        >
          <div className="relative w-[300px] h-[600px] bg-neutral-900 rounded-[3rem] border-8 border-neutral-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Phone Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-neutral-800 w-40 mx-auto rounded-b-3xl z-20" />
            
            
            <motion.div 
              animate={{ y: ["0%", "-33.33%", "-66.66%"] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", repeatType: "reverse" }}
              className="flex flex-col h-[300%]"
            >
              {FOOD_IMAGES.slice(0, 3).map((img, idx) => (
                <div key={idx} className="relative w-full h-[600px]">
                  <img src={img} alt="Food Reel" className="w-full h-full object-cover brightness-75" />
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white font-bold">Chef</div>
                      <span className="text-white font-bold">Awesome Eats</span>
                    </div>
                    <p className="text-white/90 text-sm">This triple cheeseburger is insane! 🍔🔥</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
  
      </div>
    </section>
  )
};

export default Hero;