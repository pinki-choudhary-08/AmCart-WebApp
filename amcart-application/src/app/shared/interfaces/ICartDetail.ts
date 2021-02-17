import { IImageDetail } from "./IImageDetail";
import {IProductQuantityDetail} from "./IProductQuantityDetail"

export interface ICartDetail{
    id:string;
    productDetails: IProductQuantityDetail[];
    userId: string;
    quantity: number;
}