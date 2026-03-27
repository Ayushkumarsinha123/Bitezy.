import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

const CTA = () => {
  const navigate = useNavigate(); 

  return (
    <section className="py-24 bg-neutral-950 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-gradient-to-br from-orange-600 to-red-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">Hungry? Start scrolling now.</h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto relative z-10">Join thousands of foodies discovering their next favorite meal through Bitezy.</p>
        
        <button 
          onClick={() => navigate('/signup')} 
          className="relative z-10 bg-white text-red-600 px-10 py-5 rounded-full font-black text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
        >
          Open Bitezy App
        </button>

      </motion.div>
    </section>
  );
};

export default CTA; 