import apiClient from '../../../api/client';

export const transactionService = async () => {
    try {
        const response = await apiClient.get('/Transaction/getAll');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch transactions');
    }
}