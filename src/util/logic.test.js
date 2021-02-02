import {create4Digits, getGuessAccuracy, getBulls, getCows, isGuessCorrect} from "./logic";

it("should return an array of 4 unique digits", function () {
    const t = create4Digits();
    expect(t).toHaveLength(4);
    expect(new Set(t).size).toEqual(4);
});

it("should return the accuracy of a guess", function () {
    const a = [1, 2, 3, 4];
    const g1 = [1, 2, 3, 4];
    const g2 = [1, 3, 2, 4];
    const g3 = [7, 8, 9, 6];

    expect(getGuessAccuracy(g1, a)).toStrictEqual([true, true, true, true]);
    expect(getGuessAccuracy(g2, a)).toStrictEqual([true, false, false, true]);
    expect(getGuessAccuracy(g3, a)).toStrictEqual([false, false, false, false]);
});

it("should determine a correct guess", function () {
    const a = [1, 2, 3, 4];
    const g1 = [1, 2, 3, 4];
    const g2 = [1, 2, 0, 4];
    const g3 = [7, 8, 9, 6];

    expect(isGuessCorrect(getGuessAccuracy(g1, a))).toBeTruthy();
    expect(isGuessCorrect(getGuessAccuracy(g2, a))).toBeFalsy();
    expect(isGuessCorrect(getGuessAccuracy(g3, a))).toBeFalsy();
});

it("should return the correct amount of Bulls for a guess", function () {
    const a = [1, 2, 3, 4];
    const g1 = [1, 2, 3, 4];
    const g2 = [1, 2, 7, 4];
    const g3 = [0, 2, 7, 4];
    const g4 = [0, 5, 3, 4];
    const g5 = [1, 3, 2, 4];
    const g6 = [0, 8, 2, 4];
    const g7 = [7, 8, 9, 6];
    const g8 = [4, 3, 2, 1];

    expect(getBulls(getGuessAccuracy(g1, a))).toBe(4);
    expect(getBulls(getGuessAccuracy(g2, a))).toBe(3);
    expect(getBulls(getGuessAccuracy(g3, a))).toBe(2);
    expect(getBulls(getGuessAccuracy(g4, a))).toBe(2);
    expect(getBulls(getGuessAccuracy(g5, a))).toBe(2);
    expect(getBulls(getGuessAccuracy(g6, a))).toBe(1);
    expect(getBulls(getGuessAccuracy(g7, a))).toBe(0);
    expect(getBulls(getGuessAccuracy(g8, a))).toBe(0);
});

it("should return the correct amount of Cows for a guess", function () {
    const a = [1, 2, 3, 4];
    const g1 = [1, 2, 3, 4];
    const g2 = [1, 2, 7, 4];
    const g3 = [0, 2, 7, 4];
    const g4 = [0, 5, 3, 4];
    const g5 = [1, 3, 2, 4];
    const g6 = [0, 8, 2, 4];
    const g7 = [7, 8, 9, 6];
    const g8 = [4, 3, 2, 1];
    const g9 = [5, 6, 9, 2];

    expect(getCows(g1, a)).toBe(4);
    expect(getCows(g2, a)).toBe(3);
    expect(getCows(g3, a)).toBe(2);
    expect(getCows(g4, a)).toBe(2);
    expect(getCows(g5, a)).toBe(4);
    expect(getCows(g6, a)).toBe(2);
    expect(getCows(g7, a)).toBe(0);
    expect(getCows(g8, a)).toBe(4);
    expect(getCows(g9, a)).toBe(1);
});
