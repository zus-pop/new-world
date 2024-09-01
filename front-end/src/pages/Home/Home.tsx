import Banner from "../../components/Banner/Banner";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./Home.css";
import { MouseEvent } from "react";
import { getAllProduct } from "../../api/queries";

const Home = () => {
    const { data: products, isLoading, page, setPage } = getAllProduct(10);
    let pages: number[] = [];

    if (!isLoading) {
        pages = [...Array(Math.ceil(products?.count! / 10)).keys()];
    }

    const productCards = products?.products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
    ));

    const goPrevious = (_: MouseEvent<HTMLButtonElement>) => {
        setPage((prev) => prev - 1);
    };

    const goNext = (_: MouseEvent<HTMLButtonElement>) => {
        setPage((prev) => prev + 1);
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
                            disabled={page === pages[0] + 1}
                            onClick={goPrevious}
                            className="btn"
                            type="button"
                        >
                            Previous
                        </button>
                        {pages.map((index) => (
                            <div
                                onClick={(e) => {
                                    setPage(+e.currentTarget.innerText);
                                }}
                                className={`page ${
                                    page === index + 1 ? "active" : ""
                                }`}
                                key={index}
                            >
                                {index + 1}
                            </div>
                        ))}
                        <button
                            disabled={page === pages[pages.length - 1] + 1}
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
