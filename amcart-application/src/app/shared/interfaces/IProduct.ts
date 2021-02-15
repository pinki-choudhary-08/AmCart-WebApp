import { IImageDetail } from "./IImageDetail";

// Interface for product.
export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: string;
    color: string;
    media: IImageDetail[];
}