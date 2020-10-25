import React from "react";
import createPagination from "../PaginationHelper/createPagination";

import "./style.scss";

const Pagination = () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const { pagination } = createPagination({
        numberOfArticles: 223,
        articlesPerPage: 12,
        numberOfButtons: 8,
        currentPage
    });

    const handleClick = page => setCurrentPage(page);

    return (
        <div className="pagination">
            <ul>
                <li
                    className={`${pagination[0] === currentPage && "disabled"}`}
                    onClick={handleClick.bind(null, currentPage - 1)}
                >
                    Prev
                </li>
                {pagination.map(page => (
                    <li
                        className={`${currentPage === page && "active"}`}
                        onClick={handleClick.bind(null, page)}
                    >
                        {page}
                    </li>
                ))}
                <li
                    className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
                    onClick={handleClick.bind(null, currentPage + 1)}
                >
                    Next
                </li>
            </ul>
        </div>
    );
}

export default Pagination;