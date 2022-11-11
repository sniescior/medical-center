
/**
 * 
 * -------------------------------- GET METHODS --------------------------------
 * 
 */

export const getArrayQuery = (urlString, params, setArray, setError, setLoader) => {
    setLoader(true);
    fetch(urlString + params, {
        method: 'GET'
    }).then(
        response => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(data => {
        setLoader(false);
        setArray(data.data.items);
    }).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const getItemsCount = (urlString, params, setCount, setError, setLoader) => {
    setLoader(false);
    fetch(urlString + params, {
        method: 'GET'
    }).then(
        response => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(data => {
        setLoader(false);
        setCount(data.data.count);
    }).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

/**
 * 
 * -------------------------------- PUT METHODS --------------------------------
 * 
 */

export const updateItem = (urlString, params, setToastMessage, setLoader) => {
    setLoader(false);
    fetch(urlString, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then(
        response => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(data => {
        setLoader(false);
        console.log(data);
    }).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
        setLoader(false);
    });
}

/**
 * 
 * -------------------------------- DELETE METHODS --------------------------------
 * 
 */

export const deleteItem = (urlString, params, setToastMessage, setLoader) => {
    setLoader(false);
    fetch(urlString, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then(
        response => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(data => {
        console.log(data);
        setToastMessage(data.message);
        window.location.reload();
    }).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
        setLoader(false);
    });
}

export const addItem = (urlString, params, setToastMessage, setLoader) => {
    setLoader(false);
    fetch(urlString, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then(
        response => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(data => {
        console.log(data);
        setToastMessage(data.message);
        window.location.reload();
    }).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
        setLoader(false);
    });
}