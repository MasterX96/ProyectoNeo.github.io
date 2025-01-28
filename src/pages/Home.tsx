import React from 'react';
import { ImpactCounter } from '../components/ImpactCounter';
import { Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from './Blog';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Reciclando por un Futuro Mejor</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra misión de reciclar aluminio y crear un impacto positivo en el medio ambiente.
            Cada lata cuenta para un futuro más sostenible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/trivia"
              className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              ¡Jugar Trivia!
            </Link>
            <a
              href="https://www.instagram.com/neo.reto/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
            >
              <Instagram className="mr-2" />
              Seguir Proyecto
            </a>
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="py-16 px-4">
        <ImpactCounter />
      </section>

      {/* Call to Action - Trivia Challenge */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">¡Únete al Desafío Neo!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Pon a prueba tus conocimientos sobre reciclaje, comparte tu puntaje en Instagram
            y participa por increíbles premios.
          </p>
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white/20 rounded-lg p-4 inline-block">
                <h3 className="text-2xl font-bold mb-2">¿Cómo participar?</h3>
                <ol className="text-left space-y-2">
                  <li>1. Juega la trivia y obtén tu puntaje</li>
                  <li>2. Toma captura de tu resultado</li>
                  <li>3. Compártelo en tu historia de Instagram</li>
                  <li>4. Etiqueta a @neo.reto</li>
                </ol>
              </div>
            </div>
            <Link
              to="/trivia"
              className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors"
            >
              Comenzar el Desafío
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Últimas Publicaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              Ver Más Publicaciones
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Reciclaje de aluminio"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Cada Lata Cuenta</h3>
                <p className="text-lg">
                  El reciclaje de aluminio es uno de los procesos más eficientes
                  para reducir nuestra huella de carbono.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};