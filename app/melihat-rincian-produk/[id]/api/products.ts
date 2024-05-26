import axios from 'axios';

const BASE_URL = 'http://localhost:8080/products';

export async function getProduct(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting product: ${error}`);
    throw error;
  }
}