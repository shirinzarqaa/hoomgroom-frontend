import axios from 'axios';

export const isLoggedIn = (): boolean => {
    return localStorage.getItem('token') !== null;
};

export const getUser = (): string => {
    const tokenUser = localStorage.getItem('token');
    console.log("ini token datanya", tokenUser);
    const username = localStorage.getItem('username');
    console.log("ini username datanya", username);
    
    if (username === 'admin') {
        return 'Admin';
    }
    return '';
};

export const logout = async (): Promise<void> => {
    try {
        const baseURL = 'http://35.233.214.189';
        console.log("masuk logout");

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('username');
        window.location.href = '/';
    } catch (error) {
        console.error('Failed to logout:', error);
    }
};