export function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

export const roundNumbers = ({ number, decimalOffset }) => {
    const decimalsFactor = 10 ** decimalOffset;
    return Math.round(number * decimalsFactor) / decimalsFactor;
};
