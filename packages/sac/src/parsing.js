export const camalize = str => {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const pascalize = str => {
    const camel = camalize(str);
    return camel.charAt(0).toUpperCase() + camel.substr(1);
};

export const reverseString = str =>
    str
        .split('')
        .reverse()
        .join('');

export default { camalize, reverseString };
