import { Phone, Mail, Globe, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-40 pt-64 md:pt-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-800 p-6 rounded-lg flex justify-center items-center">
          <div>
            <h3 className="font-bold mb-4 text-neutral-400 uppercase tracking-wider">Connect With Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-500 w-5 h-5" />
                <p className="text-neutral-300">+91 9567843340</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-green-500 w-5 h-5" />
                <p className="text-neutral-300">info@deepnetsoft.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <img 
            src="/logo.png" 
            alt="Deep Net Soft" 
            className="w-20 h-20 mb-4 object-contain" 
          />
          <h2 className="text-xl font-bold tracking-wider">DEEP NET SOFT</h2>
          <div className="flex space-x-4 mt-4">
            <Globe className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500 hover:text-white transition-colors">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        <div className="text-sm flex justify-center items-center">
          <div className='justify-center border border-gray-800 py-16 items-center text-center px-2'>
            <h3 className="font-bold mb-4 text-neutral-400 uppercase tracking-wider">Find Us</h3>
            <div className="flex items-center space-x-3">
              <MapPin className="text-red-500 w-5 h-5" />
              <p className="text-neutral-300">First Floor, Geo Infopark, Infopark EXPY, Kakkanad</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-8 pt-4 border-t border-gray-800 text-gray-500">
        © 2024 Deepnetsoft Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;