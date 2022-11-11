export const getItemQuery = (urlString, params, setItem, setError, setLoader) => {
    setLoader(true);
    fetch('/api/projects/get-participant?' + params).then(
        response => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(data => {
        setLoader(false);
        setItem(data.data.item);
        console.log(data.data.item);
    }).catch((error) => {
        setError({
            statusCode: error
        });
    });
}