import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductTable.css";
import {
    faAngleDown,
    faFilter,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProduct, removeProduct } from "../../../api/queries";

const ProductTable = () => {
    const navigate = useNavigate();
    const { data, isLoading, url, setUrl } = getAllProduct(0, 5);
    const {
        mutate: remove,
        isPending,
        isError,
        isSuccess,
    } = removeProduct(url);

    const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
        if (window.confirm("Are you sure?")) {
            const id: number = +e.currentTarget.value;
            remove(id);
        }
    };

    const goPrevious = (_: MouseEvent<HTMLButtonElement>) => {
        setUrl(data?.previous as string);
    };

    const goNext = (_: MouseEvent<HTMLButtonElement>) => {
        setUrl(data?.next as string);
    };

    return (
        <div className="container">
            <div className="manage">
                <div className="title">
                    <h2>Manage Products</h2>
                </div>
                <div className="manage-activities">
                    <button
                        onClick={() => navigate("/dashboard/product/create")}
                        className="add-btn btn"
                    >
                        New Product +
                    </button>
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
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/product/edit/${product.product_id}`
                                                )
                                            }
                                            className="btn update-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={handleRemove}
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
                {isError && <div>Error!</div>}
                {isPending && <div>Pending...</div>}
                {isSuccess && <div>Success</div>}

                <div className="page-active">
                    <button
                        onClick={goPrevious}
                        disabled={!data?.previous}
                        className="page-btn"
                    >
                        Previous
                    </button>
                    <button
                        onClick={goNext}
                        disabled={!data?.next}
                        className="page-btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
