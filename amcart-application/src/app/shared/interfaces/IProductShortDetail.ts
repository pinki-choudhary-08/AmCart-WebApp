import { IFeatures } from './IFeatures';
import { IImageDetail } from './IImageDetail';

export interface IProductShortDetail {
        productId: string;
        sku: string;
        quantity: number;
        media: IImageDetail[];
        features: IFeatures;
        shortDescription: string;
        price: number;
        tax: number;
}
