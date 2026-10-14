import { Link, useLocation } from 'react-router-dom';
import { Camera, Upload, Sun, Moon } from 'lucide-react';
import Logo from '../assets/logo.svg';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const location = useLocation();

  return (
    <nav className="glass-effect backdrop-blur-md border-b border-black/20 dark:border-white/20 px-6 py-4 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className={`w-20 ${theme === 'dark' ? 'invert' : ''}`} />
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === '/'
                ? theme === 'dark'
                  ? 'bg-white/10 text-white'
                  : 'bg-black/10 text-black'
                : theme === 'dark'
                  ? 'text-white/70 hover:text-white hover:bg-white/5'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
            }`}
          >
            <Upload className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
            <span>Upload Detection</span>
          </Link>

          <Link
            to="/live"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === '/live'
                ? theme === 'dark'
                  ? 'bg-white/10 text-white'
                  : 'bg-black/10 text-black'
                : theme === 'dark'
                  ? 'text-white/70 hover:text-white hover:bg-white/5'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
            }`}
          >
            <Camera className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
            <span>Live Detection</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white transition-all duration-200 hover:shadow-lg"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
