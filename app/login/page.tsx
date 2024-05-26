"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { push } = useRouter();
    const baseURL = 'http://localhost:8080';

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const loginData = {
            username,
            password
        };

        try {
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userData', JSON.stringify(data));

            alert('Login successful! Redirecting to homepage...');
            setTimeout(() => {
                push('/homepage');
            }, 1500);

        } catch (error: any) {
            alert(error.message || 'An unexpected error occurred');
        }
    }

    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="text-2xl font-semibold text-blue-primary">Form Login</h1>
            <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-2">
                    <span className="font-semibold text-blue-primary">Username</span>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-blue-primary"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="font-semibold text-blue-primary">Password</span>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-blue-primary"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <button type="submit" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
                    Masuk
                </button>
                <span className={"text-gray-600"}>
          Belum punya akun? <a href="/register" className="text-blue-primary hover:underline">Register</a>
        </span>
            </form>
        </section>
    );
}