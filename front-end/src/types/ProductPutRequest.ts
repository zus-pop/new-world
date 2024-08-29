import { ProductRequestBody } from "./ProductRequestBody";

export interface ProductPutRequest {
    id: number,
    product: ProductRequestBody
}