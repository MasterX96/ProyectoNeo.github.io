import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Instagram } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Recycle size={32} />
          <span className="text-2xl font-bold">Proyecto Neo</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/trivia" className="hover:text-green-200">Trivia</Link>
          <Link to="/blog" className="hover:text-green-200">Blog</Link>
          <Link to="/impact" className="hover:text-green-200">Impacto</Link>
          <a 
            href="https://www.instagram.com/neo.reto/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-green-200"
          >
            <Instagram size={20} />
            <span>Sígueme</span>
          </a>
        </div>
      </nav>
    </header>
  );
};