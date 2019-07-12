export const roundNumbers = (number, decimalNumber) => {
    const decimalsFactor = 10 ** decimalNumber;
    return Math.round(number * decimalsFactor) / decimalsFactor;
};

export default {
    roundNumbers,
};
