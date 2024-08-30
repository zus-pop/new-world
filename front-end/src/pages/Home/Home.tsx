import Banner from "../../components/Banner/Banner";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./Home.css";
import { MouseEvent } from "react";
import { getAllProduct } from "../../api/queries";

const Home = () => {
    const { data: products, isLoading, setUrl } = getAllProduct(0, 10);

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
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
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
            )}
        </div>
    );
};

export default Home;
