import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductTable.css";
import {
    faAngleDown,
    faFilter,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { BaseUrlContext } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { ProductResponse } from "../../../types/ProductResponse";

const ProductTable = () => {
    const baseUrl = useContext(BaseUrlContext);
    const [url, setUrl] = useState(`${baseUrl}/products?offset=0&limit=5`);

    const { data, isLoading } = useQuery({
        queryKey: ["products", url],
        queryFn: async (): Promise<ProductResponse> => {
            const response = await fetch(url);
            return await response.json();
        },
    });

    return (
        <div className="container">
            <div className="manage">
                <div className="title">
                    <h2>Manage Products</h2>
                </div>
                <div className="manage-activities">
                    <button className="add-btn btn">New Product +</button>
                    <div className="search-bar">
                        <input placeholder="Search product" type="search" />
                        <FontAwesomeIcon
                            className="search-icon"
                            icon={faSearch}
                        />
                    </div>
                    <button className="filter-btn btn">
                        <FontAwesomeIcon icon={faFilter} /> Filter{" "}
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                </div>
                {isLoading && <div>Loading...</div>}
                {!isLoading && (
                    <div className="table-container">
                        <div className="table">
                            <div className="table-header row">
                                <div className="cell">Product ID</div>
                                <div className="cell">Product Name</div>
                                <div className="cell">Quantity</div>
                                <div className="cell">Category</div>
                                <div className="cell">Actions</div>
                            </div>
                            {data?.products?.map((product) => (
                                <div
                                    key={product.product_id}
                                    className="table-content row"
                                >
                                    <div className="cell">
                                        {product.product_id}
                                    </div>
                                    <div className="cell">
                                        {product.product_name}
                                    </div>
                                    <div className="cell">
                                        {product.quantity}
                                    </div>
                                    <div className="cell">
                                        {product.category.category_name}
                                    </div>
                                    <div className="cell">
                                        <button
                                            value={product.product_id}
                                            className="btn update-btn"
                                        >
                                            Update
                                        </button>
                                        <button
                                            value={product.product_id}
                                            className="btn remove-btn"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTable;
