import { cart,deleteCartItem, ubdateDeliveryOption , updateQuantity}  from '../../data/cart.js';
import { products,getProduct } from "../../data/products.js";
import { formatcurrency } from '../utils/money.js';
import { deliveryOptions ,getDeliveryOption,calculateDeliverDate} from '../../data/delivaryOptions.js';
import { renderpaymentsummary } from './paymentSummary.js';
import { renderCheckOutHeader } from './checkOutHeader.js';


export function renderOrderSummary(){
    let cartSummaryHTML='';
    cart.forEach((cartItem)=>{
        let productId=cartItem.productId;
        const matchProduct = getProduct(productId)

        let deliveryOptionId=cartItem.deliveryOption;
        const deliveryOption = getDeliveryOption(deliveryOptionId)
        const dayString = calculateDeliverDate(deliveryOption)
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
                        Quantity: <span class="quantity-label  js-quantity-label-${matchProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchProduct.id}">
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link"
                        data-product-id="${matchProduct.id}">
                            Save
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

            const dayString = calculateDeliverDate(deliveryOption);
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


    

    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
        });
    });

    document.querySelectorAll('.js-save-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        const quantityInput = document.querySelector(
            `.js-quantity-input-${productId}`
        );
        const newQuantity = Number(quantityInput.value);
        updateQuantity(productId, newQuantity);

        // renderCheckoutHeader();
        renderOrderSummary();
        // renderPaymentSummary();

        // We can delete the code below (from the original solution)
        // because instead of using the DOM to update the page directly
        // we can use MVC and re-render everything. This will make sure
        // the page always matches the data.

        // const quantityLabel = document.querySelector(
        //   `.js-quantity-label-${productId}`
        // );
        // quantityLabel.innerHTML = newQuantity;

        // updateCartQuantity();
        });
    });    



    renderCheckOutHeader();
    renderpaymentsummary();
}
