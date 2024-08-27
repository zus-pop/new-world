import "./ProductCard.css";
import placeholder from "../../assets/placeholder.png";
import { Product } from "../../types/Product";

interface ProductProps {
    product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
    return (
        <div className="product-card">
            <img
                className="product-img"
                src={placeholder}
                alt="product-image"
            />
            <h2 className="product-title">{product?.product_name}</h2>
            <p className="product-quantity">{product?.quantity} remain</p>
            <button className="add-to-cart-btn">Add to cart</button>
        </div>
    );
};

export default ProductCard;
