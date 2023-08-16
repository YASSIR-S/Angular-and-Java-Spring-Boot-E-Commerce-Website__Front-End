import { CartItem } from "./cart-item"

export class OrderItem {

    imgUrl:string
    unitPrice:number
    quantity:number
    productId:string
  
 
    constructor(cartItem:CartItem){
        this.imgUrl=cartItem.imageUrl;
        this.unitPrice=cartItem.unitPrice;
        this.quantity =cartItem.quantity;
        this.productId = cartItem.id;
    }
}
