"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Register() {
    const [fullname, setFullname] = useState("");
    const [dob, setDob] = useState("");
    const [sex, setSex] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const { push } = useRouter();
    const baseURL = 'http://localhost:8080'; // Ensure this URL is correct

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const userData = {
            fullname,
            dob,
            sex,
            username,
            email,
            password,
            walletBalance
        };

        try {
            const response = await fetch(`${baseURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            setFullname('');
            setDob('');
            setSex('');
            setUsername('');
            setEmail('');
            setPassword('');
            setWalletBalance(0);

            setTimeout(() => {
                push('/login');
            }, 1500);

        } catch (error: unknown) {
            console.error("Registration error:", error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unexpected error occurred');
            }
        }
    }

    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="text-2xl font-semibold text-blue-primary">Form Registrasi</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold text-blue-primary">Nama Lengkap</span>
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            required
                            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-full bg-white text-black focus:border-blue-primary"
                            onChange={(event) => setFullname(event.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold text-blue-primary">Tanggal Lahir</span>
                        <input
                            type="text"
                            placeholder="Tanggal Lahir"
                            required
                            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-full bg-white text-black focus:border-blue-primary"
                            onChange={(event) => setDob(event.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold text-blue-primary">Jenis Kelamin</span>
                        <input
                            type="text"
                            placeholder="Jenis Kelamin"
                            required
                            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-full bg-white text-black focus:border-blue-primary"
                            onChange={(event) => setSex(event.target.value)}
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold text-blue-primary">Username</span>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-full bg-white text-black focus:border-blue-primary"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold text-blue-primary">Email</span>
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-full bg-white text-black focus:border-blue-primary"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold text-blue-primary">Password</span>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-full bg-white text-black focus:border-blue-primary"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                </div>
                <div className="md:col-span-2 flex flex-col items-center gap-6">
                    <button type="submit"
                            className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold text-white">
                        Daftar
                    </button>
                    <span className="text-gray-600">
                        Sudah punya akun? <a href="/login" className="text-blue-primary hover:underline">Login</a>
                    </span>
                </div>
            </form>
        </section>
    );
}