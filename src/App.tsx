import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { Trivia } from './pages/Trivia';
import { Impact } from './pages/Impact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/impact" element={<Impact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;