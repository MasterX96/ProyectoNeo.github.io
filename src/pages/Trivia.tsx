import React, { useState } from 'react';
import { LoginModal } from '../components/LoginModal';
import { supabase } from '../lib/supabase';

const questions = [
  {
    id: 1,
    question: "¿Cuántas veces se puede reciclar el aluminio?",
    options: [
      "Una vez",
      "5 veces",
      "10 veces",
      "Infinitamente"
    ],
    correctAnswer: 3,
    explanation: "El aluminio es 100% reciclable y puede ser reciclado infinitamente sin perder su calidad.",
    image: "https://example.com/aluminio_reciclaje.jpg"
  },
  {
    id: 2,
    question: "¿Qué porcentaje de energía se ahorra al reciclar aluminio en comparación con producirlo desde cero?",
    options: [
      "25%",
      "50%",
      "75%",
      "95%"
    ],
    correctAnswer: 3,
    explanation: "Reciclar aluminio ahorra aproximadamente el 95% de la energía necesaria para producir aluminio nuevo.",
    image: "https://example.com/ahorro_energia.jpg"
  },
  {
    id: 3,
    question: "¿Cuánto tiempo tarda una lata de aluminio en descomponerse en la naturaleza?",
    options: [
      "10 años",
      "100 años",
      "200-500 años",
      "No se descompone naturalmente"
    ],
    correctAnswer: 2,
    explanation: "Una lata de aluminio tarda entre 200 y 500 años en descomponerse en la naturaleza.",
    image: "https://example.com/descomposicion_lata.jpg"
  },
  {
    id: 4,
    question: "¿Qué cantidad de aluminio se estima que se recicla en todo el mundo cada año?",
    options: [
      "1 millón de toneladas",
      "25 millones de toneladas",
      "50 millones de toneladas",
      "75 millones de toneladas"
    ],
    correctAnswer: 2,
    explanation: "Se reciclan aproximadamente 50 millones de toneladas de aluminio en el mundo cada año.",
    image: "https://example.com/cantidad_reciclaje.jpg"
  },
  {
    id: 5,
    question: "¿En qué año se empezó a reciclar aluminio a gran escala?",
    options: [
      "1900",
      "1940",
      "1970",
      "2000"
    ],
    correctAnswer: 2,
    explanation: "El reciclaje de aluminio comenzó a popularizarse en los años 70 debido a su eficiencia energética y económica.",
    image: "https://example.com/historia_reciclaje.jpg"
  },
  {
    id: 6,
    question: "¿Cuál es el país que más recicla aluminio en el mundo?",
    options: [
      "Estados Unidos",
      "Brasil",
      "Japón",
      "Alemania"
    ],
    correctAnswer: 1,
    explanation: "Brasil lidera el reciclaje de aluminio gracias a sus avanzados sistemas de recolección y cultura de reciclaje.",
    image: "https://example.com/brasil_reciclaje.jpg"
  },
  {
    id: 7,
    question: "¿Qué porcentaje de las latas de aluminio en el mercado mundial proviene de material reciclado?",
    options: [
      "30%",
      "50%",
      "70%",
      "90%"
    ],
    correctAnswer: 2,
    explanation: "Aproximadamente el 70% de las latas de aluminio provienen de material reciclado.",
    image: "https://example.com/latas_recicladas.jpg"
  },
  {
    id: 8,
    question: "¿Cuánta energía consume un avión comercial promedio hecho de aluminio reciclado en comparación con aluminio nuevo?",
    options: [
      "10% menos",
      "25% menos",
      "50% menos",
      "80% menos"
    ],
    correctAnswer: 3,
    explanation: "Los aviones comerciales hechos con aluminio reciclado consumen hasta un 50% menos de energía en su producción.",
    image: "https://example.com/avion_aluminio.jpg"
  },
  {
    id: 9,
    question: "¿Qué invento revolucionó la recolección y reciclaje masivo de aluminio?",
    options: [
      "La trituradora industrial",
      "El horno de arco eléctrico",
      "El contenedor amarillo",
      "El imán de reciclaje"
    ],
    correctAnswer: 2,
    explanation: "El horno de arco eléctrico permitió reciclar aluminio de manera masiva y eficiente.",
    image: "https://example.com/horno_arco.jpg"
  },
  {
    id: 10,
    question: "Si reciclamos 1 tonelada de aluminio, ¿cuántos barriles de petróleo se ahorran aproximadamente?",
    options: [
      "2 barriles",
      "5 barriles",
      "10 barriles",
      "20 barriles"
    ],
    correctAnswer: 3,
    explanation: "Reciclar una tonelada de aluminio ahorra aproximadamente 10 barriles de petróleo, mostrando su gran impacto ambiental.",
    image: "https://example.com/ahorro_petroleo.jpg"
  }
];

export const Trivia = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userInfo, setUserInfo] = useState<{ email: string; instagram: string } | null>(null);

  const handleLogin = async (email: string, instagram: string) => {
    setUserInfo({ email, instagram });
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResults(true);
      saveResults();
    }
  };

  const saveResults = async () => {
    if (!userInfo) return;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userInfo.email,
        password: Math.random().toString(36).slice(-8)
      });

      if (authError) throw authError;

      const { error: resultError } = await supabase.from('trivia_results').insert({
        user_id: authData.user?.id,
        instagram_handle: userInfo.instagram,
        score: score,
        total_questions: questions.length,
        percentage: (score / questions.length) * 100
      });

      if (resultError) throw resultError;
    } catch (error) {
      console.error('Error al guardar resultados:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={handleLogin}
      />
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Trivia Completada!</h2>
          <p className="text-lg text-gray-600 mb-4">
            Obtuviste {score} de {questions.length} respuestas correctas
          </p>
          <p className="text-gray-600 mb-6">
            Porcentaje de acierto: {Math.round((score / questions.length) * 100)}%
          </p>
          <a
            href="https://www.instagram.com/neo.reto/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Compartir en Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="mb-8">
          <img
            src={questions[currentQuestion].image}
            alt="Imagen relacionada"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm text-gray-500">Puntaje: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-4 mb-6">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedAnswer === null
                  ? 'hover:bg-gray-50 border border-gray-200'
                  : selectedAnswer === index
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : index === questions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">{questions[currentQuestion].explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={handleNextQuestion}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
          </button>
        )}
      </div>
    </div>
  );
};
