import apiClient from '../../../api/client';

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await apiClient.post('/Auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};