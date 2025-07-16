import type { User } from "../../../entities/user";

export interface Product {
    id: number;
    name: string;
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
    description: string;
    author: User;
}