import React, { useEffect, useState } from "react";

function ButtonsRight(props) {
    return (
        <>
            <button 
                className="button-right" 
                onClick={() => { if(props.currentPage < props.pagesCount - 1) props.setPageNumber(props.currentPage + 1); }}
                >
                <i className="bi bi-chevron-right"></i>
            </button>
            <button 
                className="button-right" 
                onClick={() => { props.setPageNumber(props.pagesCount - 1); }}
                >
                <i class="bi bi-chevron-double-right"></i>
            </button>
        </>
    );
}

function ButtonsLeft(props) {
    return (
        <>
            <button 
                className="button-left" 
                onClick={() => { props.setPageNumber(0); }}
                >
                <i class="bi bi-chevron-double-left"></i>
            </button>
            <button 
                className="button-left" 
                onClick={() => { if(props.currentPage > 0) props.setPageNumber(props.currentPage - 1); }}
                >
                <i className="bi bi-chevron-left"></i>
            </button>
        </>
    );
}

export default function Pagination(props) {

    const [indicationNumbers, setIndicationNumbers] = useState([]);

    useEffect(() => {
        setIndicationNumbers([1, 2, 3, 4, 5, '...', props.pagesCount]);
    }, [props.pagesCount]);
    
    useEffect(() => {
        if(props.currentPage < 3) {
            setIndicationNumbers([1, 2, 3, 4, 5, '...', props.pagesCount]);
        } else if(props.currentPage > 3 && props.currentPage >= props.pagesCount - 1) {
            setIndicationNumbers([1, '...', props.currentPage - 3, props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1]);
        } else if(props.currentPage > 3 && props.currentPage >= props.pagesCount - 2) {
            setIndicationNumbers([1, '...', props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1, props.currentPage + 2]);
        } else if(props.currentPage > 3 && props.currentPage >= props.pagesCount - 3) {
            setIndicationNumbers([1, '...', props.currentPage - 1, props.currentPage, props.currentPage + 1, props.currentPage + 2, props.currentPage + 3]);
        } else {
            setIndicationNumbers([1, '...', props.currentPage, props.currentPage + 1, props.currentPage + 2, '...', props.pagesCount]);
        }
    }, [props.currentPage]);

    if(props.pagesCount == 0) {
        return (
            <div className="pagination">
                <button className="disabled">0</button>
            </div>
        );
    } else if(props.pagesCount == 1) {
        return (
            <div className="pagination">
                {props.pages.map(page => {
                    return (
                        <button onClick={() => { props.setPageNumber(page) }} className={props.currentPage == page ? 'active' : ''}>{page + 1}</button>
                    );
                })}
            </div>
        );
    } else if(props.pagesCount < 5) {
        return (
            <div className="pagination">
                <ButtonsLeft currentPage={props.currentPage} pagesCount={props.pagesCount} setPageNumber={props.setPageNumber} />
                {props.pages.map(page => {
                    return (
                        <button onClick={() => { props.setPageNumber(page) }} className={props.currentPage == page ? 'active' : ''}>{page + 1}</button>
                    );
                })}
                <ButtonsRight currentPage={props.currentPage} pagesCount={props.pagesCount} setPageNumber={props.setPageNumber} />
            </div>
        );
    } else {
        return (
            <div className="pagination">
                <ButtonsLeft currentPage={props.currentPage} pagesCount={props.pagesCount} setPageNumber={props.setPageNumber} />
                {indicationNumbers.map(element => {
                    if(element === '...') {
                        return(
                            <button className='disabled'>{element}</button>
                        );
                    } else {
                        return(
                            <button onClick={() => { props.setPageNumber(element - 1) }} className={props.currentPage == element - 1 ? 'active' : ''}>{element}</button>
                        );
                    }
                })}
                <ButtonsRight currentPage={props.currentPage} pagesCount={props.pagesCount} setPageNumber={props.setPageNumber} />
            </div>
        );
    }
};
