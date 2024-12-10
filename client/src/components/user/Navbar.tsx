import { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white px-4 md:px-8 py-4 relative">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Deep Net Soft Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold hidden md:block">DEEP NET SOFT</h1>
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="focus:outline-none transition-transform duration-300 transform"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white animate-rotate-in" />
            ) : (
              <Menu className="w-6 h-6 text-white animate-rotate-out" />
            )}
          </button>
        </div>

        <ul className="hidden md:flex space-x-8 text-sm">
          <li className="hover:text-gray-400 cursor-pointer">HOME</li>
          <Link to='/'>
            <li className="hover:text-gray-400 cursor-pointer">MENU</li>
          </Link>
          <li className="hover:text-gray-400 cursor-pointer">MAKE A RESERVATION</li>
          <li className="hover:text-gray-400 cursor-pointer">CONTACT US</li>
        </ul>

        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <button 
              onClick={toggleMenu} 
              className="absolute top-4 right-4 focus:outline-none"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            
            <ul className="text-center space-y-11">
              <li className="text-xl hover:text-gray-400 cursor-pointer pb-5">HOME</li>
              <Link to='/' onClick={toggleMenu}>
                <li className="text-xl hover:text-gray-400 cursor-pointer pb-5">MENU</li>
              </Link>
              <Link to='/' onClick={toggleMenu}>
              <li className="text-xl hover:text-gray-400 cursor-pointer pb-5">MAKE A RESERVATION</li>
              </Link>
              <Link to='/' onClick={toggleMenu}>
              <li className="text-xl hover:text-gray-400 cursor-pointer pb-5">CONTACT US</li>
              </Link>

            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;