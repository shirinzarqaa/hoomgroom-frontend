"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  namaLengkap: string;
  tanggalLahir: string;
  jenisKelamin: string;
  username: string;
  email: string;
  is_aktif: boolean
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setIs_Aktif: (is_aktif: boolean) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [namaLengkap, setNamaLengkap] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [is_aktif, setIsAktif] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const authLocal = window.localStorage.getItem('isAuthenticated');
    const namaLengkapLocal = window.localStorage.getItem('namaLengkap');
    const tanggalLahirLocal = window.localStorage.getItem('tanggalLahir');
    const jenisKelaminLocal = window.localStorage.getItem('jenisKelamin');
    const usernameLocal = window.localStorage.getItem('username');
    const emailLocal = window.localStorage.getItem('email');
    const aktifLocal = window.localStorage.getItem('is_aktif');
    
    if (authLocal) {
      setIsAuthenticated(JSON.parse(authLocal));
    }
    if (namaLengkapLocal) {
      setNamaLengkap(namaLengkapLocal);
    }
    if (tanggalLahirLocal) {
      setTanggalLahir(tanggalLahirLocal);
    }
    if (jenisKelaminLocal) {
      setJenisKelamin(jenisKelaminLocal);
    }
    if (usernameLocal) {
      setUsername(usernameLocal);
    }
    if (emailLocal) {
      setEmail(emailLocal);
    }
    if (aktifLocal) {
      setIsAktif(JSON.parse(aktifLocal));
    }
  }, []);


  const login = async (username: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      window.localStorage.setItem('isAuthenticated', 'true');
      window.localStorage.setItem('namaLengkap', data.namaLengkap);
      window.localStorage.setItem('tanggalLahir', data.tanggalLahir);
      window.localStorage.setItem('jenisKelamin', data.jenisKelamin);
      window.localStorage.setItem('username', data.username);
      window.localStorage.setItem('email', data.email);
      const aktif = await fetch(`/api/aktif/${username}`);
      const data_aktif = await aktif.json();
      
      if (data_aktif && data_aktif.length > 0) {
        window.localStorage.setItem('is_aktif', 'true');
        setIsAktif(true);
      } else {
        window.localStorage.setItem('is_aktif', 'false');
        setIsAktif(false);
      }
      setIsAuthenticated(true);
      setNamaLengkap(data.namaLengkap)
      setTanggalLahir(data.tanggalLahir)
      setJenisKelamin(data.jenisKelamin)
      setUsername(data.username);
      setEmail(data.email)
      alert('Login berhasil');
      push('/daftar-tayangan');
    } else {
      alert(data.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.localStorage.setItem('isAuthenticated', 'false');
    setNamaLengkap('');
    window.localStorage.setItem('namaLengkap', '');
    setTanggalLahir('');
    window.localStorage.setItem('tanggalLahir', '');
    setJenisKelamin('');
    window.localStorage.setItem('jenisKelamin', '');
    setUsername('');
    window.localStorage.setItem('username', '');
    setEmail('');
    window.localStorage.setItem('email', '');
    setIsAktif(false);
    window.localStorage.setItem('is_aktif', 'false');

    push('/');
  };

  const setIs_Aktif = (is_aktif: boolean) => {
    window.localStorage.setItem('is_aktif', is_aktif ? 'true' : 'false');
    setIsAktif(is_aktif);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, namaLengkap, tanggalLahir, jenisKelamin, username, email, login, logout, is_aktif, setIs_Aktif }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}