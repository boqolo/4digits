import {un} from "src/components/FourDigits";

it("should return an array of 4 unique digits", function () {
    const t = un();
    expect(t.length).toEqual(4);
});