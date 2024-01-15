import { renderOrderSummary } from "../../js/checkout/orderSummary.js";
import { loadFromStorange ,cart} from "../../data/cart.js";


describe("test Suite: renderOrderSummary",()=>{
    const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
    beforeEach(()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: productId1,
                quantity:5,
                deliveryOption:'1'
            },
            {
                productId: productId2,
                quantity:3,
                deliveryOption:'2'
            }]);
        });

        loadFromStorange();

        document.querySelector(".js-test-container").innerHTML=`
        <div class="js-checkout-header"></div>    
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>  `;

        renderOrderSummary();
    })

    it("display the cart",()=>{

        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 5');
        
        document.querySelector(".js-test-container").innerHTML=''
    })

    it("remove a product",()=>{
        
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelector(`.js-delete-link-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-delete-link-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    
        document.querySelector(".js-test-container").innerHTML=''
    });
});