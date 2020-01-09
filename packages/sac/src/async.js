/**
 * @description In an async function, wait allows us to wait in simple way with await
 * @author Alban Mezino <alban@stereosuper.fr>
 */
export const wait = async ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

/**
 * @description This function allows us to add a timeout between promises (not possible with Promise.all)
 * @author Alban Mezino <alban@stereosuper.fr>
 */
export const runPromisesSequence = async (
    { array, handler: handlerFunction, delay },
    callback,
) => {
    const arrayLength = array.length;
    for (let index = 0; index < arrayLength; index += 1) {
        await handlerFunction(array[index], index).then(() => {
            return wait(delay);
        });
    }
    if (callback) {
        callback();
    }
};
