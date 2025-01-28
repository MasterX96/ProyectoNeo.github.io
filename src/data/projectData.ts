// Aquí es donde actualizarás los datos diarios
export interface DailyData {
  day: number;
  date: string;
  cans: number;
}

export const dailyData: DailyData[] = [
  { day: 1, date: '01/01/2025', cans: 146 },
  { day: 2, date: '02/01/2025', cans: 201 },
  { day: 3, date: '03/01/2025', cans: 310 },
  { day: 4, date: '04/01/2025', cans: 391 },
  { day: 5, date: '05/01/2025', cans: 487 },
  { day: 6, date: '06/01/2025', cans: 555 },
  { day: 7, date: '07/01/2025', cans: 693 },
  { day: 8, date: '08/01/2025', cans: 720 },
  { day: 9, date: '09/01/2025', cans: 760 },
  { day: 10, date: '10/01/2025', cans: 820 },
  { day: 11, date: '11/01/2025', cans: 916 },
  { day: 12, date: '12/01/2025', cans: 987 },
  { day: 13, date: '13/01/2025', cans: 1027 },
  { day: 14, date: '14/01/2025', cans: 1118 },
  { day: 15, date: '15/01/2025', cans: 1198 },
  { day: 16, date: '16/01/2025', cans: 1253 },
  { day: 17, date: '17/01/2025', cans: 1296 },
  { day: 18, date: '18/01/2025', cans: 1328 },
  { day: 19, date: '19/01/2025', cans: 1375 },
  { day: 20, date: '20/01/2025', cans: 808 },
  { day: 21, date: '21/01/2025', cans: 1036 },
  { day: 22, date: '22/01/2025', cans: 1178 },
  { day: 23, date: '23/01/2025', cans: 276 },
  { day: 24, date: '24/01/2025', cans: 676 },
  { day: 25, date: '25/01/2025', cans: 753 },
  { day: 26, date: '26/01/2025', cans: 776 },
  { day: 27, date: '27/01/2025', cans: 417 }
];

// Cálculos útiles
export const getTotalCans = () => dailyData.reduce((sum, day) => sum + day.cans, 0);
export const getDaysCompleted = () => dailyData.length;
export const getDaysRemaining = () => 365 - getDaysCompleted();
export const getLatestDay = () => dailyData[dailyData.length - 1];
