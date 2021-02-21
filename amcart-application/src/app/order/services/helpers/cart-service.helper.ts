import { IProductDetail } from "src/app/shared/interfaces/IProductDetail";
import { CartDetail } from "src/app/shared/model/CartDetail";
import { ProductShortDetail } from "src/app/shared/model/ProductShortDetail";

export class CartServiceHelper {

    public static toDTO(productDetail: IProductDetail, customerId: string, cartId: string, cartQuantity: number): CartDetail {
        const cartInputDetails = new CartDetail();
        var productInfo = new ProductShortDetail();
        productInfo.productId = productDetail.productId;
        productInfo.sku = productDetail.sku;
        productInfo.productId = productDetail.productId;
        productInfo.media = productDetail.media;
        productInfo.brand = productDetail.brand;
        productInfo.features = productDetail.features;
        productInfo.price = productDetail.price;
        productInfo.quantity = productDetail.quantity;
        productInfo.cartQuantity = cartQuantity;
        cartInputDetails.customerId = customerId;
        cartInputDetails.cartId = cartId;
            cartInputDetails.productInfo = new Array<ProductShortDetail>();
        cartInputDetails.productInfo.push(productInfo);

        return cartInputDetails;
    }
}