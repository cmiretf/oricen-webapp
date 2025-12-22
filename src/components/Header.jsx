import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.avif';

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Quiénes somos', path: '/quienes-somos' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Contacto', path: '/contacto' },
  { name: 'Comprar', path: '/comprar' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Oricen Logo" className="h-16 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#2B4C7E] border-b-2 border-[#2B4C7E]'
                    : 'text-gray-600 hover:text-[#2B4C7E]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="text-[#2B4C7E] font-medium hover:text-[#1e3a5f] transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-[#2B4C7E] bg-blue-50'
                    : 'text-gray-600 hover:text-[#2B4C7E] hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-4 py-3 text-sm font-medium text-[#2B4C7E]"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
