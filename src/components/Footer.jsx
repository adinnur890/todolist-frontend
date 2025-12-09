function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white 2xl:px-60 px-6 py-20 border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <aside className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-white"
              >
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Linkbee Corp.</h3>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">IT Software Company yang berfokus pada solusi digital inovatif untuk bisnis modern.</p>
        </aside>

        <nav className="space-y-4">
          <h6 className="text-lg font-bold text-yellow-400 mb-4">Services</h6>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Branding</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Design</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Marketing</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Advertisement</a>
        </nav>

        <nav className="space-y-4">
          <h6 className="text-lg font-bold text-yellow-400 mb-4">Company</h6>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ About us</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Contact</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Jobs</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Press kit</a>
        </nav>

        <nav className="space-y-4">
          <h6 className="text-lg font-bold text-yellow-400 mb-4">Legal</h6>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Terms of use</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Privacy policy</a>
          <a className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform cursor-pointer">→ Cookie policy</a>
        </nav>
      </div>

      <div className="border-t border-gray-800 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">© 2025 TodoDin. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-2xl">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-2xl">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-2xl">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-2xl">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
