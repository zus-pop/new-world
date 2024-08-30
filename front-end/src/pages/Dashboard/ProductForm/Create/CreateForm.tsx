import { Form, useNavigate } from "react-router-dom";
import "./CreateForm.css";
import { FormEvent, useEffect } from "react";
import { ProductRequestBody } from "../../../../types/ProductRequestBody";
import { createProduct, getAllCategories } from "../../../../api/queries";

const CreateForm = () => {
    const { categories } = getAllCategories();
    const navigate = useNavigate();

    const { mutate: create, isPending, isError, isSuccess } = createProduct();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const product: ProductRequestBody = {
            product_name: formData.get("product_name")! as string,
            category_id: +formData.get("category_id")!,
            quantity: +formData.get("quantity")!,
        };
        create(product);
    };
    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard/product");
        }
    }, [isSuccess]);

    return (
        <div className="form-container">
            <div className="form">
                <h4 className="form-title">Create New Product</h4>
                <Form method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="product_name">Product Name</label>
                    </div>
                    <div>
                        <input
                            id="product_name"
                            name="product_name"
                            type="text"
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
                            required
                            placeholder="Enter Quantity"
                        />
                    </div>
                    <div>
                        <label htmlFor="category_id">Product Category</label>
                    </div>
                    <div>
                        <select required name="category_id" id="category_id">
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
                        <button type="submit">Create</button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CreateForm;
