import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, Stack, Paper, Typography } from '@mui/material';
import SideBar from '../../components/dashboard/SideBar';
import NavBar from '../../components/dashboard/NavBar';
import type { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { categoryMap, statusMap, riskLevelMap } from '../../enums/Transaction/EnumMaps';
import { transactionService } from './api/transactionService';
import CategoryBreakdownCard from '../../components/dashboard/CategoryBreakdownCard';
import { MonthlyVolumeCard } from '../../components/dashboard/MonthlyTotalBarChart';

type CategoryId = keyof typeof categoryMap;
type StatusId = keyof typeof statusMap;
type RiskLevelId = keyof typeof riskLevelMap;

interface RawTransaction {
  id: number;
  clientName: string;
  category: CategoryId;
  amount: number;
  date: string;
  status: StatusId;
  riskLevel: RiskLevelId;
}

interface TransformedTransaction extends Omit<RawTransaction, 'category' | 'status' | 'riskLevel'> {
  category: string;
  status: string;
  riskLevel: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'clientName', headerName: 'Client Name', width: 150 },
  { field: 'category', headerName: 'Category', width: 100 },
  { field: 'amount', headerName: 'Amount (€)', width: 100 },
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'riskLevel', headerName: 'Risk Level', width: 100 },
];

const Dashboard = () => {
  const [transactionData, setTransactionData] = useState<TransformedTransaction[]>([]);
  const rows: GridRowsProp = transactionData;
  const fetchTransactions = async () => {
    try {
      const data: RawTransaction[] = await transactionService();

      const transformedData = data.map(transaction => ({
        ...transaction,
        category: categoryMap[transaction.category] || 'Unknown',
        status: statusMap[transaction.status] || 'Unknown',
        riskLevel: riskLevelMap[transaction.riskLevel] || 'Unknown',
      }));
      setTransactionData(transformedData);
      console.log('Fetched transactions:', transformedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid size={1.5} sx={{ backgroundColor: '#135E4B' }}>
        <SideBar />
      </Grid>
      <Grid size={10.5} sx={{ backgroundColor: '#ccdcdb' }}>
        <NavBar />
        <Box>
          <Typography variant="h6" sx={{ color: '#2A2A2A', fontWeight: '500', margin: '10px 30px', textTransform: 'uppercase' }}>Financial Data Analytics: Transaction Overview</Typography>
        </Box>
        <Box sx={{ display: 'flex', margin: '10px 20px'}}>
          <Paper elevation={10} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: 0, borderRadius: '10px', gap: '10px', height: '80vh', width: '70%', margin: '0 10px', border: '3px solid #fff' }}>
            <DataGrid rows={rows} columns={columns} autoPageSize sx={{ backgroundColor: '#ccdcdb', borderRadius: '10px', textAlign: 'center' }} />
          </Paper>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <CategoryBreakdownCard transactions={transactionData} />
            <MonthlyVolumeCard transactions={transactionData} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Dashboard;