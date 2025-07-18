import { create } from "zustand";
import { toast } from "react-toastify";
import type { User } from "../../../entities/user";
import { authApi } from "../api/authApi";

type AuthStore = {
    user: null | User;
    token: null | string;
    checkAuth: () => Promise<boolean>;
    login: (email: string, pass: string) => Promise<void>;
    registration: (email: string, pass: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    login: async (email, pass) => {
        try {
            const { token, data } = await authApi.login({ email, pass });
            localStorage.setItem('token', token);
            set({user: data, token});
        } catch(err) {
            console.error('EROR [LOGIN]', err);
            throw err;
        }

    },
    registration: async (email, pass) => {
        const { token, data } = await authApi.registartion({ email, pass });
        set({user: data, token});
        localStorage.setItem('token', token);
    },
    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
        window.location.href = '/auth'
    },
    checkAuth: async () => {
        const token = localStorage.getItem('token');

        if(!token) return false;
        
        try {
            const resp = await authApi.checkAuth();
            set({ user: resp, token: token });
            return true;
        } catch(error) {
            console.error('ERROR [CHECK_AUTH]', error);
            toast.error('Сессия истекла! Пожалуйста, войдите снова.');
            localStorage.removeItem('token');
            set({ user: null, token: null });
            return false;
        }
    }
}))