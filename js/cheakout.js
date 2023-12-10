import { cart,deleteCartItem }  from '../data/cart.js';
import { products } from "../data/products.js";
import { formatcurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delivaryOptions } from '../data/delivaryOptions.js';

console.log(dayjs());
let cartSummaryHTML='';
cart.forEach((cartItem)=>{
    let productId=cartItem.productId;
    let matchProduct;
    products.forEach((product)=>{
        if(product.id===productId){
            matchProduct=product;
        }
    })
    let delivaryOptionId=cartItem.delivaryOption;
    let delivaryOption
    delivaryOptions.forEach((option=>{
        if(option.id=== delivaryOptionId){
            delivaryOption=option
        }
    }))
    const today = dayjs();
    const delivaryDate = today.add(
        delivaryOption.delivaryDays,'days' 
    );
    const dayString = delivaryDate.format('dddd, MMMM D');


    cartSummaryHTML+=`
        <div class="cart-item-container 
            js-cart-item-container-${productId}
        ">
            <div class="delivery-date">
            Delivery date: ${dayString}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchProduct.name}
                </div>
                <div class="product-price">
                $${formatcurrency(matchProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id=${productId}   >
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${delivaryOptionHTML(productId,cartItem)}
            </div>
            </div>
    </div>

    `
})
document.querySelector(".js-cart-item-container").innerHTML=cartSummaryHTML;

function delivaryOptionHTML(productId,cartItem){
    let HTML='';
    delivaryOptions.forEach((delivaryOption)=>{
        const today = dayjs();
        const delivaryDate = today.add(
            delivaryOption.delivaryDays,'days'
        );
        const dayString = delivaryDate.format('dddd, MMMM D');
        const priceSring = delivaryOption.priceCent===0 ? 'FREE ': `$${formatcurrency(delivaryOption.priceCent)} - `;
        const ischecked= delivaryOption.id===cartItem.delivaryOption;

         HTML+=`
                <div class="delivery-option">
                <input type="radio"
                    ${ischecked? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                    ${dayString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceSring}Shipping
                    </div>
                </div>
                </div>
        
        `
    }
    )
    return(HTML)
}

document.querySelectorAll(".js-delete-link")
    .forEach((deleteLink)=>{
        deleteLink.addEventListener('click',()=>{
            let productId=deleteLink.dataset.productId;
            deleteCartItem(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
        })
    })
