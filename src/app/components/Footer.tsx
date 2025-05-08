const Footer = () => {
  return (
    <footer className="bg-red-200 text-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-3 text-center sm:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-black">About Us</h2>
            <p className="text-gray-700 text-xs sm:text-sm">
              We provide the best products with quality assurance. Your satisfaction is our priority.
            </p>
          </div>
          
          {/* Contact Section */}
          <div className="mt-2 sm:mt-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-black">Contact</h2>
            <p className="text-gray-700 text-xs sm:text-sm">Email: support@mystore.com</p>
            <p className="text-gray-700 text-xs sm:text-sm">Phone: +123 456 7890</p>
            <p className="text-gray-700 text-xs sm:text-sm">Address: 123 Market Street, Fsd</p>
          </div>
          
          {/* Social Links */}
          <div className="mt-2 sm:mt-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-black">Follow Us</h2>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-gray-800 hover:text-red-600 text-base sm:text-lg pointer-events-none">Facebook</a>
              <a href="#" className="text-gray-800 hover:text-red-600 text-base sm:text-lg pointer-events-none">Twitter</a>
              <a href="#" className="text-gray-800 hover:text-red-600 text-base sm:text-lg pointer-events-none">Instagram</a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-6 sm:mt-8 pt-3 sm:pt-4 text-center text-gray-700 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;