import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 bg-opacity-80 backdrop-blur-sm border-t-4 border-red-500 text-yellow-900">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-extrabold text-red-500 drop-shadow-md">
            FoodExpress
          </h2>
          <p className="mt-3 text-sm text-yellow-800">
            Delivering happiness, one meal at a time. <br />
            Fresh, fast, and made with ❤️.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-red-500 transition">🏠 Home</a></li>
            <li><a href="/menu" className="hover:text-red-500 transition">📋 Menu</a></li>
            <li><a href="/cart" className="hover:text-red-500 transition">🛒 Cart</a></li>
            <li><a href="/login" className="hover:text-red-500 transition">🔑 Login</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-4">Contact Us</h3>
          <p className="text-sm">📍 Patna, Bihar, India</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ support@foodexpress.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="p-2 rounded-full bg-red-500 bg-opacity-90 text-white hover:bg-red-600 shadow-md transition"><Facebook size={18} /></a>
            <a href="#" className="p-2 rounded-full bg-red-500 bg-opacity-90 text-white hover:bg-red-600 shadow-md transition"><Twitter size={18} /></a>
            <a href="#" className="p-2 rounded-full bg-red-500 bg-opacity-90 text-white hover:bg-red-600 shadow-md transition"><Instagram size={18} /></a>
            <a href="#" className="p-2 rounded-full bg-red-500 bg-opacity-90 text-white hover:bg-red-600 shadow-md transition"><Github size={18} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="bg-orange-600 bg-opacity-90 text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} FoodExpress. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
