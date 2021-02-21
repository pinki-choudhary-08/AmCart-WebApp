import { ProductShortDetailOrder } from "./ProductShortDetailOrder";

export class Order {
        public id!: string;
        public promotionId!: string;
        public billingAddressId!: string;
        public receipentAddressId!: string;
        public customerId!: string;
        public invoiceNumber!: string;
        public products!: ProductShortDetailOrder[];
}
