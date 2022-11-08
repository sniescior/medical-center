export const getExaminationsCount = (searchParams, setExaminationsCount, setLoader, setError) => {
    setLoader(true);
    fetch('/api/examinations/count-examinations?' + searchParams, {
        method: 'GET'
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
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
            if(response.ok) {
                return response.json();
            }
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