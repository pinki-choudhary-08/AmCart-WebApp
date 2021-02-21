import { IFeatures } from '../interfaces/IFeatures';
import { IImageDetail } from '../interfaces/IImageDetail';

export class ProductShortDetail {
        productId!: string;
        sku!: string;
        quantity!: number;
        media!: IImageDetail[];
        features!: IFeatures;
        price!: string;
        title!: string;
        brand!: string;
        cartQuantity = 0;
}
