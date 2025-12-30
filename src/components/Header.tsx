import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-center py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Scissors className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-45" />
          <span className="text-xl font-heading font-bold text-foreground">
            Augustine <span className="text-primary">Mobile Barber</span>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
