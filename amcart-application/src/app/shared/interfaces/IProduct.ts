import { IImageDetail } from "./IImageDetail";

// Interface for product.
export interface IProduct {
    id: number;
    productId: string,
    name: string;
    sku: string;
    description: string;
    price: string;
    color: string;
    media: IImageDetail[];
}