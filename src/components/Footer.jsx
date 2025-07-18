import { Link } from "react-router-dom";

import logo from "../../src/asset/imgg/logo.png";


const Footer = () => {
  return (
    <>
      {/* Contact Form Section Above Footer */}
      {/* <ContactForm/> */}

      {/* Main Footer */}
      <footer className="bg-[#269092] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo and Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="h-28 w-auto rounded" />
            </div>
            <p className="text-sm leading-relaxed">
              Where every post tells a story. Share your thoughts, connect with readers, and inspire the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/postt" className="hover:underline">Explore Blogs</Link></li>
              <li><Link to="/messenger" className="hover:underline">Messages</Link></li>
              <li><Link to="/network" className="hover:underline">My Network</Link></li>
              <li><Link to="/notifications" className="hover:underline">Notifications</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>Inspiration & Motivation</li>
              <li>Entertainment</li>
              <li>Parenting</li>
              <li>Fashion & Beauty</li>
              <li>Books & Literature</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="font-medium">Address:</span> BlogSpace Pvt. Ltd., Kathmandu, Nepal</li>
              <li><span className="font-medium">Phone:</span> +977-9876543210</li>
              <li><span className="font-medium">Email:</span> support@blogspace.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/30 py-4 text-center text-xs text-white">
          &copy; {new Date().getFullYear()} BlogSpace. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
