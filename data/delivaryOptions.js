import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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
    let numberOfDays=deliveryOption.deliveryDays;
    let deliveryDate=today;
    while(numberOfDays>0){
        deliveryDate =deliveryDate.add(1,'days');
        if(!isweekend(deliveryDate)){
            numberOfDays--;
        }
    }
    // const deliveryDate = today.add(
    //     deliveryOption.deliveryDays,'days' 
    // );
    const dayString = deliveryDate.format('dddd, MMMM D');
    return dayString
}

function isweekend(date){
    const day=date.format('dddd')
    return day=='Saturday' || day=='Sunday'
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