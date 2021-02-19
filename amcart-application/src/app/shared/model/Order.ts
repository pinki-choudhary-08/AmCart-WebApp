import { IProductShortDetail } from "../interfaces/IProductShortDetail";

export class Order{
        public id?: string ;
        public promotionId?:string;
        public billingAddressId: string;
        public receipentAddressId: string;
        public customerId: string;
        public invoiceNumber?: string;
        public products : IProductShortDetail[];

        constructor(bAddressId: string,rAddressId: string,customerId:string,products: IProductShortDetail[]){
            this.billingAddressId = bAddressId;
            this.receipentAddressId = rAddressId;
            this.customerId = customerId;
            this.products = products;
        }
        
}