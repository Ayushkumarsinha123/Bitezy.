import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">Bitezy</div>
          <p className="text-gray-500 text-sm">Eat with your eyes first. The ultimate food discovery platform.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Download App</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">For Restaurants</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors font-bold text-sm">IG</a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors font-bold text-sm">X</a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors font-bold text-sm">FB</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center border-t border-white/5 pt-8 text-sm text-gray-600">
        © {new Date().getFullYear()} Bitezy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;