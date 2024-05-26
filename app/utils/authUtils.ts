import axios from 'axios';

export const isLoggedIn = (): boolean => {
    return localStorage.getItem('token') !== null;
};

export const getUser = (): string => {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const users = JSON.parse(userData);
        const user = users.find((user: any) => user.username === 'admin');
        if (user) {
            return user.username;
        }
    }
    return '';
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