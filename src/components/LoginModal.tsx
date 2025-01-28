import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, instagram: string) => void;
}

export const LoginModal = ({ isOpen, onClose, onSubmit }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, instagram);
    // Send data to email
    const emailBody = `Nuevo usuario registrado:\nEmail: ${email}\nInstagram: ${instagram}`;
    window.location.href = `mailto:esse.ipsum.oficial@gmail.com?subject=Nuevo Registro Trivia&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Únete a la Trivia</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Usuario de Instagram
            </label>
            <input
              type="text"
              id="instagram"
              required
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Comenzar
          </button>
        </form>
      </div>
    </div>
  );
};