import axios from 'axios';

export const isLoggedIn = (): boolean => {
    return localStorage.getItem('token') !== null;
};

export const logout = async (): Promise<void> => {
    try {
        const baseURL = 'http://localhost:8080';

        await axios.post(`${baseURL}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '/';
    } catch (error) {
        console.error('Failed to logout:', error);
    }
};