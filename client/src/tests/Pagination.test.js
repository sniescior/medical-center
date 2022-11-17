import { render, screen } from "@testing-library/react";
import Pagination from "../components/utility/Pagination";

describe('pagination test', () => {

    let currentPage = 5;
    let pageSize = 5;
    let totalCount = 200;
    let pagesCount = pageSize * totalCount;

    test("Renders dots on the left and right", () => {
        render(
            <Pagination
                pagesCount={pagesCount}
                totalCount={totalCount}
                setPageNumber={0}
                currentPage={currentPage}
                pageSize={pageSize} />
        );
            
        const dots = screen.getAllByText('...');
        expect(dots.length).toEqual(2);
    });

    test("Renders dots only on the left", () => {
        render(
            <Pagination
                pagesCount={pagesCount}
                totalCount={totalCount}
                setPageNumber={0}
                currentPage={pagesCount - 1}
                pageSize={pageSize} />
        );
            
        const dots = screen.getAllByText('...');
        expect(dots.length).toEqual(1);
    });

    test("Renders dots only on the right", () => {
        render(
            <Pagination
                pagesCount={pagesCount}
                totalCount={totalCount}
                setPageNumber={0}
                currentPage={pagesCount - 1}
                pageSize={pageSize} />
        );

        const dots = screen.getAllByText('...');
        expect(dots.length).toEqual(1);
    });
});
