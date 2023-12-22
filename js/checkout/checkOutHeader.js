import { getNumberOfCartItem } from "../../data/cart.js";

export function renderCheckOutHeader(){
    document.querySelector('.js-return-to-home-link').innerHTML=`${getNumberOfCartItem()} items`
}