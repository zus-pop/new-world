import { Product } from "./Product";

export interface ProductResponse {
    count: number;
    products: Product[];
    next: string;
    previous: string;
}