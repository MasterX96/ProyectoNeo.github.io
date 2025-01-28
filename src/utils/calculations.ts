export const calculateEnvironmentalImpact = (cans: number) => {
  // Based on average environmental impact data per aluminum can
  return {
    co2Saved: (cans * 0.0962).toFixed(2), // kg of CO2
    energySaved: (cans * 0.1666).toFixed(2), // kWh
    waterSaved: (cans * 0.5).toFixed(2), // liters
    treesEquivalent: (cans * 0.0004).toFixed(2) // equivalent trees planted
  };
};