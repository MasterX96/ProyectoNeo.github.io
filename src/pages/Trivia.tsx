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
    image: "/images/aluminum-recycling.png"
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
    image: "/images/energy-saving.png"
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
    image: "/images/decomposition-time.png"
  },
  {
    id: 4,
    question: "¿Cuántas latas de aluminio se necesitan para fabricar una bicicleta?",
    options: [
      "500",
      "800",
      "1,000",
      "1,500"
    ],
    correctAnswer: 1,
    explanation: "Se necesitan aproximadamente 800 latas de aluminio recicladas para fabricar una bicicleta.",
    image: "/images/aluminum-bike.png"
  },
  {
    id: 5,
    question: "¿Qué país lidera el reciclaje de aluminio en el mundo?",
    options: [
      "Estados Unidos",
      "Brasil",
      "Alemania",
      "Japón"
    ],
    correctAnswer: 1,
    explanation: "Brasil tiene una de las tasas de reciclaje de aluminio más altas del mundo, superando el 98%.",
    image: "/images/recycling-leader.png"
  },
  {
    id: 6,
    question: "¿Cuál es el principal beneficio ambiental del reciclaje de aluminio?",
    options: [
      "Reducción de costos",
      "Ahorro de energía",
      "Menor contaminación del agua",
      "Conservación de minerales"
    ],
    correctAnswer: 1,
    explanation: "El principal beneficio ambiental es el ahorro de energía, que reduce significativamente las emisiones de gases de efecto invernadero.",
    image: "/images/environment-benefit.png"
  },
  {
    id: 7,
    question: "¿Qué proceso se utiliza para separar el aluminio de otros materiales en los centros de reciclaje?",
    options: [
      "Filtración",
      "Magnetismo",
      "Corriente de Foucault",
      "Centrifugación"
    ],
    correctAnswer: 2,
    explanation: "Se utiliza la corriente de Foucault, un proceso basado en campos magnéticos para separar el aluminio de otros materiales.",
    image: "/images/separation-process.png"
  },
  {
    id: 8,
    question: "¿Qué impacto tiene el reciclaje de aluminio en el consumo de agua?",
    options: [
      "Ahorra el 20% del agua",
      "Ahorra el 40% del agua",
      "Ahorra el 90% del agua",
      "No afecta el consumo de agua"
    ],
    correctAnswer: 2,
    explanation: "El reciclaje de aluminio puede ahorrar hasta el 90% del agua que se usaría en la producción primaria.",
    image: "/images/water-saving.png"
  },
  {
    id: 9,
    question: "¿Qué producto es el más reciclado a nivel mundial?",
    options: [
      "Botellas de plástico",
      "Latas de aluminio",
      "Papel y cartón",
      "Vidrio"
    ],
    correctAnswer: 1,
    explanation: "Las latas de aluminio son el producto más reciclado a nivel mundial debido a su alto valor y facilidad de reciclaje.",
    image: "/images/most-recycled.png"
  },
  {
    id: 10,
    question: "¿Cuál es el récord de reciclaje de latas en un solo día en el mundo?",
    options: [
      "500 millones",
      "1,000 millones",
      "1,500 millones",
      "2,000 millones"
    ],
    correctAnswer: 1,
    explanation: "El récord de reciclaje de latas en un solo día es de aproximadamente 500 millones en varios países combinados.",
    image: "/images/recycling-record.png"
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

      const resultadosDetallados = `
        ## Resultados de la Trivia - ${userInfo.instagram}

        Usuario: ${userInfo.instagram}
        Email: ${userInfo.email}
        Fecha: ${new Date().toLocaleDateString()}
        Hora: ${new Date().toLocaleTimeString()}

        PUNTUACIÓN FINAL: ${score} de ${questions.length} correctas
        Porcentaje de acierto: ${Math.round((score / questions.length) * 100)}%

        ¡Gracias por participar!
      `;

      window.location.href = `mailto:esse.ipsum.oficial@gmail.com?subject=🎮 Resultado Trivia - ${userInfo.instagram}&body=${encodeURIComponent(resultadosDetallados)}`;
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
      <div className="results-container">
        <h2>¡Trivia Completada!</h2>
        <p>Obtuviste {score} de {questions.length} respuestas correctas</p>
        <p>Porcentaje de acierto: {Math.round((score / questions.length) * 100)}%</p>
        <p>
          ¡No olvides tomar una captura de pantalla y compartirla en tu historia de Instagram etiquetando a @neo.reto!
        </p>
        <button className="share-button" onClick={() => alert('Función de compartir en Instagram próximamente.')}>Compartir en Instagram</button>
      </div>
    );
  }

  return (
    <div className="trivia-container">
      <h2>{questions[currentQuestion].question}</h2>
      <img src={questions[currentQuestion].image} alt="Question" className="question-image" />
      <div className="options-container">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={
              selectedAnswer === index
                ? index === questions[currentQuestion].correctAnswer
                  ? 'correct-option'
                  : 'incorrect-option'
                : 'default-option'
            }
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="explanation-container">
          <p>{questions[currentQuestion].explanation}</p>
          <button onClick={handleNextQuestion}>Siguiente pregunta</button>
        </div>
      )}
    </div>
  );
};

