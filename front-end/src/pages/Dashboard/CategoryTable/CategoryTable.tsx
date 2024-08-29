import {
    faSearch,
    faFilter,
    faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CategoryTable.css";
import { useContext, useState } from "react";
import { BaseUrlContext } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../../types/Category";

const CategoryTable = () => {
    const baseUrl = useContext(BaseUrlContext);
    const [url, setUrl] = useState(`${baseUrl}/categories?offset=0&limit=5`)
    const { data: categories, isLoading } = useQuery({
        queryKey: ["products", url],
        queryFn: async (): Promise<Category[]> => {
            const response = await fetch(url);
            return await response.json();
        },
    });

    return (
        <div className="container">
            <div className="manage">
                <div className="title">
                    <h2>Manage Categories</h2>
                </div>
                <div className="manage-activities">
                    <button className="add-btn btn">New Category +</button>
                    <div className="search-bar">
                        <input placeholder="Search category" type="search" />
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
                                <div className="cell">Category ID</div>
                                <div className="cell">Category Name</div>
                                <div className="cell">Actions</div>
                            </div>
                            {categories?.map((category) => (
                                <div
                                    key={category.category_id}
                                    className="table-content row"
                                >
                                    <div className="cell">
                                        {category.category_id}
                                    </div>
                                    <div className="cell">
                                        {category.category_name}
                                    </div>
                                    <div className="cell">
                                        <button className="btn update-btn">
                                            Edit
                                        </button>
                                        <button className="btn remove-btn">
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

export default CategoryTable;
