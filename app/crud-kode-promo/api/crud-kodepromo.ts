import axios from 'axios';
import { UUID } from 'crypto';

const BASE_URL = 'http://localhost:8080/promos';

export interface PromoCode {
    id: string;
    name: string;
    description: string;
    validDate: string;
    minPurchase: number;
}

export async function createPromoCode(promoCode: PromoCode) {
    try {
        const response = await axios.post(BASE_URL, promoCode);
        return response.data;
    } catch (error) {
        console.error(`Error creating promo code: ${error}`);
        throw error;
    }
}

export async function getPromoCodeById(id: string): Promise<PromoCode | null> {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error(`Error getting promo code by id: ${error}`);
        throw error;
    }
}
export async function updatePromoCode(id:string, promoCode: PromoCode) {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, promoCode);
        return response.data;
    } catch (error) {
        console.error(`Error updating promo code: ${error}`);
        throw error;
    }
}

export async function deletePromoCode(id:string) {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting promo code: ${error}`);
        throw error;
    }
}
