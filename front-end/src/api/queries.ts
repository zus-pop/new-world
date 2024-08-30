import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { BaseUrlContext } from "../App";
import { Category } from "../types/Category";
import { Product } from "../types/Product";
import { ProductRequestBody } from "../types/ProductRequestBody";
import { ProductPutRequest } from "../types/ProductPutRequest";
import { ProductResponse } from "../types/ProductResponse";

export const getAllCategories = () => {
    const queryClient = useQueryClient();
    const baseUrl = useContext(BaseUrlContext);
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async (): Promise<Category[]> => {
            const response = await fetch(`${baseUrl}/categories`);
            return await response.json();
        },
    });

    const invalidateQueryKey = () => {
        queryClient.invalidateQueries({
            queryKey: ["categories"],
        });
    };

    return {
        categories,
        isLoading,
        invalidateQueryKey,
    };
};

export const getProductById = (id: number) => {
    const baseUrl = useContext(BaseUrlContext);
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: async (): Promise<Product> => {
            const response = await fetch(`${baseUrl}/products/${id}`);
            return await response.json();
        },
    });

    return {
        product,
        isLoading,
    };
};

export const createProduct = () => {
    const baseUrl = useContext(BaseUrlContext);

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: (product: ProductRequestBody) => {
            return fetch(`${baseUrl}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
        },
    });

    return {
        mutate,
        isPending,
        isError,
        isSuccess,
    };
};

export const updateProduct = () => {
    const baseUrl = useContext(BaseUrlContext);
    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: ({ id, product }: ProductPutRequest) => {
            return fetch(`${baseUrl}/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
        },
    });

    return {
        mutate,
        isPending,
        isError,
        isSuccess,
    };
};

export const removeProduct = (url: string) => {
    const queryClient = useQueryClient();
    const baseUrl = useContext(BaseUrlContext);
    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: (id: number) => {
            return fetch(`${baseUrl}/products/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", url],
            });
        },
        onError: (e) => {
            console.log(e.stack);
        },
    });

    return {
        mutate,
        isPending,
        isError,
        isSuccess,
    };
};

export const getAllProduct = (offset: number, limit: number) => {
    const queryClient = useQueryClient();
    const baseUrl = useContext(BaseUrlContext);
    const [url, setUrl] = useState<string>(
        `${baseUrl}/products?offset=${offset}&limit=${limit}`
    );

    const { data, isLoading } = useQuery({
        queryKey: ["products", url],
        queryFn: async (): Promise<ProductResponse> => {
            const response = await fetch(url);
            return await response.json();
        },
    });

    const invalidateQueries = () => {
        queryClient.invalidateQueries({
            queryKey: ["products", url],
        });
    };

    return {
        data,
        isLoading,
        url,
        setUrl,
        invalidateQueries,
    };
};
