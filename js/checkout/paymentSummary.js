import { cart, getNumberOfCartItem}  from '../../data/cart.js';
import {getProduct } from "../../data/products.js";
import { formatcurrency } from '../utils/money.js';
import { getDeliveryOption } from '../../data/delivaryOptions.js';
export function renderpaymentsummary(){

    let CartPriceCents=0;
    let shippingPriceCents=0;

    cart.forEach(cartitem => {

        const matchProduct= getProduct(cartitem.productId);
        let priceCents = matchProduct.priceCents * cartitem.quantity;
        CartPriceCents+=priceCents;

        const delivaryOption = getDeliveryOption(cartitem.deliveryOption)
        shippingPriceCents+=delivaryOption.priceCent
    });

    const PriceCentswithOutTax = CartPriceCents+shippingPriceCents;
    const taxPriceCents = PriceCentswithOutTax * 0.1
    const PriceCentswithTax = PriceCentswithOutTax + taxPriceCents

    let html=`
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${getNumberOfCartItem()}):</div>
        <div class="payment-summary-money
        
        ">$${formatcurrency(CartPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money
        js-payment-summary-money-shipment
        ">$${formatcurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatcurrency(PriceCentswithOutTax)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatcurrency(taxPriceCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money
        js-payment-summary-total-money">$${formatcurrency(PriceCentswithTax)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `

    document.querySelector('.js-payment-summary').innerHTML=html;
    

}