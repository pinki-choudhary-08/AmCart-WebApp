import { IFeatures } from "./IFeatures";
import { IImageDetail } from "./IImageDetail";

export interface IProductDetail {
    id: string;
    productId: string;
    shortDescription: string;
    longDescription: string;
    superCategory: string[];
    title: string;
    department: string;
    brand: string;
    sku: string;
    quantity: number;
    price: string;
    createDate: Date;
    modifiedDate: Date;
    media: IImageDetail[];
    features: IFeatures;
}
