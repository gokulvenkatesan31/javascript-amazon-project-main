import { getNumberOfCartItem } from "../../data/cart.js";

export function renderCheckOutHeader(){
    const html=`<div class="header-content">
    <div class="checkout-header-left-section">
      <a href="index.html">
        <img class="amazon-logo" src="images/amazon-logo.png">
        <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
      </a>
    </div>

    <div class="checkout-header-middle-section">
      Checkout (<a class="return-to-home-link js-return-to-home-link "
        href="index.html">3 items</a>)
    </div>

    <div class="checkout-header-right-section">
      <img src="images/icons/checkout-lock-icon.png">
    </div>
  </div>`

    document.querySelector(".js-checkout-header").innerHTML=html;
    document.querySelector('.js-return-to-home-link').innerHTML=`${getNumberOfCartItem()} items`
}