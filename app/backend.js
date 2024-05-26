const axios = require('axios');

async function getProduct(id) {
    const url = `http://localhost:8080/product/${id}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting product: ${error}`);
        throw error;
    }
}

async function createProduct(productData) {
    const url = "http://localhost:8080/product";

    try {
        const response = await axios.post(url, productData);
        return response.data;
    } catch (error) {
        console.error(`Error creating product: ${error}`);
        throw error;
    }
}

async function updateProduct(id, productData) {
    const url = `http://localhost:8080/product/${id}`;

    try {
        const response = await axios.put(url, productData);
        return response.data;
    } catch (error) {
        console.error(`Error updating product: ${error}`);
        throw error;
    }
}

async function deleteProduct(id) {
    const url = `http://localhost:8080/product/${id}`;

    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product: ${error}`);
        throw error;
    }
}

const axios = require('axios');

async function getProduct(id) {
    const url = `http://localhost:8080/product/${id}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting product: ${error}`);
        throw error;
    }
}

async function getAllProducts() {
    const url = "http://localhost:8080/product/AllProduct";

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting all products: ${error}`);
        throw error;
    }
}

async function getProductsByDiscount() {
    const url = "http://localhost:8080/product/AllDiscountProduct";

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting products by discount: ${error}`);
        throw error;
    }
}

async function getProductsByKeyword(keyword) {
    const url = `http://localhost:8080/product/AllKeywordProduct?keyword=${keyword}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting products by keyword: ${error}`);
        throw error;
    }
}

async function getProductsByMaxPrice(max) {
    const url = `http://localhost:8080/product/AllMaxProduct?max=${max}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting products by max price: ${error}`);
        throw error;
    }
}

async function getProductsByMinPrice(min) {
    const url = `http://localhost:8080/product/AllMinProduct?min=${min}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting products by min price: ${error}`);
        throw error;
    }
}

async function getProductsByPriceRange(min, max) {
    const url = `http://localhost:8080/product/AllRangeProduct?min=${min}&max=${max}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting products by price range: ${error}`);
        throw error;
    }
}

async function getProductsByType(types) {
    const url = `http://localhost:8080/product/AlProductType?types=${types}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error getting products by type: ${error}`);
        throw error;
    }
}