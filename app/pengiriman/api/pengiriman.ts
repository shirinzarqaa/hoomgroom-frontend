import axios from 'axios';

const baseUrl = 'http://localhost:8080/pengiriman'; // replace with your actual base URL

export interface Pengiriman {
    kodeResi: string;
    state: string;
    tranportation: string;
}

// Create Pengiriman
export async function createPengiriman(kodeResi: string) {
    try{

        const response = await axios.post(`${baseUrl}/CreatePengiriman`, {
            kodeResi: kodeResi
        });
        return response.data;

    } catch (error) {
        if((error as any).response && (error as any).response.status === 400){
            return 'Bad Request';
        } 
        console.error('Error Creating Pengiriman: ${error}');
        throw error;
    }
}

// Get All Pengiriman
export async function getAllPengiriman() {
    try {
        const response = await axios.get(`${baseUrl}/AllPengiriman`);
        return response.data;
    } catch (error) {
        if((error as any).response && (error as any).response.status === 400){
            return 'Bad Request';
        } 
        console.error('Error Getting All Pengiriman:${error}');
        throw error;
    }
}

// Get Pengiriman By Kode Resi
export async function getPengirimanByKodeResi(kodeResi: string) {
    try{
        const response = await axios.get(`${baseUrl}/GetPengiriman/${kodeResi}`);
        return response.data;
    } catch (error) {
        if((error as any).response && (error as any).response.status === 400){
            return 'Bad Request';
        } 
        console.error('Error Geetting Pengiriman By Kode Resi: ${error}');
        throw error;
    }
}

// Update Pengiriman State
export async function updatePengirimanState(kodeResi: string, state: string) {
    try {

        const response = await axios.put(`${baseUrl}/UpdateStatePengiriman/${kodeResi}/state`, {
            state: state
        });
        return response.data;

    } catch (error) {
        if((error as any).response && (error as any).response.status === 400){
            return 'Bad Request';
        } 
        console.error('Error Updating Pengiriman State: ${error}');
        throw error;
    }
}

// Update Pengiriman Transportation
export async function updatePengirimanTransportation(kodeResi: string, transportasi: string) {
    try{
        const response = await axios.put(`${baseUrl}/UpdateTransportasiPengiriman/${kodeResi}/transportation`, {
            transportasi: transportasi
        });
        return response.data;
    } catch (error) {
        if((error as any).response && (error as any).response.status === 400){
            return 'Bad Request';
        } 
        console.error('Error Updating Pengiriman Transportation: ${error}');
        throw error;
    }
}

// Delete Pengiriman
export async function deletePengiriman(kodeResi: string) {
    try{
        const response = await axios.delete(`${baseUrl}/DeletePengiriman/${kodeResi}`);
        return response.data;
    } catch (error){
        if((error as any).response && (error as any).response.status === 400){
            return 'Bad Request';
        } 
        console.error('Error Deleting Pengiriman: ${error}');
        throw error;
    }
}