
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/AllProduct`);
    return response.data;
  } catch (error) {
    console.error(`Error getting all products: ${error}`);
    throw error;
  }
}

export async function getProductsByDiscount() {
  try {
    const response = await axios.get(`${BASE_URL}/AllDiscountProduct`);
    return response.data;
  } catch (error) {
    console.error(`Error getting products by discount: ${error}`);
    throw error;
  }
}

export async function getProductsByKeyword(keyword: string) {
  try {
    const response = await axios.get(`${BASE_URL}/AllKeywordProduct?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting products by keyword: ${error}`);
    throw error;
  }
}

export async function getProductsByMaxPrice(max: number) {
  try {
    const response = await axios.get(`${BASE_URL}/AllMaxProduct?max=${max}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting products by max price: ${error}`);
    throw error;
  }
}

export async function getProductsByMinPrice(min: number) {
  try {
    const response = await axios.get(`${BASE_URL}/AllMinProduct?min=${min}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting products by min price: ${error}`);
    throw error;
  }
}

export async function getProductsByPriceRange(min: number, max: number) {
  try {
    const response = await axios.get(`${BASE_URL}/AllRangeProduct?min=${min}&max=${max}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting products by price range: ${error}`);
    throw error;
  }
}

export async function getProductsByType(types: string) {
  try {
    const response = await axios.get(`${BASE_URL}/AlProductType?types=${types}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting products by type: ${error}`);
    throw error;
  }
}
