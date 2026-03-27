import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, MapPin } from 'lucide-react'; 
const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", // Burger
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", // Pizza
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80", // Sushi
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80"  // Pasta
];

const Trending = () => {
  return (
    <section className="py-24 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-2">Trending Near You</h2>
          <p className="text-gray-400">The most craved dishes in your city today.</p>
        </div>
        <button className="hidden sm:flex items-center text-orange-500 font-bold hover:text-orange-400 transition-colors">
          See All <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex overflow-x-auto pb-10 px-6 gap-6 snap-x snap-mandatory hide-scrollbar">
        {FOOD_IMAGES.map((img, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="snap-center shrink-0 w-[280px] h-[450px] relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
          >
            <img src={img} alt="Trending Food" className="w-full h-full object-cover brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">₹249</span>
                <div className="flex items-center text-white/90 gap-1 text-sm font-bold">
                  <Heart size={16} className="fill-red-500 text-red-500" /> 4.2k
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Spicy Stack Burger</h3>
              <p className="text-gray-300 text-sm flex items-center gap-1"><MapPin size={14} /> The Burger Joint • 2.4 km</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Trending; 