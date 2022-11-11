export const getItemQuery = (urlString, params, setItem, setError, setLoader) => {
    setLoader(true);
    fetch(urlString + params).then(
        response => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(data => {
        setLoader(false);
        setItem(data.data.item);
    }).catch((error) => {
        setError({
            statusCode: error
        });
    });
}