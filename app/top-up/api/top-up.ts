import axios from 'axios';

const BASE_URL = 'http://localhost:8080/promos';

export interface TopUp {
    username: string;
    topUpMethod?: string;
    timestamp: string;
    amount: number;
  }

  export interface UserDetails {
    id: number;
    username: string;
    walletBalance: number;
  }

export async function insertTopUp(data: TopUp): Promise<UserDetails | string> {
        try {
            const response = await axios.post(`${BASE_URL}/insert-topup`, data);
            return response.data;
        } catch (error) {
            if ((error as any).response && (error as any).response.status === 400) {
                return 'Bad Request';
            }
            console.error(`Error inserting top up: ${error}`);
            throw error;
        }
    }
