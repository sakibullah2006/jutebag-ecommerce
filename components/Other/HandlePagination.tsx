'use client'

import React from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
    pageCount: number
    onPageChange: (selected: number) => void;
}

const HandlePagination: React.FC<Props> = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
            containerClassName={'pagination'}
            activeClassName={'active'}
            disabledClassName={'opacity-40 bg-neutral-200 pointer-events-none cursor-not-allowed'}
        />
    );
};

export default HandlePagination;
