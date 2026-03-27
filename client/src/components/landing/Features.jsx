import React from 'react';
import { motion } from 'framer-motion';
import { Video, Zap, Star, MapPin } from 'lucide-react'; //

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Features = () => {
  const features = [
    { icon: <Video className="text-orange-500" size={32}/>, title: "Reel-based Discovery", desc: "Swipe through drool-worthy videos instead of boring menus." },
    { icon: <Zap className="text-red-500" size={32}/>, title: "Instant Ordering", desc: "See it, crave it, tap it. Order directly from the video player." },
    { icon: <Star className="text-yellow-500" size={32}/>, title: "Live Reviews", desc: "Watch real customers taste and review the food before you buy." },
    { icon: <MapPin className="text-orange-400" size={32}/>, title: "Nearby Magic", desc: "Only see trending dishes from restaurants within your delivery radius." }
  ];

  return (
    <section className="py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp} 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="mb-6 bg-neutral-900 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 