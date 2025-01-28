import React, { useState } from 'react';
import { Instagram } from 'lucide-react';

export const blogPosts = [
  {
    id: '1',
    title: '¿Quién está detrás del desafío?',
    excerpt: 'Conoce a Neo, el emprendedor apasionado por el medio ambiente detrás de este proyecto.',
    content: `¡Hola! Soy Neo, un emprendedor apasionado por crear impacto positivo en el mundo. Mi misión es combinar el emprendimiento con la sostenibilidad para generar cambios significativos en nuestra sociedad.

    Mi pasión por emprender va más allá de los negocios tradicionales; busco iniciativas que aporten al bienestar humano y la preservación de nuestro planeta. Este desafío de reciclaje es solo el comienzo de una serie de proyectos que buscan inspirar y movilizar a la comunidad hacia un futuro más sostenible.

    Creo firmemente que cada pequeña acción cuenta, y que juntos podemos crear un impacto significativo en nuestro entorno. ¡Únete a esta aventura y sé parte del cambio!`,
    imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '2',
    title: '¿Cómo comenzó el desafío?',
    excerpt: 'La historia detrás de este proyecto ambiental y sus ambiciosos objetivos.',
    content: `Todo comenzó con una simple observación: la cantidad de latas de aluminio que terminaban en la basura común. Esta realidad me llevó a investigar sobre el impacto ambiental del aluminio y su potencial de reciclaje.

    El desafío nació como una iniciativa personal para demostrar que una sola persona puede hacer la diferencia. Comenzamos con una meta ambiciosa: recolectar 100,000 latas en un año.

    Lo que empezó como un proyecto individual rápidamente se convirtió en un movimiento comunitario, inspirando a otros a unirse y ser parte del cambio.`,
    imageUrl: 'https://images.unsplash.com/photo-1616781677825-3c8cfc2f79a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '3',
    title: '¿Qué hago con las latas?',
    excerpt: 'Conoce el destino de las latas recolectadas y los planes futuros del proyecto.',
    content: `Actualmente, estamos en la fase de acumulación y conteo de latas. Cada lata recolectada es parte de un plan mayor: financiar proyectos ambientales más amplios.

    Próximos pasos:
    1. Acumular una cantidad significativa de latas
    2. Procesarlas adecuadamente
    3. Utilizar los recursos generados para:
       - Implementar proyectos de educación ambiental
       - Desarrollar iniciativas de conservación
       - Crear nuevos programas de reciclaje

    El objetivo final es crear un ciclo sostenible donde el reciclaje financie más proyectos ambientales.`,
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '4',
    title: 'El impacto del aluminio en el medio ambiente',
    excerpt: 'Descubre por qué el reciclaje de aluminio es crucial para nuestro planeta.',
    content: `El aluminio es uno de los materiales más versátiles y reciclables que existen. Sin embargo, su producción desde cero tiene un alto costo ambiental.

    Datos importantes:
    - La producción de aluminio nuevo consume mucha energía
    - El reciclaje ahorra 95% de esta energía
    - Una lata puede ser reciclada infinitamente
    
    Por esto es crucial reciclar cada lata y darle una nueva vida.`,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '5',
    title: 'Consejos para reciclar correctamente',
    excerpt: 'Guía práctica para maximizar el impacto de tu reciclaje.',
    content: `Para asegurar un reciclaje efectivo, sigue estos consejos:

    1. Enjuaga las latas antes de reciclarlas
    2. Aplasta las latas para ahorrar espacio
    3. Separa las latas de otros materiales
    4. Guárdalas en un lugar seco
    
    Recuerda: cada lata cuenta en nuestro desafío.`,
    imageUrl: 'https://images.unsplash.com/photo-1571727153934-b9e0059b7ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '6',
    title: '¿Cómo podés ser parte del proyecto?',
    excerpt: 'Descubre cómo unirte a esta iniciativa y recibir beneficios por tu aporte.',
    content: `¡Tu participación es fundamental para el éxito de este proyecto! En vez de tirar tus latas a la basura, podés ser parte de esta revolución en el reciclaje de Argentina.
<br>
<br>
    ¿Cómo participar?
    <br>
    1. Guardá tus latas en una bolsa separada 
    2. Contactate conmigo por Instagram
    3. ¡Coordinaremos para retirar tus latas!
<br>
<br>
    Beneficios de participar:
    <br>
    - Serás reconocido como líder en sostenibilidad
    - Recibirás actualizaciones en tiempo real del impacto de tus donaciones
    - Formarás parte de un proyecto revolucionario
    - Aparecerás en nuestro ranking de contribuyentes

    Descubre a quienes ya son parte:
    <br>

    🌟 Lucía Robledo (@robledo_lu)
    Propietaria de Lokita Barber (@lokitabarber)
    Una de nuestras primeras colaboradoras, contribuyendo activamente desde su barbería.
<br>
    🥁 Lucas de Tambores LS (@tamboresls)
    Artesano local que transforma su pasión por la música en acción ambiental, donando regularmente sus latas al proyecto.
<br>
    🌿 Lauti (@lautiii_97)
    Un ejemplo de compromiso constante con el medio ambiente, aportando regularmente a nuestra causa.
<br>
<br>
    ¡Vos también podés ser parte de esta historia! No dejes que tus latas terminen en la basura cuando pueden ser parte de algo más grande.`,
    imageUrl: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export const Blog = () => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Blog Educativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                {expandedPost === post.id ? 'Leer menos' : 'Leer más'}
              </button>
              {expandedPost === post.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                  {post.id === '6' ? (
                    <a
                      href="https://www.instagram.com/neo.reto/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Instagram className="mr-2" />
                      ¡Tengo latas para donar!
                    </a>
                  ) : (
                    <a
                      href="https://www.instagram.com/neo.reto/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Instagram className="mr-2" />
                      Seguir el Proyecto
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Tabla de Posiciones */}
      <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🏆 Tabla de Posiciones</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-green-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Posición</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Puntaje</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">@usuario1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-27</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">@usuario2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">950</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-27</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">@usuario3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">900</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-27</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          La tabla se actualiza semanalmente con los mejores puntajes de la trivia y juegos.
        </p>
      </div>
    </div>
  );
};
