import { cart,deleteCartItem, ubdateDeliveryOption }  from '../../data/cart.js';
import { products,getProduct } from "../../data/products.js";
import { formatcurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {isweekend, deliveryOptions ,getDeliveryOption,calculateDeliverDate} from '../../data/delivaryOptions.js';
import { renderpaymentsummary } from './paymentSummary.js';
import { renderCheckOutHeader } from './checkOutHeader.js';


export function renderOrderSummary(){
    // const today1 =(dayjs());
    // let newdate1= today1.add(1,'day')
    // console.log(today1.format('dddd'))
    // console.log(newdate1.format('dddd'))
    // console.log(isweekend(newdate1.format('dddd')))
  
    let cartSummaryHTML='';
    cart.forEach((cartItem)=>{
        let productId=cartItem.productId;
        const matchProduct = getProduct(productId)

        let deliveryOptionId=cartItem.deliveryOption;
        const deliveryOption = getDeliveryOption(deliveryOptionId)
        const dayString = calculateDeliverDate(deliveryDate)
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
                    ${deliveryOptionHTML(productId,cartItem)}
                </div>
                </div>
        </div>

        `

    })
    document.querySelector(".js-cart-item-container").innerHTML=cartSummaryHTML;

    function deliveryOptionHTML(productId,cartItem){
        let HTML='';
        deliveryOptions.forEach((deliveryOption)=>{

            const dayString = calculateDeliverDate(deliveryOptionS);
            const priceSring = deliveryOption.priceCent===0 ? 'FREE ': `$${formatcurrency(deliveryOption.priceCent)} - `;
            const ischecked= deliveryOption.id===cartItem.deliveryOption;

            HTML+=`
                    <div class="delivery-option js-delivery-option"
                        data-product-id='${productId}'
                        data-delivery-option-id ='${deliveryOption.id}'    
                    >
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
                
                renderOrderSummary();
                // document.querySelector(`.js-cart-item-container-${productId}`).remove();
            })
        })

    document.querySelectorAll(".js-delivery-option")
        .forEach((element)=>{
            element.addEventListener('click',()=>{
                const {productId,deliveryOptionId}=element.dataset;
                ubdateDeliveryOption(productId , deliveryOptionId);

                renderOrderSummary();

            })
        })


    

    renderCheckOutHeader();
    renderpaymentsummary();
}
