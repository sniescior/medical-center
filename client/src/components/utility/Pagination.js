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
        if(currentPage < pagesCount - 1) { setPageNumber(currentPage + 1); }
    }

    const prevPage = () => {
        if(currentPage > 0) { setPageNumber(currentPage - 1); }
    }    

    return (
        <div className="pagination-wrapper">
            <button onClick={prevPage}><i className="bi bi-chevron-left"></i></button>
            <ul className="pagination">
                {paginationRange.map(element => {
                    if(element == DOTS) {
                        return ( 
                            <li className={"pagination-item dots"}>{element}</li> 
                        );
                    } else {
                        return ( 
                            <li 
                                className={element == currentPage + 1 ? "pagination-item active" : "pagination-item"}
                                onClick={() => { setPageNumber(element - 1); }}
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
