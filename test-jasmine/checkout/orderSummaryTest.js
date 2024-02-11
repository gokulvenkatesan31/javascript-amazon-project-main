import { renderOrderSummary } from "../../js/checkout/orderSummary.js";
import { loadFromStorange ,cart,ubdateDeliveryOption} from "../../data/cart.js";

const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
describe("test Suite: renderOrderSummary",()=>{
    
    beforeEach(()=>{
        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: productId1,
                quantity:2,
                deliveryOption:'1'
            },
            {
                productId: productId2,
                quantity:1,
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

    afterEach(()=>{
        document.querySelector(".js-test-container").innerHTML='';
    })

    it("display the cart",()=>{

        expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs')
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$10.90');
    });
    it("remove a product",()=>{
        
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelector(`.js-delete-link-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-delete-link-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        
    });
    it("ubdate the delvery Option",()=>{
        (document.querySelector(`.js-delivary-option-product-id-${productId1}-delivary-option-id-${'3'}`).click());
        expect(document.querySelector(`.js-delivary-option-input-product-id-${productId1}-delivary-option-id-3`).checked).toEqual(true);

        expect(cart.length).toEqual(2);
        expect(cart[0].deliveryOption).toEqual('3');
        expect(document.querySelector(`.js-payment-summary-money-shipment`).innerText).toEqual('$14.98')
        expect(document.querySelector(`.js-payment-summary-total-money`).innerText).toEqual('$63.50')
    })
});

describe("test suite: ubdateDeliveryOption",()=>{
    beforeEach(()=>{
        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: productId1,
                quantity:2,
                deliveryOption:'1'
            },
            {
                productId: productId2,
                quantity:1,
                deliveryOption:'2'
            }]);
        });

        loadFromStorange();
})
    it('ubdate delivery option',()=>{

        ubdateDeliveryOption(productId1,'3')

        expect(cart.length).toEqual(2);
        expect(cart[0].deliveryOption).toEqual('3');  
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: productId1,
            quantity:2,
            deliveryOption:'3'
        },
        {
            productId: productId2,
            quantity:1,
            deliveryOption:'2'
        }]));
    })
    it("if product not in cart don't ubdate delivery option from the cart",()=>{
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        
    })
})