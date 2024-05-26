import axios from 'axios';

const BASE_URL = 'http://localhost:8080/promos';

export interface PromoCode {
    id: string;
    name: string;
    description: string;
    validDate: string;
    minPurchase: number;
}

export interface UserDetails {
    id: number;
    username: string;
    walletBalance: number;
}

export async function purchaseProduct(price: number, promoCode?: PromoCode): Promise<UserDetails | string> {
    try {
        const response = await axios.post(`${BASE_URL}/purchase`, { price, promoCode });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            return 'Bad Request';
        }
        console.error(`Error purchasing product: ${error}`);
        throw error;
    }
}