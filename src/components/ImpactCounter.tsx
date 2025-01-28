import React, { useState } from 'react';
import { calculateEnvironmentalImpact } from '../utils/calculations';
import { Leaf, Droplets, Battery, Trees as Tree } from 'lucide-react';
import { getTotalCans, getDaysCompleted, getDaysRemaining } from '../data/projectData';

const impactDetails = {
  co2: {
    title: "CO₂ Ahorrado",
    description: `El reciclaje de aluminio reduce significativamente las emisiones de CO₂:
    
    • Cada lata reciclada evita la emisión de 0.0962 kg de CO₂
    • Esto equivale a conducir un coche durante 1.6 km
    • El proceso de reciclaje emite 95% menos CO₂ que la producción desde cero
    • En total, hemos evitado la emisión de toneladas de gases de efecto invernadero
    
    Este impacto es crucial para combatir el cambio climático y crear un futuro más sostenible.`,
    icon: Leaf,
    color: "green"
  },
  energy: {
    title: "Energía Ahorrada",
    description: `El ahorro energético del reciclaje de aluminio es impresionante:
    
    • Cada lata ahorra energía suficiente para:
      - Mantener un TV encendido por 3 horas
      - Cargar un smartphone durante una semana
      - Iluminar una habitación durante 4 horas
    
    • El reciclaje usa solo el 5% de la energía necesaria para producir aluminio nuevo
    • Este ahorro energético reduce la dependencia de combustibles fósiles`,
    icon: Battery,
    color: "blue"
  },
  water: {
    title: "Agua Ahorrada",
    description: `El impacto en el ahorro de agua es significativo:
    
    • Por cada lata reciclada se ahorran 0.5 litros de agua
    • El proceso de reciclaje consume 95% menos agua que la producción primaria
    • Este ahorro ayuda a:
      - Preservar recursos hídricos
      - Reducir la contaminación del agua
      - Proteger ecosistemas acuáticos
    
    El agua es un recurso vital y cada lata reciclada contribuye a su conservación.`,
    icon: Droplets,
    color: "cyan"
  },
  trees: {
    title: "Árboles Equivalentes",
    description: `El impacto en términos de árboles es sorprendente:
    
    • Cada 2500 latas recicladas equivalen a plantar un árbol
    • Un árbol adulto puede absorber hasta 22 kg de CO₂ al año
    • Los árboles equivalentes representan:
      - La capacidad de absorción de CO₂
      - El impacto en la calidad del aire
      - La contribución a la biodiversidad
    
    Este cálculo nos ayuda a visualizar el impacto positivo de nuestras acciones.`,
    icon: Tree,
    color: "emerald"
  }
};

export const ImpactCounter = () => {
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  const TOTAL_CANS = getTotalCans();
  const impact = calculateEnvironmentalImpact(TOTAL_CANS);
  const TOTAL_DAYS = getDaysCompleted();
  const REMAINING_DAYS = getDaysRemaining();

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Impacto Actual</h2>
        <p className="text-4xl font-bold text-green-600">{TOTAL_CANS.toLocaleString()} Latas Recicladas</p>
        <div className="mt-4 flex justify-center gap-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">Días Completados</p>
            <p className="text-2xl font-bold text-blue-600">{TOTAL_DAYS}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Días Restantes</p>
            <p className="text-2xl font-bold text-blue-600">{REMAINING_DAYS}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Object.entries(impactDetails).map(([key, detail]) => {
          const Icon = detail.icon;
          const value = impact[key === 'co2' ? 'co2Saved' : 
                             key === 'energy' ? 'energySaved' :
                             key === 'water' ? 'waterSaved' : 'treesEquivalent'];
          const unit = key === 'co2' ? 'kg' :
                      key === 'energy' ? 'kWh' :
                      key === 'water' ? 'L' : '';
          
          return (
            <button 
              key={key}
              onClick={() => setSelectedImpact(selectedImpact === key ? null : key)}
              className={`flex flex-col items-center p-4 bg-${detail.color}-50 rounded-lg hover:bg-${detail.color}-100 transition-colors`}
            >
              <Icon className={`text-${detail.color}-600 mb-2`} size={32} />
              <span className="text-lg font-semibold text-gray-800">{value} {unit}</span>
              <span className="text-sm text-gray-600">{detail.title}</span>
            </button>
          );
        })}
      </div>

      {selectedImpact && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {impactDetails[selectedImpact].title}
          </h3>
          <div className="prose prose-green max-w-none">
            <p className="whitespace-pre-line text-gray-700">
              {impactDetails[selectedImpact].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};