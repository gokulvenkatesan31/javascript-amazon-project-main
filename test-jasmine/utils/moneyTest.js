import { formatcurrency } from "../../js/utils/money.js";


describe("test suite: formatcurrency", ()=>{
    it("converts cents to doller",()=>{
        expect(formatcurrency(1202)).toEqual('12.02');
    });

    it("works with zero",()=>{
        expect(formatcurrency(0)).toEqual('0.00');
    });
    
    it("roundup to the nearest cent",()=>{
        expect(formatcurrency(1200.5)).toEqual('12.01');
    });
    it("works with negative numbers",()=>{
        expect(formatcurrency(-1232)).toEqual('-12.32');
    });
});