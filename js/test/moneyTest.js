import { formatcurrency } from "../utils/money.js";

console.log("test suite: formatcurrency")

console.log("converts cents to doller")
if(formatcurrency(1202)=== '12.02'){
    console.log("passed")
}else{
    console.log("failed")
}


console.log("works with zero")
if(formatcurrency(1200.5)=== '12.01'){
    console.log("passed")
}else{
    console.log("failed")
}


console.log("roundup to the nearest cent")
if(formatcurrency(0)=== '0.00'){
    console.log("passed")
}else{
    console.log("failed")
}