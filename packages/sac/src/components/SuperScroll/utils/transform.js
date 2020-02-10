import { lerp, roundNumbers } from '../../../math';

export function getTranslate(el) {
    const translate = {};
    if (!window.getComputedStyle) return;

    const style = getComputedStyle(el);
    const transform =
        style.transform || style.webkitTransform || style.mozTransform;

    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);

    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

    return translate;
}

export const transform = (element, xFloat, yFloat, lerpAmount) => {
    const [roundedX, roundedY] = [xFloat, yFloat].map(float =>
        roundNumbers({ number: float, decimalOffset: 2 })
    );

    let x = roundedX;
    let y = roundedY;

    if (lerpAmount) {
        const start = getTranslate(element);
        x = lerp(start.x, x, lerpAmount);
        y = lerp(start.y, y, lerpAmount);
    }

    const transformValue = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;

    element.style.webkitTransform = transformValue;
    element.style.msTransform = transformValue;
    element.style.transform = transformValue;

    return { x, y };
};
