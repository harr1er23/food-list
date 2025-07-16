import { axiosInstance } from "../../../shared/api/axiosInstance";
import type { Product } from "../model/type";

export const productsApi = {
    fetchAllProducts: async (): Promise<Product[]> => {
        try {
            const resp = await axiosInstance.get(`/products`); 

            return resp.data;
        } catch(err) {
            console.error('ERROR [FETCH_ALL_PRODUCTS_API]', err);
            throw err;
        }
    },
    fetchProducts: async (id: string): Promise<Product[]> => {
        try {
            const resp = await axiosInstance.get(`/products?user.id=${id}`); 

            return resp.data;
        } catch(err) {
            console.error('ERROR [FETCH_ALL_PRODUCTS_API]', err);
            throw err;
        }
    },
    deleteProduct: async (id: string): Promise<void> => {
        try {
            const resp = await axiosInstance.delete(`/products?id=${id}`); 

            return resp.data;
        } catch(err) {
            console.error('ERROR [FETCH_ALL_PRODUCTS_API]', err);
            throw err;
        }
    },
    updateProduct: async (id: string, product: Product): Promise<Product> => {
        try {
            const resp = await axiosInstance.patch(`/products?id=${id}`, product); 

            return resp.data;
        } catch(err) {
            console.error('ERROR [FETCH_ALL_PRODUCTS_API]', err);
            throw err;
        }
    },
    createProduct: async (userId: string, product: Product): Promise<Product> => {
        try {
            const resp = await axiosInstance.post(`/products`, product); 

            return resp.data;
        } catch(err) {
            console.error('ERROR [FETCH_ALL_PRODUCTS_API]', err);
            throw err;
        }
    }
}