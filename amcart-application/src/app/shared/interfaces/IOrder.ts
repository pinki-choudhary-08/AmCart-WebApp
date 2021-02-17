import { IProduct } from "./IProduct";
import {IProductQuantityDetail} from './IProductQuantityDetail';

export interface IOrder{
    id: string;
    products: IProductQuantityDetail[];

}