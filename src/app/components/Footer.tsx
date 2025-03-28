const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About Us</h2>
            <p className="text-gray-400 text-sm">
              We provide the best products with quality assurance. Your satisfaction is our priority.
            </p>
          </div>
          
          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-400 text-sm">Email: support@mystore.com</p>
            <p className="text-gray-400 text-sm">Phone: +123 456 7890</p>
            <p className="text-gray-400 text-sm">Address: 123 Market Street, Fsd</p>
          </div>
          
          {/* Social Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;