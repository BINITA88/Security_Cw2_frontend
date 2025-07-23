import { BookOpen, Heart, Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#4a1f0d] text-white py-10 border-t border-[#e2d2b0]">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <div className="flex justify-center items-center gap-3">
          <span className="text-2xl font-bold tracking-wide">Bookish</span>
        </div>

        <p className="text-white text-sm italic">
          Where stories come alive and knowledge finds its home
        </p>

        <div className="flex justify-center flex-wrap gap-6 text-white] text-sm mt-2">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Curated with love</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            <span>Perfect reading atmosphere</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Read anywhere, anytime</span>
          </div>
        </div>

        <p className="text-xs text-white mt-6">
          &copy; {new Date().getFullYear()} Bookish. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
