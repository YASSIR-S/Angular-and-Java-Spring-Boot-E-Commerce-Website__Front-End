import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  


  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }


  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistingInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;


    if (this.cartItems.length > 0) {

      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }


      }

      alreadyExistingInCart = (existingCartItem != undefined);

    }

    if (alreadyExistingInCart) {
      existingCartItem.quantity++;

    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    //publish values

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);


    //debug
    this.logCartData(totalPriceValue, totalQuantityValue);


  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log("cart content");

    for (let temp of this.cartItems) {

      let subTotal = temp.quantity * temp.unitPrice;


      console.log(temp.name + "    " + temp.unitPrice + "   " + temp.quantity + "   " + subTotal);

    }

    console.log(totalPriceValue+"    "+totalQuantityValue);
    console.log("---------------          ")

  }

  decrementQuantity(cartItem: CartItem) {
      cartItem.quantity--;

      if(cartItem.quantity===0){
        this.remove(cartItem);
      }else{
        this.computeCartTotals();
      }
    
    
    }
  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(temp => temp.id === cartItem.id)

    if(itemIndex >-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
    else{
      this.computeCartTotals();
    }


  }

}