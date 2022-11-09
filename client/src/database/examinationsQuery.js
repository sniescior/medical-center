export const getExaminationsCount = (searchParams, setExaminationsCount, setLoader, setError) => {
    setLoader(true);
    fetch('/api/examinations/count-examinations?' + searchParams, {
        method: 'GET'
    }).then(
        (response) => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(
        data => {
            setExaminationsCount(data.data.examinationsCount);
            setLoader(false);
        }
    ).catch((error) => {
        setLoader(false);
        setError({
            statusCode: error
        });
    });
}

export const getExaminations = (searchParams, setExaminations, setLoader, setError) => {
    setLoader(true);
    fetch('/api/examinations/get-examinations?' + searchParams, {
        method: 'GET'
    }).then(
        (response) => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(
        data => {
            setExaminations(data.data.examinations);
            setLoader(false);
        }
    ).catch((error) => {
        setLoader(false);
        setError({
            statusCode: error
        });
    });
}

export const addExamination = (params, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/examinations/add-examination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then(
        (response) => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(
        data => {
            setToastMessage(data.message);
            window.location.href = `/examinations`
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`);
    });
}

export const editExamination = (params, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/examinations/edit-examination', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then(
        (response) => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(
        data => {
            setToastMessage(data.message);
            window.location.href = `/examinations`
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`);
    });
}

export const deleteExamination = (params, setLoader, setToastMessage) => {
    console.log('Deleting');
    setLoader(true);
    fetch('/api/examinations/delete-examination', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then(
        (response) => {
            if(response.ok) { return response.json(); }
            throw (response.status);
        }
    ).then(
        data => {
            setToastMessage(data.message);
            window.location.href = `/examinations`
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`);
    });
}