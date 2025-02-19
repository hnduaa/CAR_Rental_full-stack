// models/statistics.types.ts
export interface MonthlyData {
    month: string;
    value: number;
  }
  
  export interface StatisticsData {
    totalBookings: number;
    totalRevenue: number;
    activeCars: number;
    cancelledReservations: number;
    genderDistribution: { [key: string]: number };
    ageDistribution: { [key: string]: number };
    monthlyRevenue: MonthlyData[];
    monthlyBookings: MonthlyData[];
  }