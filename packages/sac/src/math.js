export function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}

export const roundNumbers = ({ number, decimalOffset }) => {
    const decimalsFactor = 10 ** decimalOffset;
    return Math.round(number * decimalsFactor) / decimalsFactor;
};

export const average = array => {
    if (!array.length) return null;
    return array.reduce((accumulator, current) => accumulator + current) / array.length;
};
