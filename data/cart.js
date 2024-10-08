export let cart

loadFromStorange();

export function loadFromStorange(){
    cart=JSON.parse(localStorage.getItem('cart'))|| [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:5,
            deliveryOption:'1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:3,
            deliveryOption:'2'
        },
        {
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity:3,
            deliveryOption:'3'
        }
     ];
};
function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

 export function addToCart(productId){
    let matchItem;
            
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            matchItem=cartItem;
        }
    })
    if(matchItem){
        matchItem.quantity+=1;
    }
    else{
        cart.push({productId,quantity:1,deliveryOption:'1'});
    }
    saveToStorage();
 }

 export function deleteCartItem(productId){
    let newCart=[];

    cart.forEach((cartItem)=>{
        if(productId!=cartItem.productId){
            newCart.push(cartItem);

        }
    })
    cart=newCart;
    saveToStorage();

 }

 export function ubdateDeliveryOption(productId,deliveryOptionId){
    let matchItem;
    
    cart.forEach((item)=>{
        if(productId === item.productId){
            matchItem=item;
        }
    })
    if(matchItem){
        matchItem.deliveryOption=deliveryOptionId;
        saveToStorage();
    }
    
 }

 export function getNumberOfCartItem(){
    let numberOfCartItem=0;
    cart.forEach(cartItem=>{
        numberOfCartItem += cartItem.quantity ;
    })
    return numberOfCartItem;
 }

 export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    saveToStorage();
  }