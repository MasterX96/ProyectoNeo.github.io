import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { calculateEnvironmentalImpact } from '../utils/calculations';
import { dailyData, getTotalCans, getDaysCompleted, getDaysRemaining } from '../data/projectData';
import { ArrowRight, Target, TrendingUp, Award } from 'lucide-react';

const monthlyData = dailyData.map(data => ({
  ...data,
  ...calculateEnvironmentalImpact(data.cans)
}));

const totalCans = getTotalCans();
const daysCompleted = getDaysCompleted();
const daysRemaining = getDaysRemaining();
const averageCansPerDay = Math.round(totalCans / daysCompleted);
const projectedTotal = averageCansPerDay * 365;
const goalCans = 100000; // Meta anual de latas
const progressPercentage = (totalCans / goalCans) * 100;

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#ef4444'];

export const Impact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Impacto del Proyecto</h1>
      
      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Latas</h3>
            <Target className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{totalCans.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-2">Meta: {goalCans.toLocaleString()} latas</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Promedio Diario</h3>
            <TrendingUp className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{averageCansPerDay}</p>
          <p className="text-sm text-gray-600 mt-2">latas por día</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Días Completados</h3>
            <Award className="text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{daysCompleted}</p>
          <p className="text-sm text-gray-600 mt-2">Faltan {daysRemaining} días</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Proyección Anual</h3>
            <ArrowRight className="text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{projectedTotal.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-2">latas al final del año</p>
        </div>
      </div>

      {/* Gráfico de Progreso Diario */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Progreso Diario</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="cans" 
              stroke="#22c55e" 
              name="Latas Recicladas"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos de Impacto Ambiental */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Impacto Ambiental</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[calculateEnvironmentalImpact(totalCans)]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="co2Saved" name="CO₂ Ahorrado (kg)" fill="#22c55e" />
              <Bar dataKey="energySaved" name="Energía Ahorrada (kWh)" fill="#3b82f6" />
              <Bar dataKey="waterSaved" name="Agua Ahorrada (L)" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Distribución del Impacto</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'CO₂ Ahorrado', value: parseFloat(calculateEnvironmentalImpact(totalCans).co2Saved) },
                  { name: 'Energía Ahorrada', value: parseFloat(calculateEnvironmentalImpact(totalCans).energySaved) },
                  { name: 'Agua Ahorrada', value: parseFloat(calculateEnvironmentalImpact(totalCans).waterSaved) },
                  { name: 'Árboles Equivalentes', value: parseFloat(calculateEnvironmentalImpact(totalCans).treesEquivalent) * 100 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};