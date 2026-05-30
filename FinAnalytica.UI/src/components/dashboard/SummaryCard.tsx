import React from 'react'
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { StackedLineChart } from '@mui/icons-material';

const SummaryCard = () => {
    return (
        <Card>
            <CardContent>
                <Stack>
                    <Typography variant="h6" sx={{ color: '#2A2A2A', fontWeight: '400' }}>TOTAL REVENUE</Typography>
                </Stack>
                <Stack>
                    <Typography variant="h5" sx={{ color: '#2A2A2A', fontWeight: '500' }}>$1.2M</Typography>
                </Stack>
            </CardContent>
            <CardMedia>
                {/* <LineChart /> */}
            </CardMedia>
        </Card>
    )
}

export default SummaryCard