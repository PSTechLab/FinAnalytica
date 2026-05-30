import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

// This matches your transformed data structure where categories are strings
interface TransformedTransaction {
  id: number;
  clientName: string;
  category: string; // 'Operational' or 'Investment'
  amount: number;
  date: string;
  status: string;
  riskLevel: string;
}

interface CategoryBreakdownCardProps {
  transactions: TransformedTransaction[];
}

const CategoryBreakdownCard: React.FC<CategoryBreakdownCardProps> = ({ transactions }) => {
  // 1. Group and count transactions directly by their category string names
  const categoryCounts = transactions.reduce((acc, transaction) => {
    const cat = transaction.category || 'Unknown';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 2. Format the grouped data into the array structure MUI X Charts expects
  const chartData = Object.entries(categoryCounts).map(([categoryName, count], index) => ({
    id: index,         // MUI needs a unique identifier for each slice
    value: count,      // The calculated count
    label: categoryName, // Directly uses 'Operational', 'Investment', etc.
  }));

  const totalTransactions = transactions.length;

  return (
    <Card sx={{ minWidth: 350, border: '3px solid #fff', borderRadius: 3, boxShadow: 6, margin: '0 10px', backgroundColor: '#ccdcdb' }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          Category Breakdown
        </Typography>

        {/* Chart Container */}
        <Box sx={{ width: '100%', height: '25vh', position: 'relative' }}>
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 50,   // Creates the donut hole
                outerRadius: 90,
                paddingAngle: 4,   // Clean separation gap
                cornerRadius: 4,   // Smooth segment edges
              },
            ]}
            slotProps={{
              legend: {
                position: { vertical: 'bottom', horizontal: 'center' },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdownCard;