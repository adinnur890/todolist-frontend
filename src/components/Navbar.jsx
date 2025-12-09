import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md fixed w-full top-0 left-0 z-50 border-b border-gray-800 shadow-lg">
      <div className="flex items-center justify-between py-4 px-6 md:px-60">
        {/* Logo & Hamburger */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="group flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">TodoDin</span>
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-purple-400 focus:outline-none transition-colors duration-200"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center ml-12">
            <Link to="/" className="relative text-gray-300 hover:text-white font-medium transition-colors duration-200 group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="relative text-gray-300 hover:text-white font-medium transition-colors duration-200 group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="relative text-gray-300 hover:text-white font-medium transition-colors duration-200 group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link to="/login" className="relative px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link to="/register" className="px-6 py-2 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:shadow-lg">
            Daftar
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md px-6 py-6 space-y-4 border-t border-gray-800">
          <Link to="/" className="block text-gray-300 hover:text-white font-medium py-2 hover:pl-2 transition-all duration-200">
            🏠 Home
          </Link>
          <Link to="/about" className="block text-gray-300 hover:text-white font-medium py-2 hover:pl-2 transition-all duration-200">
            ℹ️ About
          </Link>
          <Link to="/contact" className="block text-gray-300 hover:text-white font-medium py-2 hover:pl-2 transition-all duration-200">
            📞 Contact
          </Link>
          <div className="flex flex-col space-y-3 pt-4">
            <Link to="/login" className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Login
            </Link>
            <Link to="/register" className="text-center bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 border border-gray-600 hover:border-purple-500 transition-all duration-300">
              Daftar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
