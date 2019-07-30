const fetchDataFactory = () => {
    const fetchSomeData = ({
        url,
        method,
        fetchParams = {},
        headersContent = {},
        data = {},
        cb
    }) => {
        const headers = new Headers({
            ...headersContent
        });

        const params = {
            method,
            ...fetchParams,
            headers
        };

        if (method === 'POST' || method === 'PUT') {
            params.body = JSON.stringify(data);
        }

        fetch(url, params)
            .then(response => response.json())
            .then(response => {
                if (cb) {
                    cb(response);
                }
            });
    };
    return Object.freeze({
        fetch: fetchSomeData
    });
};

export const fetchData = fetchDataFactory();

export default { fetchData };
