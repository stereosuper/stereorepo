export const camalize = str => {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const reverseString = str =>
    str
        .split('')
        .reverse()
        .join('');

export default { camalize, reverseString };
