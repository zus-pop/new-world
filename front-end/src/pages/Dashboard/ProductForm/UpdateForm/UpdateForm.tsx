import { Form, useNavigate, useParams } from "react-router-dom";
import "./UpdateForm.css";
import { FormEvent, useEffect } from "react";
import { ProductRequestBody } from "../../../../types/ProductRequestBody";
import {
    getAllCategories,
    getProductById,
    updateProduct,
} from "../../../../api/queries";

const UpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { categories } = getAllCategories();
    const { product, isLoading } = getProductById(+id!);
    const { mutate: update, isPending, isError, isSuccess } = updateProduct();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const product: ProductRequestBody = {
            product_name: formData.get("product_name")! as string,
            category_id: +formData.get("category_id")!,
            quantity: +formData.get("quantity")!,
        };
        const id: number = +formData.get("product_id")!;
        update({ id, product });
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard/product");
        }
    }, [isSuccess]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="form-container">
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <div className="form">
                    <h4 className="form-title">Update Product</h4>
                    <Form method="POST" onSubmit={handleSubmit}>
                        <input
                            name="product_id"
                            hidden
                            readOnly
                            value={product?.product_id}
                            type="number"
                        />
                        <div>
                            <label htmlFor="product_name">Product Name</label>
                        </div>
                        <div>
                            <input
                                id="product_name"
                                name="product_name"
                                type="text"
                                defaultValue={product?.product_name}
                                required
                                placeholder="Enter Product Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity</label>
                        </div>
                        <div>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                defaultValue={product?.quantity}
                                required
                                placeholder="Enter Quantity"
                            />
                        </div>
                        <div>
                            <label htmlFor="category_id">
                                Product Category
                            </label>
                        </div>
                        <div>
                            <select
                                defaultValue={product?.category?.category_id}
                                required
                                name="category_id"
                                id="category_id"
                            >
                                <option disabled>Choose Category</option>
                                {categories?.map((category) => (
                                    <option
                                        key={category.category_id}
                                        value={category.category_id}
                                    >
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {isError && <p className="message">Error!</p>}
                        {isPending && <p className="message">Pending...</p>}
                        <div className="create-btn">
                            <button name="product_id" type="submit">
                                Update
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default UpdateForm;
