import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface TransformedTransaction {
  id: number;
  clientName: string;
  category: string;
  amount: number;
  date: string; // e.g., "2026-03-15" or standard date string
  status: string;
  riskLevel: string;
}

interface MonthlyVolumeCardProps {
  transactions: TransformedTransaction[];
}

export const MonthlyVolumeCard: React.FC<MonthlyVolumeCardProps> = ({ transactions }) => {
  
  // 1. Define month names for formatting and sorting
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // 2. Group and aggregate amounts by month
  const monthlyTotals = transactions.reduce((acc, transaction) => {
    const dateObj = new Date(transaction.date);
    
    // Fallback if the date string is invalid
    if (isNaN(dateObj.getTime())) return acc; 

    const monthIndex = dateObj.getMonth(); // 0 = Jan, 1 = Feb, etc.
    
    acc[monthIndex] = (acc[monthIndex] || 0) + transaction.amount;
    return acc;
  }, {} as Record<number, number>);

  // 3. Prepare data for the chart, ensuring chronological order
  // We filter out months that have $0 to keep the chart clean, or keep them all if you want to show gaps.
  const chartData = monthNames
    .map((name, index) => ({
      month: name,
      amount: monthlyTotals[index] || 0,
      index: index
    }))
    // Optional: Only show months that actually have transactions
    .filter(item => item.amount > 0); 

  // Extract X-axis labels (Month names) and Y-axis data (Amounts)
  const xAxisData = chartData.map(item => item.month);
  const seriesData = chartData.map(item => item.amount);

  return (
    <Card sx={{ minWidth: 350, border: '3px solid #fff', borderRadius: 3, boxShadow: 6, margin: '0 10px', flexGrow: 1, backgroundColor: '#ccdcdb' }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          Monthly Transaction Volume
        </Typography>
        {/* Chart Container */}
        <Box sx={{ width: '100%', height: '25vh' }}>
          {seriesData.length > 0 ? (
            <BarChart
              xAxis={[{ 
                scaleType: 'band', 
                data: xAxisData,
                label: 'Month'
              }]}
              series={[{ 
                data: seriesData, 
                label: 'Total Amount (€)',
                valueFormatter: (value) => value ? `€${value.toLocaleString()}` : '€0',
                color: '#135E4B' // MUI Primary Blue (Adjust to match your theme)
              }]}
              height={200}
              margin={{ top: 20, bottom: 40, left: 10, right: 10 }}
              slotProps={{
                // legend: { hidden: true } // Hidden since the axis/title makes it obvious
              }}
            />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography color="text.secondary">No transaction data available</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};