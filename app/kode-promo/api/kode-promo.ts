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

