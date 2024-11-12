import { Dispatch, FC, SetStateAction } from 'react';
import './Pagination.css';

interface PaginationProps {
    total_records: number;
    currentPage: number;
    setCurrentPage: Dispatch< SetStateAction<number> >;
    limit: number;
}

const Pagination: FC<PaginationProps> = ({ total_records, currentPage, setCurrentPage, limit }) => {
    // Calculate total pages
    const totalPages = Math.floor(total_records  / limit);

    // Create an array of page numbers
    const pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);

    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <div
                    key={number}
                    className={`page-item ${currentPage === number ? 'active' : ''}`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </div>
            ))}
        </div>
    );
};

export default Pagination;
