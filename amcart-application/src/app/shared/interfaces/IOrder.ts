import {IProductShortDetail} from './IProductShortDetail';

export interface IOrder{
    id: string;
    products: IProductShortDetail[];

}
