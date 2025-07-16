import { toast } from 'react-toastify';
import { create } from "zustand";
import type { Product } from "../model/type";
import { axiosInstance } from "../../../shared/api/axiosInstance";

interface ProductsState {
    products: Product[];
    totalPage: number;
    loading: boolean;
    fetchAllProducts: (page: number) => Promise<void>;
    fetchUserProducts: (page: number) => Promise<void>;
    removeProduct: (id: number) => void;
    updateProduct: (id: number, newProduct: Product) => void;
    createProduct: (id: number, product: Product) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
    products: [],
    error: false,
    loading: false,
    totalPage: 1,
    fetchUserProducts: async (page) => {
        try {
            set({ loading: true });
            const { user } = useAuthStore.getState();
            
            if(!user) {
                throw new Error("User not authenticated");
            }

            const pageUrl = page ? `&page=${page}&limit=15` : '&page=1';
            const { data } = await axiosInstance.get(`/products?user_id=${user.id}${pageUrl}`);
            set({products: data.items, totalPage: data.meta.total_pages});
        } catch (err) {
            console.error('ERROR [FETCH_ALL_PRODUCTS]', err)
        } finally {
            set({
                loading: false
            })
        }
    },
    fetchAllProducts: async (page) => {
        try {
            set({ loading: true });
            const pageUrl = page ? `page=${page}&limit=15` : '&page=1';
            const { data } = await axiosInstance.get(`/products?${pageUrl}`);
            set({products: data.items, totalPage: data.meta.total_pages});
        } catch(err) {
            console.error('ERROR [FETCH_ALL_PRODUCTS]', err);
            toast.error("Ошибка при получении продуктов! Попробуйте позже.");
        } finally {
            set({
                loading: false
            })
        }
    },
    createProduct: async () => {

    },
    updateProduct: async () => {

    },
    removeProduct: async () => {

    },
}))