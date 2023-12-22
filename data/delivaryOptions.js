export function getDeliveryOption(deliveryOptionId){
    let deliveryOption
        deliveryOptions.forEach((option=>{
            if(option.id=== deliveryOptionId){
                deliveryOption=option
            }
        }))

    return deliveryOption
}

export function calculateDeliverDate(deliveryOption){
    const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,'days' 
        );
        const dayString = deliveryDate.format('dddd, MMMM D');
        return dayString
}

export function isweekend(day){
    if(day=='Saturday' || day=='Sunday'){
        return true
    }
    else{
        return false
    }
}

export let deliveryOptions=[{
    id:'1',
    deliveryDays:7,
    priceCent:0
},
{
    id:'2',
    deliveryDays:3,
    priceCent:499
},
{
    id:'3',
    deliveryDays:1,
    priceCent:999
}
]