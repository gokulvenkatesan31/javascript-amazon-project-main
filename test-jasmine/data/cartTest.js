import { addToCart,loadFromStorange ,cart,deleteCartItem} from "../../data/cart.js";

describe("test suite: addToCart",()=>{
    beforeEach(()=>{
        spyOn(localStorage,'setItem');
    });
    it("add new product to cart",()=>{
        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });

        loadFromStorange();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(('cart'),JSON.stringify([{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:1,
            deliveryOption:'1'
        }]));
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });

    it("add an existing product to cart",()=>{
        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:1,
                deliveryOption:'1'
            }]);
        });
        
        loadFromStorange();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(('cart'),JSON.stringify([{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOption:'1'
        }]));
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

    });

    

});
describe("test suite: removeCartItem",()=>{
    beforeEach(()=>{
        spyOn(localStorage,'setItem');
    });
    it("remove product from the cart",()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:1,
                deliveryOption:'1'
            }]);
        });
        loadFromStorange();
        deleteCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });
    
    it("if product not in cart don't remove product from the cart",()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:1,
                deliveryOption:'1'
            }]);
        });
        loadFromStorange();
        deleteCartItem('dont remove');

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:1,
            deliveryOption:'1'
        }]));
    });
})