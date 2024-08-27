import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/Banner/Banner";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../types/Product";

import "./Home.css";
import { MouseEvent, useState } from "react";

interface ProductResponse {
    count: number;
    products: Product[];
    next: string;
    previous: string;
}

const baseUrl = "http://localhost:3000/api/v1";

const Home = () => {
    const [url, setUrl] = useState<string>(
        `${baseUrl}/products?offset=0&limit=10`
    );

    const { data: products, isLoading } = useQuery({
        queryKey: ["products", url],
        queryFn: async (): Promise<ProductResponse> => {
            const response = await fetch(url);
            return await response.json();
        },
    });

    if (isLoading) return <div>Loading...</div>;

    const productCards = products?.products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
    ));

    const goPrevious = (_: MouseEvent<HTMLButtonElement>) => {
        setUrl(products?.previous as string);
    };

    const goNext = (_: MouseEvent<HTMLButtonElement>) => {
        setUrl(products?.next as string);
    };

    return (
        <div className="home-container">
            <Banner />
            <div className="product-list-section">
                <h2 className="list-title">Product List</h2>
                <div className="product-list">{productCards}</div>
                <div className="page-action">
                    <button
                        disabled={!products?.previous}
                        onClick={goPrevious}
                        className="btn"
                    >
                        Previous
                    </button>
                    <button
                        disabled={!products?.next}
                        onClick={goNext}
                        className="btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
