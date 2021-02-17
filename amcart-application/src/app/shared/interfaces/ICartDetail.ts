import { IImageDetail } from "./IImageDetail";
import {IProductShortDetail} from "./IProductShortDetail"

export interface ICartDetail{
    id:string;
    productDetails: IProductShortDetail[];
    userId: string;
    quantity: number;
}