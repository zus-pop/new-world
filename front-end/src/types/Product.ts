export interface Product {
    product_id: number;
    product_name: string;
    category: {
        category_id: number;
        category_name: string;
    };
    quantity: number;
}