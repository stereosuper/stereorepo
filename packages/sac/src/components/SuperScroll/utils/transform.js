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

export const transform = (element, xFloat, yFloat, delay) => {
    const [x, y] = [xFloat, yFloat].map(float =>
        roundNumbers({ number: float, decimalOffset: 2 }),
    );
    let transform;

    if (!delay) {
        transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
    } else {
        let start = getTranslate(element);
        let lerpX = lerp(start.x, x, delay);
        let lerpY = lerp(start.y, y, delay);

        transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${lerpX},${lerpY},0,1)`;
    }

    element.style.webkitTransform = transform;
    element.style.msTransform = transform;
    element.style.transform = transform;

    return { x, y };
};
