import axios from 'axios';

const BASE_URL = 'http://localhost:8080/promos';

export async function getAllPromoCodes() {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error(`Error getting all promo code: ${error}`);
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