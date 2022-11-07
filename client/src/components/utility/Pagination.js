import React, { useEffect } from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
import '../../styles/pagination/pagination.css';

export default function Pagination(props) {
    const {
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        setPageNumber,
        pagesCount
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    const nextPage = () => {
        if(currentPage < pagesCount) { setPageNumber(currentPage + 1); }
    }

    const prevPage = () => {
        if(currentPage > 1) { setPageNumber(currentPage - 1); }
    }    

    return (
        <div className="pagination-wrapper">
            <button onClick={prevPage}><i className="bi bi-chevron-left"></i></button>
            <ul className="pagination">
                {paginationRange.map((element, key) => {
                    if(element == DOTS) {
                        return ( 
                            <li key={key} className={"pagination-item dots"}>{element}</li> 
                        );
                    } else {
                        return ( 
                            <li 
                                key={key}
                                className={element == currentPage ? "pagination-item active" : "pagination-item"}
                                onClick={() => { setPageNumber(element); }}
                                >
                                {element}
                            </li>
                        );
                    }
                })}
            </ul>
            <button onClick={nextPage}><i className="bi bi-chevron-right"></i></button>
        </div>
    );
};
