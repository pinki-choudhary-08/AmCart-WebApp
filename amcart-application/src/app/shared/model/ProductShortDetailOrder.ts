import { IFeatures } from "../interfaces/IFeatures";
import { IImageDetail } from "../interfaces/IImageDetail";

export class ProductShortDetailOrder {
        productId!: string;
        sku!: string;
        quantity!: number;
        media!: IImageDetail[];
        features!: IFeatures;
        price!: number;
        tax!: number;
}