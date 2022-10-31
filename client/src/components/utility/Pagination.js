import React from "react";


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
    if(props.pagesCount == 1) {
        return (
            <div className="pagination">
                {props.pages.map(page => {
                    return (
                        <button onClick={() => { props.setPageNumber(page) }} className={props.currentPage == page ? 'active' : ''}>{page + 1}</button>
                    )
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
                    )
                })}
                <ButtonsRight currentPage={props.currentPage} pagesCount={props.pagesCount} setPageNumber={props.setPageNumber} />
            </div>
        );
    } else {
        return (
            <div className="pagination">
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
                <p>...</p>
                <button className={props.currentPage + 1 == 1 ? 'active' : ''}>1</button>
                <button className={props.currentPage + 1 == 1 ? 'active' : ''}>2</button>
                <button className={props.currentPage + 1 == 1 ? 'active' : ''}>3</button>
                <p>...</p>
                <input />
                <p>...</p>
                <button>{props.pages.length}</button>
            </div>
        );
    }
};
