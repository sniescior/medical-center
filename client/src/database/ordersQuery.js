
/**
 * 
 * -------------------------------- GET METHODS --------------------------------
 * 
 */

 export const getItem = (urlString, params, setItem, setError, setLoader) => {
    setLoader(true);
    
    return new Promise((resolve, reject) => {
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
    });
}

export const getArrayQuery = (urlString, params, setError, setLoader) => {
    setLoader(true);

    return new Promise((resolve, reject) => {
        fetch(urlString + params, {
            method: 'GET'
        }).then(
            response => {
                if(response.ok) { return response.json(); }
                throw (response.status);
            }
            ).then(data => {
                setLoader(false);
                if(!data.data.items) { resolve([]); }
                resolve(data.data.items);
            }).catch((error) => {
                setError({
                    statusCode: error
                });
            });
        }
    )
}

export const getItemsCount = (urlString, params, setCount, setError, setLoader) => {
    setLoader(false);

    return new Promise((resolve, reject) => {
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
    });
}

/**
 * 
 * -------------------------------- PUT METHODS --------------------------------
 * 
 */

export const updateItem = (urlString, params, setToastMessage, setLoader) => {
    setLoader(true);

    return new Promise((resolve, reject) => {
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
            resolve(data);
        }).catch((error) => {
            setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
            setLoader(false);
        });
    });
}

/**
 * 
 * -------------------------------- DELETE METHODS --------------------------------
 * 
 */

export const deleteItem = (urlString, params, setToastMessage, setLoader) => {
    setLoader(true);

    return new Promise((resolve, reject) => {
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
            resolve(data)
        }).catch((error) => {
            setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
            setLoader(false);
        });
    })
}

/**
 * 
 * -------------------------------- POST METHODS --------------------------------
 * 
 */

export const addItem = (urlString, params, setToastMessage, setLoader) => {
    setLoader(true);

    return new Promise((resolve, reject) => {
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
            resolve(data);
        }).catch((error) => {
            setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
            setLoader(false);
        });
    });
}
