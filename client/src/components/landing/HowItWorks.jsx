import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section className="py-24 bg-neutral-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-16"
        >
          How <span className="text-orange-500">Bitezy</span> Works
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-orange-500/20 via-red-500/50 to-orange-500/20 -z-0" />
          
          {[
            { step: "1", title: "Watch Food Reels", desc: "Swipe through endless short videos of local, mouth-watering dishes." },
            { step: "2", title: "Like & Save", desc: "Curate your own aesthetic digital menu by liking what makes you hungry." },
            { step: "3", title: "Order Instantly", desc: "One tap adds it to your cart. Hot food arrives at your door." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-3xl font-black text-transparent bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text shadow-xl mb-6">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 max-w-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;