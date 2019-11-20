export function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}

export const roundNumbers = ({ number, decimalOffset }) => {
    const decimalsFactor = 10 ** decimalOffset;
    return Math.round(number * decimalsFactor) / decimalsFactor;
};
