import { IProductShortDetail } from "../interfaces/IProductShortDetail";

export class Order{
        public id?: string ;
        public promotionId?:string;
        public billingAddressId: string;
        public receipentAddressId: string;
        public customerId: string;
        public invoiceNumber?: string;
        public products : IProductShortDetail[];

        constructor(productId:string,promotionId:string,bAddressId: string,rAddressId: string, customerId:string, invoiceNumber: string,products: IProductShortDetail[]){
            this.id = productId;
            this.promotionId =promotionId;
            this.billingAddressId = bAddressId;
            this.receipentAddressId = rAddressId;
            this.customerId = customerId;
            this.invoiceNumber = invoiceNumber;
            this.products = products;
        }
        
}