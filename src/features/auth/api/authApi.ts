import type { User } from "../../../entities/user";
import { axiosInstance } from "../../../shared/api/axiosInstance";

type AuthResponse = {
    token: string,
    data: User
}

type LoginRequest = {
    email: string;
    pass: string;
};

type RegisterRequest = {
    email: string;
    pass: string;
}

type CheckAuthResponse = {
    id: number;
    email: string;
    name: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const resp = await axiosInstance.post(`/auth`, {
            email: data.email,
            password: data.pass
        });
        return resp.data;
    },
    registartion: async (data: RegisterRequest): Promise<AuthResponse> => {
        const resp = await axiosInstance.post(`/register`, {
            password: data.pass,
            email: data.email,
        });
        return resp.data;
    },
    checkAuth: async (): Promise<CheckAuthResponse> => {
        const response = await axiosInstance.get('/auth_me');
        return response.data;
    }
}