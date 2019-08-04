export const roundNumbers = ({ number, decimalOffset }) => {
    const decimalsFactor = 10 ** decimalOffset;
    return Math.round(number * decimalsFactor) / decimalsFactor;
};

export default {
    roundNumbers
};
